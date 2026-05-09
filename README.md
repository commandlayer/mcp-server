# CommandLayer MCP Server

Trust & Verification v1 MCP server for CommandLayer.

## Purpose
This server exposes MCP tools and bridges runtime-backed operations to the CommandLayer runtime over HTTP.

## Supported MCP tools
- discover_action
- get_action_schema
- verify_receipt
- resolve_agent

## Runtime bridge
`verify_receipt` forwards `{ receipt }` to the runtime verify endpoint and returns the runtime response directly.

### Runtime environment variables
- `COMMANDLAYER_RUNTIME_URL` (optional, default: `https://runtime.commandlayer.org`)
- `COMMANDLAYER_VERIFY_PATH` (optional, default: `/api/verify`)
- `ETHEREUM_RPC_URL` (optional, used for ENS text record lookups)
- `PORT` (optional, default: `3000`)

## Trust 10 actions
verify, authenticate, signing, attest, validate, proof, witness, certify, notarize, approve.
Only `verify` is live in v1.

## Run
```bash
npm install
npm start
```

## Railway deploy
Deploy with Railway using `railway.toml`, then point `mcp.commandlayer.org` to the deployment.

## ENS TXT records on runtime.commandlayer.eth
- cl.sig.kid
- cl.sig.pub
- cl.sig.canonical
- cl.receipt.signer
