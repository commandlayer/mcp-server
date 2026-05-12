# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-05-12

### Breaking Changes

- `verify_receipt` now validates receipt structure via Zod before proxying to the runtime. Receipts using pre-v1.1.0 field names (`signature_alg`, `key_id`, `signer`, `canonicalization`) are rejected at the MCP layer with a structured error.
- Default verify path corrected from `/api/verify` to `/verify` — this matches the runtime server's actual endpoint. Override with `COMMANDLAYER_VERIFY_PATH` if needed.

### Added

- **`get_protocol_version` tool** — returns the protocol version, signing specification, canonicalization method, proof field names, and schema host URL.
- **`validate_receipt_schema` tool** — validates a receipt's structure against the v1.1.0 schema without performing cryptographic verification. Returns structured field-level errors. Intended for development and debugging.
- `src/lib/receiptSchema.js` — shared Zod schema for the v1.1.0 receipt format, imported by both `verify_receipt` input validation and `validate_receipt_schema`.
- `test/tools.test.js` — unit tests for all tool handlers (no network required).
- `.env.example` documenting all environment variables.
- `SECURITY.md` documenting the security model and known limitations.
- CI workflow (`.github/workflows/ci.yml`) running `npm test` on every push and PR.

### Changed

- Tool definitions are now declared at module level so Zod schemas and handler references are evaluated once at startup rather than on every request.
- `src/lib/receiptVerifier.js` — dead code removed. This file implemented a 4th incompatible receipt format (`receipt.payload / .signer / .hash / .signature`) that was never called by any tool.
- `src/lib/canonicalize.js` — removed (was only imported by the now-dead `receiptVerifier.js`). Will be deleted once `@commandlayer/runtime-core` is published to npm.
- Health endpoint now includes `version` in the response body.
- Version bumped to `1.1.0`.

## [1.0.0] - 2026-03-01

Initial release.
