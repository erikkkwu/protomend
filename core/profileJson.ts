import type { Config } from './model';
import { normalizeConfig } from './model';

export function exportConfig(config: Config): string {
  return JSON.stringify(config, null, 2);
}

export function importConfig(json: string): Config {
  const raw: unknown = JSON.parse(json);
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new Error('Settings JSON must be an object');
  }
  return normalizeConfig(raw);
}
