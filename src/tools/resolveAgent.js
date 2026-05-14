import { ACTION_BY_AGENT } from '../registry/actions.js';
import { resolveAgentRecords, isValidEnsName } from '../lib/ensResolver.js';

export async function resolveAgent({ agent }) {
  if (typeof agent !== 'string' || agent.trim().length === 0) {
    return { status: 'invalid_input', error: 'agent must be a non-empty string' };
  }

  if (!isValidEnsName(agent)) {
    return {
      status: 'invalid_input',
      error: `"${agent}" is not a valid ENS name (expected format: label.tld)`,
    };
  }

  const metadata = ACTION_BY_AGENT[agent] || null;
  const records = await resolveAgentRecords(agent);
  return { status: 'ok', agent, metadata, records };
}
