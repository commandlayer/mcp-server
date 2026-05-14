import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { receiptSchema } from './lib/receiptSchema.js';
import { discoverAction } from './tools/discoverAction.js';
import { getActionSchema } from './tools/getActionSchema.js';
import { verifyReceipt } from './tools/verifyReceipt.js';
import { resolveAgent } from './tools/resolveAgent.js';
import { getProtocolVersion } from './tools/getProtocolVersion.js';
import { validateReceiptSchema } from './tools/validateReceiptSchema.js';

const PROTOCOL_VERSION = '1.1.0';

// Tool definitions declared once at module level so schemas and handler
// references are evaluated only on startup, not per request.
const TOOL_DEFS = [
  ['discover_action',        { capability: z.string().optional() }, discoverAction],
  ['get_action_schema',      { action: z.string() },                getActionSchema],
  ['verify_receipt',         { receipt: receiptSchema },            verifyReceipt],
  ['resolve_agent',          { agent: z.string() },                 resolveAgent],
  ['get_protocol_version',   {},                                    getProtocolVersion],
  // z.record(z.string(), z.unknown()) is the correct MCP-compatible object
  // schema for validate_receipt_schema: the handler re-parses with receiptSchema
  // internally. z.unknown() is not permitted as an MCP inputSchema shape.
  ['validate_receipt_schema',{ receipt: z.record(z.string(), z.unknown()) }, validateReceiptSchema],
];

const mcpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'RATE_LIMITED', error: 'Too many requests, please try again later.' },
});

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'commandlayer-mcp-server', version: PROTOCOL_VERSION });
});

app.post('/mcp', mcpLimiter, async (req, res) => {
  // A new McpServer is created per request to avoid transport collision under
  // concurrent requests (server.connect() replaces the active transport).
  // Tool defs are defined at module level so this is cheap — just reference binding.
  const server = new McpServer({ name: 'commandlayer-mcp-server', version: PROTOCOL_VERSION });
  for (const [name, schema, handler] of TOOL_DEFS) {
    server.tool(name, schema, handler);
  }
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stderr.write(`commandlayer-mcp-server v${PROTOCOL_VERSION} listening on ${port}\n`);
});
