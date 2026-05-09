import { verifyReceiptLocally } from '../lib/receiptVerifier.js';
import { fallbackVerifyReceipt } from '../lib/commandlayerApi.js';

export async function verifyReceipt({ receipt }) {
  const local = await verifyReceiptLocally(receipt);
  if (local.status === 'VALID' || local.reason !== 'missing_or_invalid_pubkey') {
    return local;
  }

  try {
    const fallback = await fallbackVerifyReceipt(receipt);
    return { ...local, fallback, fallback_used: true };
  } catch {
    return local;
  }
}
