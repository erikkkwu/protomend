import type { BrowserContext, Page, Worker } from '@playwright/test';
import type { Config, Profile } from '../../core/model';
import type { EchoServer } from '../support/echo';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';
import { createConfig } from '../../core/model';
import { startEchoServer } from '../support/echo';
import { Popup } from '../support/popup';
import { waitForRulesInSync } from '../support/sync';

const EXTENSION_PATH = path.resolve(import.meta.dirname, '../../.output/chrome-mv3');

interface Extension {
  context: BrowserContext;
  sw: Worker;
  popupUrl: string;
}

export class World {
  config: Config = createConfig({ profiles: [] });
  fetched = new Map<string, Record<string, string>>();
  private seeded = false;
  private driver: Popup | undefined;
  private sitePage: Page | undefined;

  constructor(
    readonly ext: Extension,
    readonly echo: EchoServer,
  ) {}

  profile(title: string): Profile {
    const found = this.config.profiles.find(p => p.title === title);
    if (!found)
      throw new Error(`No profile titled "${title}" in the seeded config`);
    return found;
  }

  async ensureSeeded(): Promise<void> {
    if (this.seeded)
      return;
    this.seeded = true;
    await this.ext.sw.evaluate(async (config) => {
      const chrome = (globalThis as { chrome?: any }).chrome;
      await chrome.storage.local.set({ config });
    }, this.config);
    await waitForRulesInSync(this.ext.sw);
  }

  async popup(): Promise<Popup> {
    await this.ensureSeeded();
    if (!this.driver) {
      this.driver = await Popup.open(this.ext.context, this.ext.popupUrl, this.ext.sw);
    }
    return this.driver;
  }

  async visit(): Promise<Page> {
    await this.ensureSeeded();
    if (!this.sitePage)
      this.sitePage = await this.ext.context.newPage();
    await this.sitePage.goto(`${this.echo.base}/plain`);
    return this.sitePage;
  }

  get page(): Page {
    if (!this.sitePage)
      throw new Error('No page visited yet — add a "When I visit the test page" step first');
    return this.sitePage;
  }

  async fetchFrom(pathname: string): Promise<void> {
    const headers = await this.page.evaluate(async (p) => {
      const res = await fetch(p);
      const out: Record<string, string> = {};
      res.headers.forEach((value, key) => (out[key] = value));
      return out;
    }, pathname);
    this.fetched.set(pathname, headers);
  }

  requestHeader(pathname: string, name: string): string | string[] | undefined {
    const seen = this.echo.requestHeaders.get(pathname);
    if (!seen)
      throw new Error(`No request to "${pathname}" reached the echo server`);
    return seen[name];
  }

  fetchedHeader(pathname: string, name: string): string | undefined {
    const headers = this.fetched.get(pathname);
    if (!headers)
      throw new Error(`No fetch to "${pathname}" was made — add a "the page fetches" step first`);
    return headers[name];
  }
}

interface Fixtures {
  echo: EchoServer;
  ext: Extension;
  world: World;
}

export const test = base.extend<Fixtures>({
  // eslint-disable-next-line no-empty-pattern
  echo: async ({}, use) => {
    const server = await startEchoServer();
    await use(server);
    await server.close();
  },
  ext: async ({ headless }, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      headless,
      args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`],
    });
    const sw = context.serviceWorkers()[0] ?? (await context.waitForEvent('serviceworker'));
    const popupUrl = new URL('/popup.html', sw.url()).toString();
    await use({ context, sw, popupUrl });
    await context.close();
  },
  world: async ({ ext, echo }, use) => {
    await use(new World(ext, echo));
  },
});

export const { Given, When, Then } = createBdd(test);
