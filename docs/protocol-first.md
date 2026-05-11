# Protocol-first trust model

- Service vs protocol: services can fail, receipts remain verifiable.
- Self-verifying receipts: canonical payload + hash + Ed25519 signature.
- ENS key resolution: signer references are published in ENS TXT records using CLAS-canonical keys (`cl.signer`, `cl.proof`). Key identifiers (`kid`) are embedded in the receipt signature block and matched against ENS-published signer metadata.
- IPFS schemas: future versions can pin CLAS schemas to IPFS.
- Forkable MCP server: anyone can run this server and independently verify the same receipts.
