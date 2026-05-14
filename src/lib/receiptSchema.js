import { z } from 'zod';

// ISO-8601 timestamp — require the Z suffix for unambiguous UTC.
const isoTimestamp = z.string().regex(
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/,
  'timestamp must be a UTC ISO-8601 string ending in Z'
);

export const proofSchema = z.object({
  canonical: z.literal('json.sorted_keys.v1'),
  alg: z.enum(['ed25519']),
  signature: z.string().min(16).regex(/^[A-Za-z0-9+/=]+$/),
  kid: z.string().min(1),
  signer_id: z.string().min(1),
});

// CommandLayer receipt schema v1.1.0
// Signing spec: Ed25519(UTF8(canonicalize(payload))) — raw canonical bytes, no pre-hash
export const receiptSchema = z.object({
  version: z.literal('1.1.0'),
  family: z.literal('trust-verification'),
  signer: z.string().min(1),
  verb: z.string().min(1),
  ts: isoTimestamp,
  input: z.record(z.string(), z.unknown()),
  output: z.record(z.string(), z.unknown()),
  execution: z.object({
    status: z.enum(['ok', 'error']),
    duration_ms: z.number().int().nonnegative(),
    started_at: isoTimestamp,
    completed_at: isoTimestamp,
    error: z.string().optional(),
  }),
  proof: proofSchema,
});
