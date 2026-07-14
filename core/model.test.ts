import { describe, expect, it } from 'vitest';
import { cloneProfile, createConfig, createHeaderRule, createProfile, normalizeConfig } from './model';

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

describe('cloneProfile', () => {
  it('copies every field and suffixes the title with (copy)', () => {
    const source = createProfile({
      title: 'Staging API',
      enabled: false,
      useGlobalFilters: false,
      requestHeaders: [createHeaderRule({ name: 'Authorization', value: 'Bearer x', enabled: false })],
      responseHeaders: [createHeaderRule({ name: 'X-Debug', value: '1' })],
    });
    const copy = cloneProfile(source, 'Profile 2');
    expect(copy).toEqual({ ...source, title: 'Staging API (copy)' });
  });

  it('uses the fallback title when the source title is empty', () => {
    const copy = cloneProfile(createProfile({ title: '' }), 'Profile 2');
    expect(copy.title).toBe('Profile 2');
  });

  it('returns an independent deep copy', () => {
    const source = createProfile({
      title: 'A',
      requestHeaders: [createHeaderRule({ name: 'X-Env', value: 'prod' })],
      responseHeaders: [createHeaderRule({ name: 'X-Trace', value: 'on' })],
    });
    const copy = cloneProfile(source, 'Profile 2');
    copy.requestHeaders[0]!.value = 'staging';
    copy.responseHeaders.push(createHeaderRule({ name: 'X-New' }));
    expect(source.requestHeaders[0]!.value).toBe('prod');
    expect(source.responseHeaders).toHaveLength(1);
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
