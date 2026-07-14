import { describe, expect, it } from 'vitest';
import { createConfig, createHeaderRule, createProfile, normalizeConfig } from './model';

describe('create factories skip undefined overrides', () => {
  it('createConfig keeps defaults for explicit undefined', () => {
    const config = createConfig({ selectedProfileIndex: undefined, globalExcludeFilters: undefined });
    expect(config.selectedProfileIndex).toBe(0);
    expect(config.globalExcludeFilters).toEqual([]);
    expect(config.profiles).toHaveLength(1);
  });

  it('createProfile keeps defaults for explicit undefined', () => {
    const profile = createProfile({ title: undefined, enabled: undefined });
    expect(profile.title).toBe('Profile 1');
    expect(profile.enabled).toBe(true);
  });

  it('createHeaderRule keeps defaults for explicit undefined', () => {
    const rule = createHeaderRule({ name: undefined, enabled: undefined });
    expect(rule.name).toBe('');
    expect(rule.enabled).toBe(true);
  });

  it('overrides still apply when defined', () => {
    const config = createConfig({ selectedProfileIndex: 2, profiles: [] });
    expect(config.selectedProfileIndex).toBe(2);
    expect(config.profiles).toEqual([]);
  });
});

describe('normalizeConfig edge cases', () => {
  it('clamps a NaN selectedProfileIndex to 0', () => {
    const config = normalizeConfig({ profiles: [{ title: 'A' }], selectedProfileIndex: NaN });
    expect(config.selectedProfileIndex).toBe(0);
  });

  it('passes header-rule items through without per-item normalization', () => {
    const rawRule = { name: 'X', value: '1', enabled: true, extra: 'kept' };
    const config = normalizeConfig({ profiles: [{ requestHeaders: [rawRule] }], selectedProfileIndex: 0 });
    expect(config.profiles[0]?.requestHeaders[0]).toEqual(rawRule);
  });
});
