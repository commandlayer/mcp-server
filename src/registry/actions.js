export const TRUST_ACTION_DEFINITIONS = {
  verify: 'confirm claim against evidence',
  authenticate: 'confirm identity and source',
  attest: 'signed assertion of truth',
  certify: 'formal confirmation condition met',
  notarize: 'immutable timestamped witness record',
  validate: 'schema and rule conformance check',
  witness: 'observed event record',
  approve: 'authorization to proceed',
  sign: 'cryptographic commitment',
  endorse: 'trust and reputation voucher'
};

export const TRUST_ACTIONS = [
  {
    agent: 'verifyagent.eth', action: 'verify', namespace: 'verifyagent.eth', status: 'live', family: 'trust-verification', clas: 'clas.verify.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.verify, schema_path: 'schemas/trust-verification/verify/schema.v1.json'
  },
  {
    agent: 'authenticateagent.eth', action: 'authenticate', namespace: 'authenticateagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.authenticate.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.authenticate, schema_path: 'schemas/trust-verification/authenticate/schema.v1.json'
  },
  {
    agent: 'attestagent.eth', action: 'attest', namespace: 'attestagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.attest.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.attest, schema_path: 'schemas/trust-verification/attest/schema.v1.json'
  },
  {
    agent: 'certifyagent.eth', action: 'certify', namespace: 'certifyagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.certify.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.certify, schema_path: 'schemas/trust-verification/certify/schema.v1.json'
  },
  {
    agent: 'notarizeagent.eth', action: 'notarize', namespace: 'notarizeagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.notarize.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.notarize, schema_path: 'schemas/trust-verification/notarize/schema.v1.json'
  },
  {
    agent: 'validateagent.eth', action: 'validate', namespace: 'validateagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.validate.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.validate, schema_path: 'schemas/trust-verification/validate/schema.v1.json'
  },
  {
    agent: 'witnessagent.eth', action: 'witness', namespace: 'witnessagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.witness.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.witness, schema_path: 'schemas/trust-verification/witness/schema.v1.json'
  },
  {
    agent: 'approveagent.eth', action: 'approve', namespace: 'approveagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.approve.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.approve, schema_path: 'schemas/trust-verification/approve/schema.v1.json'
  },
  {
    agent: 'signagent.eth', action: 'sign', namespace: 'signagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.sign.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.sign, schema_path: 'schemas/trust-verification/sign/schema.v1.json'
  },
  {
    agent: 'endorseagent.eth', action: 'endorse', namespace: 'endorseagent.eth', status: 'planned', family: 'trust-verification', clas: 'clas.endorse.v1', mcp_compatible: true, receipts: true,
    description: TRUST_ACTION_DEFINITIONS.endorse, schema_path: 'schemas/trust-verification/endorse/schema.v1.json'
  }
];

export const ACTION_BY_NAME = Object.fromEntries(TRUST_ACTIONS.map((a) => [a.action, a]));
export const ACTION_BY_AGENT = Object.fromEntries(TRUST_ACTIONS.map((a) => [a.agent, a]));
