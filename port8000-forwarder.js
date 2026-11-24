const http = require('http');

const TARGET_PORT = 3000;
const LISTEN_PORT = 8000;

process.on('uncaughtException', (err) => {
  console.error('Unhandled forwarder error:', err.message);
});

const server = http.createServer((clientReq, clientRes) => {
  clientReq.on('error', (err) => {
    console.error('Client req error:', err.message);
  });
  clientRes.on('error', (err) => {
    console.error('Client res error:', err.message);
  });

  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: clientReq.url,
    method: clientReq.method,
    headers: {
      ...clientReq.headers,
      host: `127.0.0.1:${TARGET_PORT}`,
    },
  };

  const proxy = http.request(options, (proxyRes) => {
    if (!clientRes.headersSent) {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    }
    proxyRes.pipe(clientRes, { end: true });
  });

  proxy.on('error', (err) => {
    if (!clientRes.headersSent) {
      clientRes.writeHead(502, { 'Content-Type': 'application/json' });
      clientRes.end(JSON.stringify({ error: `Connection to backend failed: ${err.message}` }));
    } else {
      try { clientRes.end(); } catch (e) {}
    }
  });

  clientReq.pipe(proxy, { end: true });
});

server.listen(LISTEN_PORT, '0.0.0.0', () => {
  console.log(`Port forwarder active: http://127.0.0.1:${LISTEN_PORT} -> http://127.0.0.1:${TARGET_PORT}`);
});
