import type { BrowserContext, Locator, Page, Worker } from '@playwright/test';
import type { Config } from '../../core/model';
import { Buffer } from 'node:buffer';
import { expect } from '@playwright/test';
import { normalizeConfig, selectedProfile } from '../../core/model';
import { waitForConfig, waitForRulesInSync } from './sync';

export class Popup {
  private settingsOpen = false;

  private constructor(
    private readonly page: Page,
    private readonly sw: Worker,
  ) {}

  static async open(context: BrowserContext, popupUrl: string, sw: Worker): Promise<Popup> {
    const page = await context.newPage();
    await page.goto(popupUrl);
    const popup = new Popup(page, sw);
    await popup.toggle('Enabled').waitFor();
    return popup;
  }

  async setProfileEnabled(on: boolean): Promise<void> {
    const toggle = this.toggle('Enabled');
    await this.synced(
      async () => (on ? toggle.check() : toggle.uncheck()),
      config => selectedProfile(config)?.enabled === on,
    );
  }

  async disableGlobalFilters(): Promise<void> {
    await this.synced(
      async () => this.toggle('Filters').uncheck(),
      config => selectedProfile(config)?.useGlobalFilters === false,
    );
  }

  async switchTo(title: string): Promise<void> {
    await this.synced(
      async () => this.page.getByRole('button', { name: title, exact: true }).click(),
      config => selectedProfile(config)?.title === title,
    );
  }

  async disableRequestRule(name: string): Promise<void> {
    const section = this.page.locator('section', { hasText: 'Request headers' });
    await this.synced(
      async () => this.uncheckRowMatching(section.locator('.rule-row'), name),
      config => selectedProfile(config)?.requestHeaders.find(r => r.name === name)?.enabled === false,
    );
  }

  async disableExcludeFilter(pattern: string): Promise<void> {
    await this.openSettings();
    const modal = this.page.locator('.fixed.inset-0');
    await this.synced(
      async () => this.uncheckRowMatching(modal.locator('.rule-row'), pattern),
      config => config.globalExcludeFilters.find(f => f.pattern === pattern)?.enabled === false,
    );
  }

  async importSettings(content: string, seededConfig: Config): Promise<void> {
    await this.openSettings();
    await this.page.getByRole('button', { name: 'Share' }).click();
    const [chooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.getByRole('button', { name: 'Import JSON' }).click(),
    ]);
    await chooser.setFiles({
      name: 'settings.json',
      mimeType: 'application/json',
      buffer: Buffer.from(content),
    });
    const status = this.page.getByText(/Settings imported|Import failed/);
    await status.waitFor();
    if ((await status.textContent())?.includes('Settings imported')) {
      const seeded = JSON.stringify(normalizeConfig(seededConfig));
      await waitForConfig(this.sw, config => JSON.stringify(config) !== seeded);
      await waitForRulesInSync(this.sw);
    }
  }

  async expectVisibleText(text: string): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  private async synced(action: () => Promise<void>, confirmed: (config: Config) => boolean): Promise<void> {
    await action();
    await waitForConfig(this.sw, confirmed);
    await waitForRulesInSync(this.sw);
  }

  private toggle(label: string): Locator {
    return this.page.locator('label').filter({ hasText: label }).locator('input');
  }

  private async openSettings(): Promise<void> {
    if (this.settingsOpen)
      return;
    await this.page.getByTitle('Settings').click();
    this.settingsOpen = true;
  }

  private async uncheckRowMatching(rows: Locator, inputValue: string): Promise<void> {
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const inputs = row.locator('input');
      const values = await Promise.all(
        Array.from({ length: await inputs.count() }, async (_, j) => inputs.nth(j).inputValue()),
      );
      if (values.includes(inputValue)) {
        await row.getByTitle('Enabled').uncheck();
        return;
      }
    }
    throw new Error(`No row with an input valued "${inputValue}" found`);
  }
}
