import { TRUST_ACTIONS, ACTION_BY_NAME } from '../registry/actions.js';

export async function discoverAction({ capability } = {}) {
  if (!capability) return { status: 'ok', actions: TRUST_ACTIONS };
  const action = ACTION_BY_NAME[capability];
  if (!action) return { status: 'not_found', message: `No action found for capability: ${capability}` };
  return { status: 'ok', actions: [action] };
}
