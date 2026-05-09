export const TRUST_ACTIONS = [
  {
    agent: 'verifyagent.eth', action: 'verify', namespace: 'verifyagent.eth', status: 'live', family: 'trust-verification', clas: 'clas.verify.v1', mcp_compatible: true, receipts: true,
    description: 'Verify protocol-grade receipts and trust claims.', schema_path: 'schemas/trust-verification/verify/schema.v1.json'
  },
  {
    agent: 'authenticateagent.eth', action: 'authenticate', namespace: 'authenticateagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.authenticate.v1', mcp_compatible: true, receipts: true,
    description: 'Authenticate agent identity and session trust state.', schema_path: 'schemas/trust-verification/authenticate/schema.v1.json'
  },
  {
    agent: 'signingagent.eth', action: 'signing', namespace: 'signingagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.signing.v1', mcp_compatible: true, receipts: true,
    description: 'Produce signed trust artifacts for protocol actions.', schema_path: 'schemas/trust-verification/signing/schema.v1.json'
  },
  {
    agent: 'attestagent.eth', action: 'attest', namespace: 'attestagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.attest.v1', mcp_compatible: true, receipts: true,
    description: 'Create attestations for claims and observed behavior.', schema_path: 'schemas/trust-verification/attest/schema.v1.json'
  },
  {
    agent: 'validateagent.eth', action: 'validate', namespace: 'validateagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.validate.v1', mcp_compatible: true, receipts: true,
    description: 'Validate compliance and data integrity checks.', schema_path: 'schemas/trust-verification/validate/schema.v1.json'
  },
  {
    agent: 'proofagent.eth', action: 'proof', namespace: 'proofagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.proof.v1', mcp_compatible: true, receipts: true,
    description: 'Generate proof bundles for downstream verification.', schema_path: 'schemas/trust-verification/proof/schema.v1.json'
  },
  {
    agent: 'witnessagent.eth', action: 'witness', namespace: 'witnessagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.witness.v1', mcp_compatible: true, receipts: true,
    description: 'Record witnessed execution for trust evidence.', schema_path: 'schemas/trust-verification/witness/schema.v1.json'
  },
  {
    agent: 'certifyagent.eth', action: 'certify', namespace: 'certifyagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.certify.v1', mcp_compatible: true, receipts: true,
    description: 'Certify final outputs and issuance state.', schema_path: 'schemas/trust-verification/certify/schema.v1.json'
  },
  {
    agent: 'notarizeagent.eth', action: 'notarize', namespace: 'notarizeagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.notarize.v1', mcp_compatible: true, receipts: true,
    description: 'Notarize canonical records for long-term trust.', schema_path: 'schemas/trust-verification/notarize/schema.v1.json'
  },
  {
    agent: 'approveagent.eth', action: 'approve', namespace: 'approveagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.approve.v1', mcp_compatible: true, receipts: true,
    description: 'Approve workflow transitions with signed receipts.', schema_path: 'schemas/trust-verification/approve/schema.v1.json'
  }
];

export const ACTION_BY_NAME = Object.fromEntries(TRUST_ACTIONS.map((a) => [a.action, a]));
export const ACTION_BY_AGENT = Object.fromEntries(TRUST_ACTIONS.map((a) => [a.agent, a]));
