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

const BADGE_ON_COLOR = '#2ea043';
const BADGE_OFF_COLOR = '#da3633';

function updateBadge(config: Config): void {
  const profile = selectedProfile(config);
  const active = Boolean(profile?.enabled);
  void browser.action.setBadgeText({ text: active ? 'on' : 'off' });
  void browser.action.setBadgeBackgroundColor({ color: active ? BADGE_ON_COLOR : BADGE_OFF_COLOR });
}

export default defineBackground(() => {
  void configStore.load().then(applyConfig);
  configStore.subscribe((config) => {
    void applyConfig(config);
  });
});
