const DEFAULT_RUNTIME_URL = 'https://runtime.commandlayer.org';

export async function getProtocolVersion() {
  return {
    status: 'ok',
    protocol_version: '1.1.0',
    signing_spec: 'Ed25519(UTF8(canonicalize(payload)))',
    canonicalization: 'json.sorted_keys.v1',
    receipt_format: 'commandlayer-receipt-v1.1',
    proof_fields: ['canonical', 'alg', 'signature', 'kid', 'signer_id'],
    schema_host: 'https://commandlayer.org/schemas',
    runtime_url: (process.env.COMMANDLAYER_RUNTIME_URL || DEFAULT_RUNTIME_URL).replace(/\/$/, ''),
  };
}
