import type { Ref } from 'vue';
import type { Config } from '@/core/model';
import { nextTick, reactive, ref, watch } from 'vue';
import { createConfig, createExcludeFilter, createProfile } from '@/core/model';
import { configStore } from '@/core/storage';

export interface UseConfig {
  config: Config;
  ready: Ref<boolean>;
  addProfile: () => void;
  removeSelectedProfile: () => void;
  selectProfile: (index: number) => void;
  addExcludeFilter: () => void;
  removeExcludeFilter: (index: number) => void;
  replaceConfig: (next: Config) => void;
}

export function useConfig(): UseConfig {
  const config = reactive<Config>(createConfig());
  const ready = ref(false);
  let suppressWrite = false;

  async function applyExternal(next: Config): Promise<void> {
    suppressWrite = true;
    Object.assign(config, next);
    await nextTick();
    suppressWrite = false;
  }

  void configStore.load().then(async (loaded) => {
    await applyExternal(loaded);
    ready.value = true;
  });

  configStore.subscribe((next) => {
    void applyExternal(next);
  });

  watch(
    config,
    () => {
      if (suppressWrite || !ready.value)
        return;
      void configStore.save({ ...config });
    },
    { deep: true },
  );

  function addProfile(): void {
    config.profiles.push(createProfile({ title: `Profile ${config.profiles.length + 1}` }));
    config.selectedProfileIndex = config.profiles.length - 1;
  }

  function removeSelectedProfile(): void {
    if (config.profiles.length <= 1)
      return;
    config.profiles.splice(config.selectedProfileIndex, 1);
    config.selectedProfileIndex = Math.min(config.selectedProfileIndex, config.profiles.length - 1);
  }

  function selectProfile(index: number): void {
    if (index < 0 || index >= config.profiles.length)
      return;
    config.selectedProfileIndex = index;
  }

  function addExcludeFilter(): void {
    config.globalExcludeFilters.push(createExcludeFilter());
  }

  function removeExcludeFilter(index: number): void {
    if (index < 0 || index >= config.globalExcludeFilters.length)
      return;
    config.globalExcludeFilters.splice(index, 1);
  }

  function replaceConfig(next: Config): void {
    void applyExternal(next);
    void configStore.save({ ...next });
  }

  return { config, ready, addProfile, removeSelectedProfile, selectProfile, addExcludeFilter, removeExcludeFilter, replaceConfig };
}
