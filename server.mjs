import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './core.mjs';
await createServer().connect(new StdioServerTransport());
