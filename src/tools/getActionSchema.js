import { TRUST_SCHEMAS } from '../registry/schemas.js';

export async function getActionSchema({ action }) {
  const schema = TRUST_SCHEMAS[action];
  if (!schema) return { status: 'not_found', message: `Schema not found for action: ${action}` };
  return { status: 'ok', schema };
}
