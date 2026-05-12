# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities to **security@commandlayer.org**. Do not open a public GitHub issue.

You will receive a response within 48 hours. If the issue is confirmed we will release a patch as soon as possible.

## MCP Server Security Model

**verify_receipt** validates receipt structure via Zod before proxying to the configured runtime (`COMMANDLAYER_RUNTIME_URL`). Cryptographic verification — Ed25519 signature check and ENS-based public key resolution — is performed by the runtime, not this server.

**resolve_agent** performs live ENS resolution. Results depend on ENS being accessible and the ENS records being accurate. Consider the ENS trust model before using in high-assurance contexts.

**validate_receipt_schema** validates structure only — it performs no cryptographic verification and must not be used as a security gate.

**Rate limiting** is not built into this server. Deploy behind a reverse proxy or API gateway that enforces rate limits. `verify_receipt` and `resolve_agent` trigger network calls (runtime HTTP and ENS RPC) and are the most expensive endpoints.

**Input validation** — all tool inputs are validated via Zod schemas before processing. Unknown fields in the receipt proof are rejected (`additionalProperties`-equivalent via Zod `.strict()` semantics on the proof object).

## Known Limitations

**No key revocation.** ENS-based public keys have no expiration or revocation mechanism. A compromised signing key validates all past receipts forever. This is a known protocol-level limitation documented in the [CommandLayer Protocol](https://commandlayer.org/protocol).
