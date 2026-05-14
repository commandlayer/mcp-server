const DEFAULT_RUNTIME_BASE_URL = 'https://runtime.commandlayer.org';
const FETCH_TIMEOUT_MS = 10_000;

function getRuntimeBaseUrl() {
  return (process.env.COMMANDLAYER_RUNTIME_URL || DEFAULT_RUNTIME_BASE_URL).replace(/\/$/, '');
}

export async function postToRuntime(path, payload) {
  const baseUrl = getRuntimeBaseUrl();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timer);
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    return {
      status: isTimeout ? 'RUNTIME_TIMEOUT' : 'RUNTIME_UNAVAILABLE',
      runtime_url: baseUrl,
      error: error instanceof Error ? error.message : String(error),
    };
  }
  clearTimeout(timer);

  let body;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    return {
      status: 'RUNTIME_ERROR',
      runtime_url: baseUrl,
      http_status: response.status,
      body,
    };
  }

  return body ?? { status: 'RUNTIME_ERROR', runtime_url: baseUrl, error: 'empty_runtime_response' };
}

export async function verifyReceiptOnRuntime(receipt) {
  // Default path is /verify — matches the runtime server's POST /verify endpoint.
  // Override with COMMANDLAYER_VERIFY_PATH if routing through a proxy.
  return postToRuntime(process.env.COMMANDLAYER_VERIFY_PATH || '/verify', { receipt });
}
