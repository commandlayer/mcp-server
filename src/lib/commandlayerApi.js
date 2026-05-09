const VERIFY_URL = process.env.COMMANDLAYER_VERIFY_URL || 'https://www.commandlayer.org/api/verify';

// Hosted verifier is convenience-only fallback, not trust root.
export async function fallbackVerifyReceipt(receipt) {
  const response = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ receipt })
  });

  if (!response.ok) {
    throw new Error(`Fallback verifier failed: ${response.status}`);
  }

  return response.json();
}
