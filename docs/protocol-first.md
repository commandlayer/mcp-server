# Protocol-first trust model

- Service vs protocol: services can fail, receipts remain verifiable.
- Self-verifying receipts: canonical payload + hash + Ed25519 signature.
- ENS public key resolution: verify keys from ENS TXT (`cl.sig.pub`, optional keyed `cl.sig.pub.{kid}`).
- IPFS schemas: future versions can pin CLAS schemas to IPFS.
- Forkable MCP server: anyone can run this server and independently verify the same receipts.
