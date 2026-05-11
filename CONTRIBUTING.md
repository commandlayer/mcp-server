# Contributing to @commandlayer/mcp-server

This MCP server exposes CommandLayer trust-verification actions over the Model Context Protocol. It is built on the [CLAS](https://github.com/commandlayer/clas) schema foundation.

## Scope

This repo accepts:
- MCP tool implementations for CLAS trust-verification verbs
- ENS resolution improvements
- Documentation improvements
- Infrastructure and deployment configuration

This repo does not accept:
- MCP tools that produce non-CLAS-compliant receipts
- Changes that make this server the trust root (it is a transport bridge only)
- Vendor-specific lock-in

## Design principles

- The MCP server is a bridge, not the trust root
- Trust comes from CLAS receipts: `json.sorted_keys.v1` canonicalization, SHA-256 hash, Ed25519 signature
- ENS TXT records use CLAS-canonical key names (`cl.mcp`, `cl.verifier`, `cl.signer`, etc.)
- The canonical trust-verification verb list is defined in commandlayer/clas

## Canonical verbs

`verify`, `authenticate`, `authorize`, `attest`, `sign`, `permit`, `grant`, `approve`, `reject`, `endorse`

## Adding a new verb

1. Add the verb schema to `schemas/trust-verification/<verb>/` following the CLAS schema rules
2. Ensure `get_action_schema` can resolve the new verb
3. Update `discover_action` if it returns a static list
4. Update `README.md` verb list

## Pull requests

- Keep changes minimal and focused
- Do not introduce new runtime dependencies without discussion
- Reference the relevant CLAS schema when adding verb support
