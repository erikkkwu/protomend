import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { fakeBrowser } from 'wxt/testing/fake-browser';
import { createConfig, createExcludeFilter, createProfile } from '@/core/model';
import { configStore } from '@/core/storage';
import { useConfig } from './useConfig';

async function flush(): Promise<void> {
  await nextTick();
  await new Promise(r => setTimeout(r, 0));
  await nextTick();
}

describe('useConfig', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('becomes ready with a default profile', async () => {
    const { config, ready } = useConfig();
    await flush();
    expect(ready.value).toBe(true);
    expect(config.profiles.length).toBeGreaterThan(0);
  });

  it('persists an edit to storage', async () => {
    const { config } = useConfig();
    await flush();

    config.profiles[0]!.title = 'Edited';
    await flush();

    const stored = await configStore.load();
    expect(stored.profiles[0]?.title).toBe('Edited');
  });

  it('does not clobber a fresh edit via the storage watch loop', async () => {
    const { config } = useConfig();
    await flush();

    config.profiles[0]!.requestHeaders.push({
      name: 'Authorization',
      value: 'Bearer x',
      enabled: true,
    });
    await flush();
    await flush();

    expect(config.profiles[0]!.requestHeaders).toHaveLength(1);
    const stored = await configStore.load();
    expect(stored.profiles[0]?.requestHeaders[0]?.name).toBe('Authorization');
  });

  it('adding a profile persists and stays selected', async () => {
    const { config } = useConfig();
    await flush();

    config.profiles.push(createProfile({ title: 'Second' }));
    config.selectedProfileIndex = config.profiles.length - 1;
    await flush();

    const stored = await configStore.load();
    expect(stored.profiles).toHaveLength(2);
    expect(stored.selectedProfileIndex).toBe(1);
  });
});

describe('useConfig actions', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  async function withProfiles(titles: string[]) {
    const store = useConfig();
    await flush();
    store.config.profiles = titles.map(title => createProfile({ title }));
    store.config.selectedProfileIndex = 0;
    await flush();
    return store;
  }

  it('removeSelectedProfile keeps the same index when a later profile fills the gap', async () => {
    const store = await withProfiles(['A', 'B', 'C']);
    store.selectProfile(1); // B
    store.removeSelectedProfile();
    await flush();
    expect(store.config.profiles.map(p => p.title)).toEqual(['A', 'C']);
    expect(store.config.selectedProfileIndex).toBe(1); // now C
  });

  it('removeSelectedProfile clamps to the new last index when the last profile is removed', async () => {
    const store = await withProfiles(['A', 'B', 'C']);
    store.selectProfile(2); // C (last)
    store.removeSelectedProfile();
    await flush();
    expect(store.config.profiles.map(p => p.title)).toEqual(['A', 'B']);
    expect(store.config.selectedProfileIndex).toBe(1); // new last = B
  });

  it('removeSelectedProfile is a no-op when only one profile remains', async () => {
    const store = await withProfiles(['Only']);
    store.removeSelectedProfile();
    await flush();
    expect(store.config.profiles).toHaveLength(1);
    expect(store.config.selectedProfileIndex).toBe(0);
  });

  it('duplicateSelectedProfile appends a copy of the selected profile, selects it, and persists', async () => {
    const store = await withProfiles(['A', 'B']);
    store.selectProfile(0);
    store.config.profiles[0]!.requestHeaders.push({ name: 'X-Env', value: 'prod', enabled: true });
    await flush();

    store.duplicateSelectedProfile();
    await flush();

    expect(store.config.profiles.map(p => p.title)).toEqual(['A', 'B', 'A (copy)']);
    expect(store.config.selectedProfileIndex).toBe(2);
    const stored = await configStore.load();
    expect(stored.profiles[2]?.requestHeaders).toEqual([{ name: 'X-Env', value: 'prod', enabled: true }]);
  });

  it('duplicateSelectedProfile keeps the copy independent from the source', async () => {
    const store = await withProfiles(['A']);
    store.config.profiles[0]!.requestHeaders.push({ name: 'X-Env', value: 'prod', enabled: true });
    await flush();

    store.duplicateSelectedProfile();
    await flush();
    store.config.profiles[1]!.requestHeaders[0]!.value = 'staging';
    await flush();

    expect(store.config.profiles[0]!.requestHeaders[0]!.value).toBe('prod');
  });

  it('addExcludeFilter appends an empty enabled filter and persists', async () => {
    const store = await withProfiles(['A']);
    store.addExcludeFilter();
    await flush();
    expect(store.config.globalExcludeFilters).toEqual([{ pattern: '', enabled: true }]);
    expect((await configStore.load()).globalExcludeFilters).toHaveLength(1);
  });

  it('removeExcludeFilter removes by index and persists', async () => {
    const store = await withProfiles(['A']);
    store.config.globalExcludeFilters = [
      createExcludeFilter({ pattern: 'a' }),
      createExcludeFilter({ pattern: 'b' }),
    ];
    await flush();
    store.removeExcludeFilter(0);
    await flush();
    expect(store.config.globalExcludeFilters.map(f => f.pattern)).toEqual(['b']);
    expect((await configStore.load()).globalExcludeFilters.map(f => f.pattern)).toEqual(['b']);
  });

  it('removeExcludeFilter ignores an out-of-range index', async () => {
    const store = await withProfiles(['A']);
    store.config.globalExcludeFilters = [createExcludeFilter({ pattern: 'a' })];
    await flush();
    store.removeExcludeFilter(5);
    store.removeExcludeFilter(-1);
    await flush();
    expect(store.config.globalExcludeFilters.map(f => f.pattern)).toEqual(['a']);
  });

  it('replaceConfig applies and persists the new config, and later edits still persist', async () => {
    const store = await withProfiles(['A']);

    store.replaceConfig(
      createConfig({
        profiles: [createProfile({ title: 'Imported' })],
        selectedProfileIndex: 0,
        globalExcludeFilters: [{ pattern: 'ads', enabled: true }],
      }),
    );
    await flush();

    expect(store.config.profiles.map(p => p.title)).toEqual(['Imported']);
    expect(store.config.globalExcludeFilters).toEqual([{ pattern: 'ads', enabled: true }]);
    expect((await configStore.load()).profiles[0]?.title).toBe('Imported');

    // the write-suppression guard is intact: a fresh edit still round-trips
    store.config.profiles[0]!.title = 'Edited';
    await flush();
    expect((await configStore.load()).profiles[0]?.title).toBe('Edited');
  });
});
