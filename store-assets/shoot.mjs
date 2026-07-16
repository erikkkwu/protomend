import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { chromium } from '@playwright/test';

const EXTENSION_PATH = path.resolve(import.meta.dirname, '../.output/chrome-mv3');
const OUT_DIR = import.meta.dirname;

const config = {
  selectedProfileIndex: 0,
  profiles: [
    {
      title: 'Local API',
      enabled: true,
      useGlobalFilters: true,
      requestHeaders: [
        { name: 'Authorization', value: 'Bearer dev-token-9f3a72c1', enabled: true },
        { name: 'X-Api-Key', value: 'local-dev-key', enabled: true },
        { name: 'X-Feature-Flag', value: 'checkout-v2', enabled: false },
      ],
      responseHeaders: [
        { name: 'Access-Control-Allow-Origin', value: '*', enabled: true },
        { name: 'Cache-Control', value: 'no-store', enabled: true },
      ],
    },
    { title: 'Staging', enabled: true, useGlobalFilters: true, requestHeaders: [], responseHeaders: [] },
    { title: 'CORS Debug', enabled: true, useGlobalFilters: false, requestHeaders: [], responseHeaders: [] },
  ],
  globalExcludeFilters: [
    { pattern: String.raw`.*\.googleapis\.com.*`, enabled: true },
    { pattern: String.raw`https://accounts\.google\.com/.*`, enabled: true },
  ],
};

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const context = await chromium.launchPersistentContext('', {
    channel: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`],
  });

  const sw = context.serviceWorkers()[0] ?? (await context.waitForEvent('serviceworker'));
  await sw.evaluate(async (cfg) => {
    await globalThis.chrome.storage.local.set({ config: cfg });
  }, config);

  const popupUrl = new URL('/popup.html', sw.url()).toString();
  const optionsUrl = new URL('/options.html', sw.url()).toString();
  const page = await context.newPage();

  async function settle() {
    await page.waitForSelector('text=REQUEST HEADERS', { timeout: 10000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
  }

  await page.goto(popupUrl);
  await page.addStyleTag({
    content: `
      html { background: #0b0e13; }
      body {
        width: 640px !important;
        height: auto !important;
        margin: 115px 0 0 320px !important;
        border: 1px solid #232b36;
        border-radius: 14px;
        overflow: hidden !important;
        background: #0d1117;
        box-shadow: 0 24px 80px -12px rgba(0, 0, 0, 0.7);
      }
    `,
  });
  await settle();
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-1-popup.png') });

  await page.goto(optionsUrl);
  await settle();
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-2-options.png') });

  await page.getByTitle('Settings').click();
  await page.waitForSelector('text=GLOBAL SETTINGS', { timeout: 10000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-3-filters.png') });

  await context.close();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
