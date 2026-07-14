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

  updateBadge(config);
}

const BADGE_COLOR = '#2ea043';

function updateBadge(config: Config): void {
  const profile = selectedProfile(config);
  const active = Boolean(profile?.enabled);
  browser.action.setBadgeText({ text: active ? 'on' : '' });
  browser.action.setBadgeBackgroundColor({ color: BADGE_COLOR });
}

export default defineBackground(() => {
  configStore.load().then(applyConfig);
  configStore.subscribe((config) => {
    void applyConfig(config);
  });
});
