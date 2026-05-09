const verification = {
  emits_receipt: true,
  receipt_schema: 'cl.receipt.v1',
  verify_with: 'verifyagent.eth',
  signature_algorithm: 'Ed25519',
  hash: 'SHA-256',
  canonicalization: 'json.sorted_keys.v1'
};

const mkSchema = (action, status) => ({
  clas: `clas.${action}.v1`,
  action,
  namespace: `${action}agent.eth`,
  version: 'v1',
  family: 'trust-verification',
  status,
  input: { type: 'object', additionalProperties: true },
  output: { type: 'object', additionalProperties: true },
  verification
});

export const TRUST_SCHEMAS = {
  verify: mkSchema('verify', 'live'),
  authenticate: mkSchema('authenticate', 'planned'),
  signing: mkSchema('signing', 'planned'),
  attest: mkSchema('attest', 'planned'),
  validate: mkSchema('validate', 'planned'),
  proof: mkSchema('proof', 'planned'),
  witness: mkSchema('witness', 'planned'),
  certify: mkSchema('certify', 'planned'),
  notarize: mkSchema('notarize', 'planned'),
  approve: mkSchema('approve', 'planned')
};
