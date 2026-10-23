import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
const client = new Client({ name: 'smoke-test', version: '1.0.0' });
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: ['server.mjs'] }));
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map(t => t.name).sort(), ['get_coin', 'get_events']);
  assert(tools.every(t => t.annotations.readOnlyHint));
  const invalid = await client.callTool({ name: 'get_coin', arguments: { id: '../internal' } });
  assert.equal(invalid.isError, true);
  for (const [name, args] of [['get_events', { limit: 1 }], ['get_coin', { id: 'bitcoin' }]]) {
    const result = await client.callTool({ name, arguments: args });
    assert(!result.isError, JSON.stringify(result));
    assert(JSON.parse(result.content[0].text).source.startsWith('https://whycoinmoves.com/api/'));
  }
  console.log('MCP initialization, tools, input validation and live reads passed');
} finally { await client.close(); }
