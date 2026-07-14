import type { ExcludeFilter } from './model';
import { describe, expect, it } from 'vitest';
import { compileConfig } from './dnr';
import { createConfig, createExcludeFilter, createHeaderRule, createProfile } from './model';

function configWith(profile: Parameters<typeof createProfile>[0], globalExcludeFilters: ExcludeFilter[] = []) {
  return createConfig({ profiles: [createProfile(profile)], selectedProfileIndex: 0, globalExcludeFilters });
}

describe('compileConfig', () => {
  it('returns no rules for a disabled profile', () => {
    const config = configWith({ enabled: false, requestHeaders: [createHeaderRule({ name: 'X', value: '1' })] });
    expect(compileConfig(config)).toEqual([]);
  });

  it('returns no rules when the profile has no modifications', () => {
    expect(compileConfig(configWith({}))).toEqual([]);
  });

  it('compiles a request header into a modifyHeaders set operation', () => {
    const config = configWith({ requestHeaders: [createHeaderRule({ name: 'Authorization', value: 'Bearer x' })] });
    const rules = compileConfig(config);
    expect(rules).toHaveLength(1);
    expect(rules[0]?.action.type).toBe('modifyHeaders');
    expect(rules[0]?.action.requestHeaders).toEqual([
      { header: 'Authorization', operation: 'set', value: 'Bearer x' },
    ]);
  });

  it('uses set for a value and remove for an empty value', () => {
    const config = configWith({
      requestHeaders: [
        createHeaderRule({ name: 'A', value: 'x' }),
        createHeaderRule({ name: 'B', value: '' }),
      ],
    });
    const ops = compileConfig(config)[0]?.action.requestHeaders;
    expect(ops?.find(o => o.header === 'A')?.operation).toBe('set');
    expect(ops?.find(o => o.header === 'B')?.operation).toBe('remove');
  });

  it('compiles response headers into a modifyHeaders rule', () => {
    const config = configWith({
      responseHeaders: [
        createHeaderRule({ name: 'X-Resp', value: '1' }),
        createHeaderRule({ name: 'X-Other', value: '2' }),
      ],
    });
    const rules = compileConfig(config);
    expect(rules).toHaveLength(1);
    expect(rules[0]?.action.responseHeaders).toHaveLength(2);
  });

  it('emits high-priority allow rules for global exclude filters when profile opts in', () => {
    const config = configWith(
      { requestHeaders: [createHeaderRule({ name: 'X', value: '1' })] },
      [createExcludeFilter({ pattern: 'analytics\\.com' })],
    );
    const rules = compileConfig(config);
    const allow = rules.find(r => r.action.type === 'allow');
    const modify = rules.find(r => r.action.type === 'modifyHeaders');
    expect(allow).toBeDefined();
    expect(allow?.condition.regexFilter).toBe('analytics\\.com');
    expect(allow!.priority!).toBeGreaterThan(modify!.priority!);
  });

  it('omits global exclude allow rules when the profile does not opt in', () => {
    const config = configWith(
      { useGlobalFilters: false, requestHeaders: [createHeaderRule({ name: 'X', value: '1' })] },
      [createExcludeFilter({ pattern: 'analytics\\.com' })],
    );
    expect(compileConfig(config).some(r => r.action.type === 'allow')).toBe(false);
  });

  it('skips disabled or empty exclude filters', () => {
    const config = configWith(
      { requestHeaders: [createHeaderRule({ name: 'X', value: '1' })] },
      [createExcludeFilter({ pattern: 'a', enabled: false }), createExcludeFilter({ pattern: '  ' })],
    );
    expect(compileConfig(config).some(r => r.action.type === 'allow')).toBe(false);
  });

  it('matches document requests: every rule declares resourceTypes including main_frame', () => {
    const config = configWith(
      {
        requestHeaders: [createHeaderRule({ name: 'A', value: '1' })],
        responseHeaders: [createHeaderRule({ name: 'B', value: '2' })],
      },
      [createExcludeFilter({ pattern: 'z' })],
    );
    const rules = compileConfig(config);
    expect(rules).toHaveLength(3);
    for (const rule of rules) {
      expect(rule.condition.resourceTypes).toContain('main_frame');
    }
  });

  it('assigns unique sequential ids across modify and allow rules', () => {
    const config = configWith(
      {
        requestHeaders: [createHeaderRule({ name: 'A', value: '1' })],
        responseHeaders: [createHeaderRule({ name: 'B', value: '2' })],
      },
      [createExcludeFilter({ pattern: 'z' })],
    );
    const ids = compileConfig(config).map(r => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
