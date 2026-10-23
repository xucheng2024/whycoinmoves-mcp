import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createServer } from './core.mjs';
export default {
  async fetch(request) {
    if (new URL(request.url).pathname !== '/mcp') return new Response('WhyCoinMoves read-only MCP: POST /mcp. Source: https://github.com/xucheng2024/whycoinmoves-mcp');
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
    const server = createServer();
    const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 16384 });
    try {
      await server.connect(transport);
      const response = await transport.handleRequest(request);
      response.headers.set('Cache-Control', 'no-store');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      return response;
    } finally { await server.close(); }
  },
};
