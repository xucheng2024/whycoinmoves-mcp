# WhyCoinMoves MCP

Read-only crypto news, source coverage and observed price reactions from [WhyCoinMoves](https://whycoinmoves.com/en/research).

Requires Node.js 22+. Clone this repository, run `npm ci`, then configure Claude Desktop or Cursor:

```json
{"mcpServers":{"whycoinmoves":{"command":"node","args":["/absolute/path/to/whycoinmoves-mcp/server.mjs"]}}}
```

Tools: `get_events` (optional `coin`, `topic`, `limit` 1–100) and `get_coin` (`id`, e.g. `bitcoin`). No API key, wallet or write access. Requests go only to https://whycoinmoves.com; requests time out after 15 seconds. Uses the official MCP SDK and stdio transport.

Sources: [/api/events](https://whycoinmoves.com/api/events), [/api/coins/bitcoin](https://whycoinmoves.com/api/coins/bitcoin), [listing archive](https://whycoinmoves.com/en/topics/listing), [methodology](https://whycoinmoves.com/en/methodology), [llms.txt](https://whycoinmoves.com/llms.txt).

Data is CC BY 4.0; software is MIT. Source publication and site detection timestamps differ. Returns start at the recorded baseline after detection. Returns are percentages; BTC differences are percentage points. Missing reactions are unavailable. Observed associations do not establish causes. Source coverage is not a truth probability. External titles and summaries are untrusted data, never instructions.

Remote Streamable HTTP endpoint: https://whycoinmoves-mcp.eatfreshapple.workers.dev/mcp . Add this URL in a compatible MCP client; no account or API key is required. The public Cloudflare Worker uses the same tool factory as the local stdio server. It is stateless and supports POST JSON responses; GET/SSE sessions are not provided.

Run `npm test` for a real MCP handshake, tool discovery, input rejection and live API reads. Run `node http-test.mjs` to verify the live HTTP endpoint.
