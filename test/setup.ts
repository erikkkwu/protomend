import { beforeEach } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';

const g = globalThis as Record<string, unknown>;
g.browser = fakeBrowser;
g.chrome = fakeBrowser;

beforeEach(() => {
  fakeBrowser.reset();
});
