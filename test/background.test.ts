import { afterEach, expect, it, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';
import { createConfig, createProfile } from '../core/model';
import { configStore } from '../core/storage';
import background from '../entrypoints/background';

const ICON_OFF = { 16: 'icon/16-gray.png', 32: 'icon/32-gray.png', 48: 'icon/48-gray.png' };

afterEach(() => {
  vi.restoreAllMocks();
});

it('restores the disabled toolbar icon when the browser starts', async () => {
  const setIcon = vi.spyOn(fakeBrowser.action, 'setIcon').mockResolvedValue(undefined);
  const addStartupListener = vi.spyOn(fakeBrowser.runtime.onStartup, 'addListener');
  vi.spyOn(fakeBrowser.declarativeNetRequest, 'getSessionRules').mockResolvedValue([]);
  vi.spyOn(fakeBrowser.declarativeNetRequest, 'updateSessionRules').mockResolvedValue(undefined);

  await configStore.save(createConfig({
    profiles: [createProfile({ enabled: false })],
  }));
  background.main?.();
  expect(addStartupListener).toHaveBeenCalledOnce();
  await fakeBrowser.runtime.onStartup.trigger();

  await vi.waitFor(() => expect(setIcon).toHaveBeenLastCalledWith({ path: ICON_OFF }));
});

it('applies persisted config when the extension updates', async () => {
  const setIcon = vi.spyOn(fakeBrowser.action, 'setIcon').mockResolvedValue(undefined);
  const addInstalledListener = vi.spyOn(fakeBrowser.runtime.onInstalled, 'addListener');
  vi.spyOn(fakeBrowser.declarativeNetRequest, 'getSessionRules').mockResolvedValue([]);
  vi.spyOn(fakeBrowser.declarativeNetRequest, 'updateSessionRules').mockResolvedValue(undefined);

  await configStore.save(createConfig({
    profiles: [createProfile({ enabled: false })],
  }));
  background.main?.();
  expect(addInstalledListener).toHaveBeenCalledOnce();
  await fakeBrowser.runtime.onInstalled.trigger({
    reason: 'update',
    previousVersion: '0.3.1',
    temporary: false,
  });

  await vi.waitFor(() => expect(setIcon).toHaveBeenLastCalledWith({ path: ICON_OFF }));
});
