# CommandLayer MCP Server

Trust & Verification v1 MCP server for CommandLayer.

## Receipt-first architecture
The receipt is the protocol. This MCP server is a convenience layer for discovery, schema lookup, receipt verification, and ENS resolution.

## Supported MCP tools
- discover_action
- get_action_schema
- verify_receipt
- resolve_agent

## Trust 10 actions
verify, authenticate, signing, attest, validate, proof, witness, certify, notarize, approve.
Only `verify` is live in v1.

## Railway deploy
Deploy with Railway using `railway.toml`, then point `mcp.commandlayer.org` to the deployment.

## ENS TXT records on runtime.commandlayer.eth
- cl.sig.kid
- cl.sig.pub
- cl.sig.canonical
- cl.receipt.signer
