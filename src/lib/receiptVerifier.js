import { createHash, createPublicKey, verify as verifySignature } from 'node:crypto';
import { canonicalize } from './canonicalize.js';
import { resolveTextRecord } from './ensResolver.js';

function decodeEd25519Key(record) {
  if (!record || !record.startsWith('ed25519:')) return null;
  return Buffer.from(record.slice('ed25519:'.length), 'base64');
}

export async function verifyReceiptLocally(receiptInput) {
  const checks = { schema: false, hash: false, signature: false, signer: false, canonicalization: false };
  const receipt = typeof receiptInput === 'string' ? JSON.parse(receiptInput) : receiptInput;

  const signer = receipt?.signer;
  const signature = receipt?.signature;
  const kid = receipt?.kid || receipt?.metadata?.kid;
  const claimedHash = receipt?.hash || receipt?.metadata?.proof?.hash;
  const payload = receipt?.payload;

  if (!receipt || typeof receipt !== 'object') return { status: 'INVALID', checks, reason: 'invalid_receipt' };
  checks.schema = true;
  if (!signer || !signature || !claimedHash || !payload) return { status: 'INVALID', checks, reason: 'missing_required_fields' };

  checks.signer = true;
  const canonical = canonicalize(payload);
  checks.canonicalization = true;

  const computedHash = createHash('sha256').update(canonical).digest('hex');
  checks.hash = computedHash.toLowerCase() === String(claimedHash).toLowerCase();

  const keyed = kid ? await resolveTextRecord(signer, `cl.sig.pub.${kid}`) : null;
  const fallback = await resolveTextRecord(signer, 'cl.sig.pub');
  const keyText = keyed || fallback;
  const pubRaw = decodeEd25519Key(keyText);
  if (!pubRaw) return { status: 'INVALID', checks, reason: 'missing_or_invalid_pubkey' };

  const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
  const keyObject = createPublicKey({ key: Buffer.concat([spkiPrefix, pubRaw]), format: 'der', type: 'spki' });
  const sigBuf = Buffer.from(signature, 'base64');
  checks.signature = verifySignature(null, Buffer.from(canonical), keyObject, sigBuf);

  return {
    status: checks.hash && checks.signature ? 'VALID' : 'INVALID',
    checks,
    signer,
    kid: kid ?? null,
    canonicalization: 'json.sorted_keys.v1',
    hash: { claimed: claimedHash, computed: computedHash }
  };
}
