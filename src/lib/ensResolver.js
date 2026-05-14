import { ethers } from 'ethers';

const RPC_URL = process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com';
const ENS_TIMEOUT_MS = 8_000;

// Provider is initialised once at startup. RPC URL changes require a restart,
// which is the correct behaviour for a server process.
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Loose ENS name pattern: at least one label followed by a TLD.
const ENS_NAME_RE = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

export function isValidEnsName(name) {
  return typeof name === 'string' && name.length > 0 && ENS_NAME_RE.test(name);
}

export async function resolveTextRecord(name, key) {
  try {
    const resolver = await Promise.race([
      provider.getResolver(name),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('ENS resolver timeout')), ENS_TIMEOUT_MS)
      ),
    ]);
    return resolver ? await resolver.getText(key) : null;
  } catch {
    return null;
  }
}

export async function resolveAgentRecords(name) {
  const keys = [
    'cl.sig.pub',
    'cl.sig.kid',
    'cl.sig.canonical',
    'cl.receipt.signer',
    'agent-context',
    'agent-endpoint[mcp]',
  ];

  const values = await Promise.all(keys.map((key) => resolveTextRecord(name, key)));
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
}
