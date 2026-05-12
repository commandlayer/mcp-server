import { receiptSchema } from '../lib/receiptSchema.js';

export async function validateReceiptSchema({ receipt }) {
  const result = receiptSchema.safeParse(receipt);
  if (result.success) {
    return { status: 'ok', valid: true };
  }
  return {
    status: 'ok',
    valid: false,
    errors: result.error.issues.map((issue) => ({
      path: issue.path.join('.') || '(root)',
      message: issue.message,
      code: issue.code,
    })),
  };
}
