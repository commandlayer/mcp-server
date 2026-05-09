import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { discoverAction } from './tools/discoverAction.js';
import { getActionSchema } from './tools/getActionSchema.js';
import { verifyReceipt } from './tools/verifyReceipt.js';
import { resolveAgent } from './tools/resolveAgent.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'commandlayer-mcp-server' });
});

app.post('/mcp', async (req, res) => {
  const server = new McpServer({ name: 'commandlayer-mcp-server', version: '1.0.0' });
  server.tool('discover_action', { capability: z.string().optional() }, discoverAction);
  server.tool('get_action_schema', { action: z.string() }, getActionSchema);
  server.tool('verify_receipt', { receipt: z.any() }, verifyReceipt);
  server.tool('resolve_agent', { agent: z.string() }, resolveAgent);

  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`commandlayer-mcp-server listening on ${port}`);
});
