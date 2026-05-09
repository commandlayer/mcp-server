const DEFAULT_RUNTIME_BASE_URL = 'https://runtime.commandlayer.org';

function getRuntimeBaseUrl() {
  return (process.env.COMMANDLAYER_RUNTIME_URL || DEFAULT_RUNTIME_BASE_URL).replace(/\/$/, '');
}

export async function postToRuntime(path, payload) {
  const baseUrl = getRuntimeBaseUrl();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    return {
      status: 'RUNTIME_UNAVAILABLE',
      runtime_url: baseUrl,
      error: error instanceof Error ? error.message : String(error)
    };
  }

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
      body
    };
  }

  return body ?? { status: 'RUNTIME_ERROR', runtime_url: baseUrl, error: 'empty_runtime_response' };
}

export async function verifyReceiptOnRuntime(receipt) {
  return postToRuntime(process.env.COMMANDLAYER_VERIFY_PATH || '/api/verify', { receipt });
}
