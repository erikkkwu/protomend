import { storage } from '#imports';
import type { Config } from './model';
import { createConfig, normalizeConfig } from './model';

const CONFIG_KEY = 'local:config';

const configItem = storage.defineItem<Config>(CONFIG_KEY, {
  fallback: createConfig(),
});

export interface ConfigStore {
  load(): Promise<Config>;
  save(config: Config): Promise<void>;
  subscribe(callback: (config: Config) => void): () => void;
}

export const configStore: ConfigStore = {
  async load() {
    return normalizeConfig(await configItem.getValue());
  },
  save(config) {
    return configItem.setValue(config);
  },
  subscribe(callback) {
    return configItem.watch((next) => callback(normalizeConfig(next)));
  },
};
