import { describe, expect, it } from 'vitest';
import { headerNamesFor, requestHeaderNames, responseHeaderNames } from './commonHeaders';

describe('headerNamesFor', () => {
  it('returns request names for the request flow', () => {
    expect(headerNamesFor('request')).toBe(requestHeaderNames);
    expect(headerNamesFor('request')).toContain('Authorization');
  });

  it('returns response names for the response flow', () => {
    expect(headerNamesFor('response')).toBe(responseHeaderNames);
    expect(headerNamesFor('response')).toContain('Set-Cookie');
  });

  it('keeps request-only and response-only names in their own lists', () => {
    expect(requestHeaderNames).not.toContain('Set-Cookie');
    expect(responseHeaderNames).not.toContain('User-Agent');
  });
});
