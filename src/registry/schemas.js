const verification = {
  emits_receipt: true,
  receipt_schema: 'cl.receipt.v1',
  verify_with: 'verifyagent.eth',
  signature_algorithm: 'Ed25519',
  hash: 'SHA-256',
  canonicalization: 'json.sorted_keys.v1'
};

const namespaceFor = (action) => {
  if (action === 'sign') return 'signagent.eth';
  if (action === 'endorse') return 'endorseagent.eth';
  return `${action}agent.eth`;
};

const mkSchema = (action, status) => ({
  clas: `clas.${action}.v1`,
  action,
  namespace: namespaceFor(action),
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
  attest: mkSchema('attest', 'planned'),
  certify: mkSchema('certify', 'planned'),
  notarize: mkSchema('notarize', 'planned'),
  validate: mkSchema('validate', 'planned'),
  witness: mkSchema('witness', 'planned'),
  approve: mkSchema('approve', 'planned'),
  sign: mkSchema('sign', 'planned'),
  endorse: mkSchema('endorse', 'planned')
};
