import { verifyReceiptOnRuntime } from '../lib/commandlayerApi.js';

export async function verifyReceipt({ receipt }) {
  return verifyReceiptOnRuntime(receipt);
}
