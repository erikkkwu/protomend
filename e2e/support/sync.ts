import type { Worker } from '@playwright/test';
import type { Config } from '../../core/model';
import { compileConfig } from '../../core/dnr';
import { normalizeConfig } from '../../core/model';

interface HeaderInfo {
  header: string;
  operation: string;
  value?: string;
}

interface RuleShape {
  action: { type: string; requestHeaders?: HeaderInfo[]; responseHeaders?: HeaderInfo[] };
  condition?: { regexFilter?: string };
}

function projectRules(rules: RuleShape[]): string {
  const projectHeaders = (headers: HeaderInfo[] = []) =>
    headers.map(h => `${h.operation}:${h.header.toLowerCase()}:${h.value ?? ''}`).sort();
  const projected = rules
    .map(r => ({
      type: r.action.type,
      req: projectHeaders(r.action.requestHeaders),
      resp: projectHeaders(r.action.responseHeaders),
      regex: r.condition?.regexFilter ?? '',
    }))
    .map(r => JSON.stringify(r))
    .sort();
  return JSON.stringify(projected);
}

interface ExtensionState {
  raw: unknown;
  rules: RuleShape[];
}

async function readState(sw: Worker): Promise<ExtensionState> {
  return sw.evaluate(async () => {
    const chrome = (globalThis as { chrome?: any }).chrome;
    return {
      raw: (await chrome.storage.local.get('config')).config,
      rules: await chrome.declarativeNetRequest.getSessionRules(),
    };
  });
}

async function waitFor(check: () => Promise<boolean>, label: string): Promise<void> {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    if (await check())
      return;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Timed out waiting for ${label}`);
}

export async function waitForConfig(sw: Worker, predicate: (config: Config) => boolean): Promise<void> {
  await waitFor(async () => predicate(normalizeConfig((await readState(sw)).raw)), 'stored config to match predicate');
}

export async function waitForRulesInSync(sw: Worker): Promise<void> {
  await waitFor(async () => {
    const state = await readState(sw);
    return projectRules(compileConfig(normalizeConfig(state.raw))) === projectRules(state.rules);
  }, 'session rules to match stored config');
}
