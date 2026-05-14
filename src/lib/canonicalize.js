/**
 * canonicalizePayload — deterministic JSON serialisation for CommandLayer receipts.
 *
 * Rules (json.sorted_keys.v1):
 *  - Object keys sorted lexicographically (Unicode code-point order)
 *  - No extra whitespace
 *  - Arrays preserve insertion order
 *  - Strings encoded as UTF-8
 *  - Numbers, booleans, null pass through unchanged
 *
 * The output is the byte representation that is fed directly into the Ed25519
 * signing / verification step: Ed25519(UTF8(canonicalize(payload))).
 */
export function canonicalizePayload(value) {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    const items = value.map((item) => canonicalizePayload(item));
    return `[${items.join(',')}]`;
  }

  const sortedKeys = Object.keys(value).sort();
  const pairs = sortedKeys.map(
    (key) => `${JSON.stringify(key)}:${canonicalizePayload(value[key])}`
  );
  return `{${pairs.join(',')}}`;
}

/**
 * canonicalizeBytes — returns the UTF-8 encoded Uint8Array of the canonical
 * JSON string. This is the direct input to Ed25519 sign/verify.
 */
export function canonicalizeBytes(value) {
  return new TextEncoder().encode(canonicalizePayload(value));
}
