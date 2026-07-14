import http from 'node:http';
import type { AddressInfo } from 'node:net';

export interface EchoServer {
  base: string;
  requestHeaders: Map<string, Record<string, string | string[] | undefined>>;
  close(): Promise<void>;
}

export async function startEchoServer(): Promise<EchoServer> {
  const requestHeaders: EchoServer['requestHeaders'] = new Map();
  const server = http.createServer((req, res) => {
    const path = req.url ?? '';
    requestHeaders.set(path, { ...req.headers });
    if (path === '/plain') {
      res.setHeader('content-type', 'text/html');
      res.end('<html><head><link rel="icon" href="data:,"></head><body>plain</body></html>');
      return;
    }
    res.setHeader('content-type', 'application/json');
    res.setHeader('x-server-tag', 'origin');
    res.end('{}');
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  return {
    base: `http://127.0.0.1:${port}`,
    requestHeaders,
    close: () =>
      new Promise((resolve) => {
        server.close(() => resolve());
        server.closeAllConnections();
      }),
  };
}
