import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const client = new Client({ name: 'http-smoke-test', version: '1.0.0' });
try {
  await client.connect(new StreamableHTTPClientTransport(new URL('https://whycoinmoves-mcp.eatfreshapple.workers.dev/mcp')));
  assert.equal((await client.listTools()).tools.length, 2);
  const result = await client.callTool({ name: 'get_events', arguments: { limit: 1 } });
  assert(!result.isError, JSON.stringify(result));
  assert(JSON.parse(result.content[0].text).data.length > 0);
  console.log('Live Streamable HTTP MCP handshake, tools and API call passed');
} finally { await client.close(); }
