# CommandLayer Repository Instructions

This repository is part of the CommandLayer protocol stack.

## Repo role

`commandlayer/mcp-server` is the MCP bridge and transport integration layer for CommandLayer.

This repository owns:

- MCP server/tool exposure
- MCP transport integration
- action bridging into CommandLayer-compatible flows
- MCP-facing request and response adaptation
- bridge documentation and examples
- compatibility behavior between MCP clients and CommandLayer receipts

This repository does not own CLAS schema truth, core cryptographic semantics, runtime execution policy, SDK API design, public verifier UI, commercial pricing, or website marketing copy.

## Hard rules

- Do not guess.
- Do not publish packages.
- Do not merge pull requests.
- Do not redefine CLAS schema semantics.
- Do not redefine cryptographic semantics owned by `runtime-core`.
- Do not mutate receipt proof fields in ways that invalidate verification.
- Do not invent alternate receipt shapes for MCP convenience.
- Do not mock, skip, simulate, or weaken verification.
- Do not introduce placeholders, TODOs, skipped tests, or hardcoded secrets.
- Do not claim MCP compatibility unless behavior is tested.
- Do not change receipt semantics without referencing the CLAS stack contract.

## Protocol requirements

MCP bridge behavior MUST align with the canonical stack contract in `commandlayer/clas`:

- canonicalization ID: `json.sorted_keys.v1`
- hash algorithm: SHA-256
- signature algorithm: Ed25519
- receipts include required proof fields
- verifier semantics preserve `ok`, `status`, `checks`, and `errors`
- MCP adapters MUST NOT weaken receipt verification semantics

The MCP server MAY adapt transport shape for MCP clients, but MUST NOT change CommandLayer receipt semantics.

## Before editing

1. Inspect `package.json`, `README.md`, server entrypoints, tools, schemas, tests, examples, and `.env.example` where present.
2. Identify whether the change affects MCP tool exposure, transport behavior, receipt handling, verification, docs, tests, or package metadata.
3. Compare the change against the CLAS stack contract.
4. Make the smallest safe change.
5. Run build, test, typecheck, lint, and MCP smoke checks if available.
6. Report changed files, commands run, results, and remaining risks.

## Bridge rules

- MCP request adaptation MUST preserve CommandLayer action intent.
- MCP responses MUST distinguish transport success from receipt verification success.
- Receipt proof fields MUST NOT be rewritten after signing.
- Invalid receipts MUST NOT be represented as verified.
- Tool schemas MUST match implemented behavior.
- Public examples MUST not contain hardcoded secrets, private keys, or fake verification guarantees.
- Errors from runtime or verifier calls MUST be handled explicitly.

## Test requirements

Changes to MCP tools, transport mapping, receipt handling, or verification integration SHOULD include tests for:

- MCP tool schema validity
- successful bridge request
- invalid input handling
- runtime/verifier error handling
- receipt pass-through without proof mutation
- invalid receipt failure
- transport success with verification failure distinction

## Review focus

When reviewing changes, focus on:

- transport/protocol confusion
- receipt shape drift
- proof field mutation
- hidden verification bypasses
- mocked verification
- MCP tool schema mismatch
- missing async error handling
- hardcoded secrets or keys
- README claims not backed by implementation
- compatibility drift from CLAS

## Output format

For every task, report:

1. Summary
2. Files changed
3. Checks run
4. Results
5. Risks remaining
6. Follow-up recommendations
