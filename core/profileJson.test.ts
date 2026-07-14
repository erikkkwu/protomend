import { describe, expect, it } from 'vitest';
import { exportConfig, importConfig } from './profileJson';
import { createConfig, createHeaderRule, createProfile, normalizeConfig, normalizeProfile } from './model';

describe('normalizeConfig', () => {
  it('coerces index-keyed objects back into arrays', () => {
    const raw = {
      profiles: {
        0: {
          title: 'P',
          requestHeaders: { 0: { name: 'A', value: '1', enabled: true } },
          responseHeaders: {},
        },
      },
      selectedProfileIndex: 0,
    };
    const config = normalizeConfig(raw);
    expect(Array.isArray(config.profiles)).toBe(true);
    expect(Array.isArray(config.profiles[0]?.requestHeaders)).toBe(true);
    expect(Array.isArray(config.profiles[0]?.responseHeaders)).toBe(true);
    expect(config.profiles[0]?.requestHeaders[0]?.name).toBe('A');
  });

  it('falls back to a default profile when profiles is empty', () => {
    const config = normalizeConfig({ profiles: [], selectedProfileIndex: 5 });
    expect(config.profiles).toHaveLength(1);
    expect(config.selectedProfileIndex).toBe(0);
  });

  it('clamps an out-of-range selectedProfileIndex', () => {
    const config = normalizeConfig({ profiles: [{ title: 'A' }], selectedProfileIndex: 9 });
    expect(config.selectedProfileIndex).toBe(0);
  });
});

describe('normalizeProfile', () => {
  it('fills defaults for a partial profile', () => {
    const restored = normalizeProfile({ title: 'Only title' });
    expect(restored.title).toBe('Only title');
    expect(restored.enabled).toBe(true);
    expect(restored.requestHeaders).toEqual([]);
    expect(restored.useGlobalFilters).toBe(true);
  });

  it('ignores non-array rule fields', () => {
    expect(normalizeProfile({ requestHeaders: 'nope' }).requestHeaders).toEqual([]);
  });

  it('preserves every field the factory declares (no per-field allowlist drops)', () => {
    const full = createProfile({ title: 'T', enabled: false, useGlobalFilters: false });
    expect(normalizeProfile(full)).toEqual(full);
  });
});

describe('importConfig', () => {
  it('exports and re-imports an equivalent config', () => {
    const config = createConfig({
      profiles: [createProfile({ title: 'A', requestHeaders: [createHeaderRule({ name: 'X', value: '1' })] })],
    });
    expect(importConfig(exportConfig(config))).toEqual(config);
  });

  it('throws on invalid JSON', () => {
    expect(() => importConfig('not json')).toThrow();
  });

  it.each(['123', '"text"', 'null', 'true', '[1,2]'])('rejects valid JSON that is not an object: %s', (json) => {
    expect(() => importConfig(json)).toThrow();
  });
});
