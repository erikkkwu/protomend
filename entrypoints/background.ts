import type { Config } from '@/core/model';
import { browser, defineBackground } from '#imports';
import { compileConfig } from '@/core/dnr';
import { selectedProfile } from '@/core/model';
import { configStore } from '@/core/storage';

async function applyConfig(config: Config): Promise<void> {
  const rules = compileConfig(config);

  const existing = await browser.declarativeNetRequest.getSessionRules();
  await browser.declarativeNetRequest.updateSessionRules({
    removeRuleIds: existing.map(r => r.id),
    addRules: rules,
  });

  updateIcon(config);
}

const ICON_ON = { 16: 'icon/16.png', 32: 'icon/32.png', 48: 'icon/48.png' };
const ICON_OFF = { 16: 'icon/16-gray.png', 32: 'icon/32-gray.png', 48: 'icon/48-gray.png' };

function updateIcon(config: Config): void {
  const profile = selectedProfile(config);
  const active = Boolean(profile?.enabled);
  void browser.action.setIcon({ path: active ? ICON_ON : ICON_OFF });
}

export default defineBackground(() => {
  void configStore.load().then(applyConfig);
  configStore.subscribe((config) => {
    void applyConfig(config);
  });
});
