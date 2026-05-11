# CommandLayer MCP Server

Trust & Verification v1 MCP server for CommandLayer.

## Purpose
This server exposes MCP tools and bridges runtime-backed operations to the CommandLayer runtime over HTTP.

## Supported MCP tools
- `discover_action` — list available trust-verification actions and their schemas
- `get_action_schema` — return CLAS request and receipt schema for a given verb
- `verify_receipt` — forward receipt to the runtime verifier and return result
- `resolve_agent` — resolve ENS agent name to metadata

## Runtime bridge
`verify_receipt` forwards `{ receipt }` to the runtime verify endpoint and returns the runtime response directly. Trust comes from verifiable CLAS receipts (canonical JSON → SHA-256 → Ed25519), not from the MCP server itself.

### Runtime environment variables
- `COMMANDLAYER_RUNTIME_URL` (optional, default: `https://runtime.commandlayer.org`)
- `COMMANDLAYER_VERIFY_PATH` (optional, default: `/api/verify`)
- `ETHEREUM_RPC_URL` (optional, used for ENS text record lookups)
- `PORT` (optional, default: `3000`)

## Trust-verification verbs (CLAS canonical)
verify, authenticate, authorize, attest, sign, permit, grant, approve, reject, endorse. Only `verify` is connected to the runtime verifier in v1; all verbs are schema-discoverable via `get_action_schema`.

## Run
```bash
npm install
npm start
```

## Railway deploy
Deploy with Railway using `railway.toml`, then point `mcp.commandlayer.org` to the deployment.

## ENS TXT records (CLAS-canonical keys)
The following ENS TXT record keys are defined by the CLAS ens-discovery spec:
- `cl.schema` — URI for the CLAS schema set
- `cl.openapi` — URI for the OpenAPI descriptor
- `cl.mcp` — URI for this MCP server
- `cl.receipt.schema` — URI for the receipt schema
- `cl.verifier` — verifier endpoint URI
- `cl.capability` — capability declaration
- `cl.version` — CLAS profile version
- `cl.family` — schema family identifier (e.g. `trust-verification`)
- `cl.verb` — supported verb(s)
- `cl.proof` — supported proof primitive(s) (e.g. `Ed25519`)
- `cl.signer` — expected signer identifier(s)
