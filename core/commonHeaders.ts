export type HeaderFlow = 'request' | 'response';

export const requestHeaderNames: readonly string[] = [
  'Accept',
  'Accept-Encoding',
  'Accept-Language',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Content-Length',
  'Content-Type',
  'Cookie',
  'DNT',
  'Host',
  'If-Match',
  'If-Modified-Since',
  'If-None-Match',
  'Origin',
  'Pragma',
  'Range',
  'Referer',
  'User-Agent',
  'X-Api-Key',
  'X-Csrf-Token',
  'X-Forwarded-For',
  'X-Forwarded-Host',
  'X-Forwarded-Proto',
  'X-Requested-With',
];

export const responseHeaderNames: readonly string[] = [
  'Access-Control-Allow-Credentials',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Methods',
  'Access-Control-Allow-Origin',
  'Access-Control-Expose-Headers',
  'Access-Control-Max-Age',
  'Cache-Control',
  'Content-Disposition',
  'Content-Encoding',
  'Content-Security-Policy',
  'Content-Type',
  'ETag',
  'Expires',
  'Last-Modified',
  'Location',
  'Set-Cookie',
  'Strict-Transport-Security',
  'Vary',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'X-XSS-Protection',
];

export function headerNamesFor(flow: HeaderFlow): readonly string[] {
  return flow === 'response' ? responseHeaderNames : requestHeaderNames;
}
