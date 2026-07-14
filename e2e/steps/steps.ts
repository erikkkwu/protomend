import { expect } from '@playwright/test';
import { createExcludeFilter, createHeaderRule, createProfile } from '../../core/model';
import { Given, Then, When } from './fixtures';

Given('a profile {string}', async ({ world }, title: string) => {
  world.config.profiles.push(createProfile({ title }));
});

Given('profile {string} is disabled', async ({ world }, title: string) => {
  world.profile(title).enabled = false;
});

Given('profile {string} is selected', async ({ world }, title: string) => {
  world.config.selectedProfileIndex = world.config.profiles.indexOf(world.profile(title));
});

Given('profile {string} has request header {string} set to {string}', async ({ world }, title: string, name: string, value: string) => {
  world.profile(title).requestHeaders.push(createHeaderRule({ name, value }));
});

Given('profile {string} removes request header {string}', async ({ world }, title: string, name: string) => {
  world.profile(title).requestHeaders.push(createHeaderRule({ name, value: '' }));
});

Given('profile {string} has response header {string} set to {string}', async ({ world }, title: string, name: string, value: string) => {
  world.profile(title).responseHeaders.push(createHeaderRule({ name, value }));
});

Given('profile {string} removes response header {string}', async ({ world }, title: string, name: string) => {
  world.profile(title).responseHeaders.push(createHeaderRule({ name, value: '' }));
});

Given('a global exclude filter {string}', async ({ world }, pattern: string) => {
  world.config.globalExcludeFilters.push(createExcludeFilter({ pattern }));
});

When('I visit the test page', async ({ world }) => {
  await world.visit();
});

When('the page fetches {string}', async ({ world }, pathname: string) => {
  await world.fetchFrom(pathname);
});

When('I turn off the selected profile', async ({ world }) => {
  await (await world.popup()).setProfileEnabled(false);
});

When('I turn on the selected profile', async ({ world }) => {
  await (await world.popup()).setProfileEnabled(true);
});

When('I turn off global filters for the selected profile', async ({ world }) => {
  await (await world.popup()).disableGlobalFilters();
});

When('I switch to profile {string}', async ({ world }, title: string) => {
  await (await world.popup()).switchTo(title);
});

When('I turn off the request header rule {string}', async ({ world }, name: string) => {
  await (await world.popup()).disableRequestRule(name);
});

When('I disable the exclude filter {string} in settings', async ({ world }, pattern: string) => {
  await (await world.popup()).disableExcludeFilter(pattern);
});

When('I import a settings file containing:', async ({ world }, content: string) => {
  await (await world.popup()).importSettings(content, world.config);
});

Then('the settings modal shows {string}', async ({ world }, text: string) => {
  await (await world.popup()).expectVisibleText(text);
});

Then('the document request carries header {string} with value {string}', async ({ world }, name: string, value: string) => {
  expect(world.requestHeader('/plain', name)).toBe(value);
});

Then('the document request does not carry header {string}', async ({ world }, name: string) => {
  expect(world.requestHeader('/plain', name)).toBeUndefined();
});

Then('the request to {string} carries header {string}', async ({ world }, pathname: string, name: string) => {
  expect(world.requestHeader(pathname, name)).toBeDefined();
});

Then('the request to {string} does not carry header {string}', async ({ world }, pathname: string, name: string) => {
  expect(world.requestHeader(pathname, name)).toBeUndefined();
});

Then('the subresource request carries header {string} with value {string}', async ({ world }, name: string, value: string) => {
  expect(world.requestHeader('/api', name)).toBe(value);
});

Then('the document response sets cookie {string}', async ({ world }, cookie: string) => {
  expect(await world.page.evaluate(() => document.cookie)).toContain(cookie);
});

Then('the subresource response carries header {string} with value {string}', async ({ world }, name: string, value: string) => {
  expect(world.fetchedHeader('/api', name)).toBe(value);
});

Then('the subresource response does not carry header {string}', async ({ world }, name: string) => {
  expect(world.fetchedHeader('/api', name)).toBeUndefined();
});
