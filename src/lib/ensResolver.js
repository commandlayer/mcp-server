import { ethers } from 'ethers';

const RPC_URL = process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com';
const provider = new ethers.JsonRpcProvider(RPC_URL);

export async function resolveTextRecord(name, key) {
  try {
    return await provider.getResolver(name).then((r) => r?.getText(key) ?? null);
  } catch {
    return null;
  }
}

export async function resolveAgentRecords(name) {
  const keys = ['cl.sig.pub', 'cl.sig.kid', 'cl.sig.canonical', 'cl.receipt.signer', 'agent-context', 'agent-endpoint[mcp]'];
  const records = {};
  for (const key of keys) {
    records[key] = await resolveTextRecord(name, key);
  }
  return records;
}
