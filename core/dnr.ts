import type { Browser } from 'wxt/browser';
import type { Config, ExcludeFilter, HeaderRule, Profile } from './model';
import { selectedProfile } from './model';

type HeaderOperation = `${Browser.declarativeNetRequest.HeaderOperation}`;
type ModifyHeaderInfo = Browser.declarativeNetRequest.ModifyHeaderInfo;
type ResourceType = `${Browser.declarativeNetRequest.ResourceType}`;
type Rule = Browser.declarativeNetRequest.Rule;

const MODIFY_PRIORITY = 1;
const ALLOW_PRIORITY = 100;

const ALL_RESOURCE_TYPES: ResourceType[] = [
  'main_frame',
  'sub_frame',
  'stylesheet',
  'script',
  'image',
  'font',
  'object',
  'xmlhttprequest',
  'ping',
  'csp_report',
  'media',
  'websocket',
  'webtransport',
  'webbundle',
  'other',
];

function operationFor(rule: HeaderRule): HeaderOperation {
  return rule.value === '' ? 'remove' : 'set';
}

function toModifyHeaders(rules: HeaderRule[]): ModifyHeaderInfo[] {
  return rules
    .filter(r => r.enabled && r.name.trim() !== '')
    .map((r) => {
      const operation = operationFor(r);
      const info: ModifyHeaderInfo = { header: r.name, operation };
      if (operation !== 'remove')
        info.value = r.value;
      return info;
    });
}

function modifyRules(profile: Profile, startId: number): Rule[] {
  const rules: Rule[] = [];
  let id = startId;

  const requestHeaders = toModifyHeaders(profile.requestHeaders);
  if (requestHeaders.length > 0) {
    rules.push({
      id: id++,
      priority: MODIFY_PRIORITY,
      action: { type: 'modifyHeaders', requestHeaders },
      condition: { resourceTypes: ALL_RESOURCE_TYPES },
    });
  }

  const responseHeaders = toModifyHeaders(profile.responseHeaders);
  if (responseHeaders.length > 0) {
    rules.push({
      id: id++,
      priority: MODIFY_PRIORITY,
      action: { type: 'modifyHeaders', responseHeaders },
      condition: { resourceTypes: ALL_RESOURCE_TYPES },
    });
  }

  return rules;
}

function excludeAllowRules(filters: ExcludeFilter[], startId: number): Rule[] {
  let id = startId;
  return filters
    .filter(f => f.enabled && f.pattern.trim() !== '')
    .map(f => ({
      id: id++,
      priority: ALLOW_PRIORITY,
      action: { type: 'allow' as const },
      condition: { regexFilter: f.pattern, resourceTypes: ALL_RESOURCE_TYPES },
    }));
}

export function compileConfig(config: Config): Rule[] {
  const profile = selectedProfile(config);
  if (!profile || !profile.enabled)
    return [];

  const rules = modifyRules(profile, 1);
  if (rules.length === 0)
    return [];

  if (profile.useGlobalFilters) {
    const allows = excludeAllowRules(config.globalExcludeFilters, rules.length + 1);
    return [...rules, ...allows];
  }
  return rules;
}
