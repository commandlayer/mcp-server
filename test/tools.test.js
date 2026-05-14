import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverAction } from '../src/tools/discoverAction.js';
import { getActionSchema } from '../src/tools/getActionSchema.js';
import { getProtocolVersion } from '../src/tools/getProtocolVersion.js';
import { validateReceiptSchema } from '../src/tools/validateReceiptSchema.js';

function makeValidReceipt(overrides = {}) {
  const now = new Date().toISOString().replace(/\.\d+Z$/, '.000Z');
  return {
    version: '1.1.0',
    family: 'trust-verification',
    signer: 'verifyagent.eth',
    verb: 'verify',
    ts: now,
    input: { challenge: 'abc' },
    output: { approved: true },
    execution: { status: 'ok', duration_ms: 10, started_at: now, completed_at: now },
    proof: {
      canonical: 'json.sorted_keys.v1',
      alg: 'ed25519',
      signature: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      kid: 'kid-1',
      signer_id: 'verifyagent.eth',
    },
    ...overrides,
  };
}

test('discoverAction returns all actions when no capability given', async () => {
  const result = await discoverAction({});
  assert.equal(result.status, 'ok');
  assert.ok(Array.isArray(result.actions));
  assert.ok(result.actions.length > 0);
});

test('discoverAction filters by capability', async () => {
  const result = await discoverAction({ capability: 'verify' });
  assert.equal(result.status, 'ok');
  assert.equal(result.actions.length, 1);
  assert.equal(result.actions[0].action, 'verify');
});

test('discoverAction returns not_found for unknown capability', async () => {
  const result = await discoverAction({ capability: 'unknown-action' });
  assert.equal(result.status, 'not_found');
});

test('getActionSchema returns schema for known action', async () => {
  const result = await getActionSchema({ action: 'verify' });
  assert.equal(result.status, 'ok');
  assert.equal(result.schema.action, 'verify');
  assert.equal(result.schema.family, 'trust-verification');
});

test('getActionSchema returns not_found for unknown action', async () => {
  const result = await getActionSchema({ action: 'nonexistent' });
  assert.equal(result.status, 'not_found');
});

test('getProtocolVersion returns version and signing spec', async () => {
  const result = await getProtocolVersion();
  assert.equal(result.status, 'ok');
  assert.equal(result.protocol_version, '1.1.0');
  assert.ok(result.signing_spec.includes('Ed25519'));
  assert.equal(result.canonicalization, 'json.sorted_keys.v1');
  assert.ok(Array.isArray(result.proof_fields));
  assert.ok(result.proof_fields.includes('kid'));
  assert.ok(result.proof_fields.includes('signer_id'));
});

test('validateReceiptSchema accepts valid v1.1.0 receipt', async () => {
  const result = await validateReceiptSchema({ receipt: makeValidReceipt() });
  assert.equal(result.valid, true);
  assert.equal(result.status, 'ok');
});

test('validateReceiptSchema rejects receipt with missing proof', async () => {
  const { proof: _proof, ...noProof } = makeValidReceipt();
  const result = await validateReceiptSchema({ receipt: noProof });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.path === 'proof'));
});

test('validateReceiptSchema rejects old v1.0.x field names', async () => {
  const receipt = makeValidReceipt({
    proof: {
      canonicalization: 'json.sorted_keys.v1', // old: should be canonical
      signature_alg: 'ed25519',                // old: should be alg
      signature: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      key_id: 'kid-1',                         // old: should be kid
      signer: 'verifyagent.eth',               // old: should be signer_id
    },
  });
  const result = await validateReceiptSchema({ receipt });
  assert.equal(result.valid, false);
});

test('validateReceiptSchema rejects unsupported alg', async () => {
  const result = await validateReceiptSchema({
    receipt: makeValidReceipt({ proof: { ...makeValidReceipt().proof, alg: 'rsa-pkcs1v15' } }),
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.path === 'proof.alg'));
});

test('validateReceiptSchema rejects wrong canonicalization method', async () => {
  const result = await validateReceiptSchema({
    receipt: makeValidReceipt({ proof: { ...makeValidReceipt().proof, canonical: 'json.unsorted.v1' } }),
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.path === 'proof.canonical'));
});

test('validateReceiptSchema rejects receipt with old version 1.0.0', async () => {
  const result = await validateReceiptSchema({ receipt: makeValidReceipt({ version: '1.0.0' }) });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.path === 'version'));
});

test('validateReceiptSchema rejects receipt with non-UTC timestamp', async () => {
  const result = await validateReceiptSchema({
    receipt: makeValidReceipt({ ts: '2025-01-01T00:00:00+05:30' }),
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.path === 'ts'));
});
