import { ACTION_BY_AGENT } from '../registry/actions.js';
import { resolveAgentRecords } from '../lib/ensResolver.js';

export async function resolveAgent({ agent }) {
  const metadata = ACTION_BY_AGENT[agent] || null;
  const records = await resolveAgentRecords(agent);
  return { status: 'ok', agent, metadata, records };
}
