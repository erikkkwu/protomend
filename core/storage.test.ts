import { beforeEach, describe, expect, it } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';
import { createConfig, createProfile } from './model';
import { configStore } from './storage';

describe('configStore', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('load() returns a normalized Config even from index-keyed (object) arrays', async () => {
    await fakeBrowser.storage.local.set({
      config: {
        profiles: { 0: { title: 'P', requestHeaders: { 0: { name: 'A', value: '1', enabled: true } } } },
        selectedProfileIndex: 0,
      },
    });

    const loaded = await configStore.load();

    expect(Array.isArray(loaded.profiles)).toBe(true);
    expect(Array.isArray(loaded.profiles[0]?.requestHeaders)).toBe(true);
    expect(loaded.profiles[0]?.requestHeaders[0]?.name).toBe('A');
  });

  it('save() then load() round-trips a config', async () => {
    const config = createConfig({ profiles: [createProfile({ title: 'Saved' })], selectedProfileIndex: 0 });
    await configStore.save(config);
    expect((await configStore.load()).profiles[0]?.title).toBe('Saved');
  });

  it('subscribe() delivers a normalized Config on change and can be stopped', async () => {
    const seen: string[] = [];
    const stop = configStore.subscribe((c) => {
      seen.push(c.profiles[0]?.title ?? '');
    });

    await configStore.save(createConfig({ profiles: [createProfile({ title: 'One' })] }));
    stop();
    await configStore.save(createConfig({ profiles: [createProfile({ title: 'Two' })] }));

    expect(seen).toContain('One');
    expect(seen).not.toContain('Two');
  });
});
