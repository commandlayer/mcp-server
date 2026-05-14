import { canonicalizeBytes } from './canonicalize.js';

/**
 * verifyReceiptSignatureLocally — offline Ed25519 signature check.
 *
 * Verifies that receipt.proof.signature was produced by the private key
 * corresponding to rawPublicKeyBase64 over the canonical payload.
 *
 * The payload is the full receipt object MINUS the proof block, serialised
 * with canonicalizeBytes() (json.sorted_keys.v1).
 *
 * Returns { valid: boolean, error?: string }.
 *
 * Note: the authoritative verification path is via the runtime (verifyReceipt
 * tool → commandlayerApi → POST /verify). This function is provided for
 * callers that need a fully offline / local check.
 */
export async function verifyReceiptSignatureLocally(receipt, rawPublicKeyBase64) {
  if (!receipt || typeof receipt !== 'object') {
    return { valid: false, error: 'receipt must be a non-null object' };
  }
  if (typeof rawPublicKeyBase64 !== 'string' || rawPublicKeyBase64.length === 0) {
    return { valid: false, error: 'rawPublicKeyBase64 must be a non-empty string' };
  }

  const { proof, ...payloadWithoutProof } = receipt;

  if (!proof || typeof proof.signature !== 'string') {
    return { valid: false, error: 'receipt.proof.signature is missing or not a string' };
  }

  let signatureBytes;
  let publicKeyBytes;
  try {
    signatureBytes = Uint8Array.from(atob(proof.signature), (c) => c.charCodeAt(0));
    publicKeyBytes = Uint8Array.from(atob(rawPublicKeyBase64), (c) => c.charCodeAt(0));
  } catch {
    return { valid: false, error: 'failed to base64-decode signature or public key' };
  }

  const messageBytes = canonicalizeBytes(payloadWithoutProof);

  try {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      publicKeyBytes,
      { name: 'Ed25519' },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify(
      { name: 'Ed25519' },
      cryptoKey,
      signatureBytes,
      messageBytes
    );
    return { valid };
  } catch (err) {
    return {
      valid: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
