import { z } from 'zod';

export const EventSourceSchema = z.enum([
  'antigravity',
  'claude-code',
  'system',
  'git',
  'custom',
]);
export type EventSource = z.infer<typeof EventSourceSchema>;

export const EventTypeSchema = z.enum([
  'agent.status_changed',
  'agent.task_started',
  'agent.task_completed',
  'tool.started',
  'tool.completed',
  'file.changed',
  'git.commit_created',
  'preview.status_changed',
  'bridge.heartbeat',
]);
export type EventType = z.infer<typeof EventTypeSchema>;

export const CanonicalEventEnvelopeSchema = z.object({
  id: z.string(),
  schemaVersion: z.number().int().default(1),
  deviceId: z.string(),
  projectId: z.string(),
  occurredAt: z.string().datetime(),
  receivedAt: z.string().datetime().optional(),
  source: EventSourceSchema,
  type: EventTypeSchema,
  data: z.record(z.unknown()),
});
export type CanonicalEventEnvelope = z.infer<typeof CanonicalEventEnvelopeSchema>;

export const EventBatchRequestSchema = z.object({
  schemaVersion: z.number().int().default(1),
  deviceId: z.string(),
  projectId: z.string(),
  events: z.array(CanonicalEventEnvelopeSchema).min(1).max(50),
});
export type EventBatchRequest = z.infer<typeof EventBatchRequestSchema>;

export const EventBatchResponseSchema = z.object({
  success: z.boolean(),
  acceptedCount: z.number().int(),
  rejectedCount: z.number().int(),
  errors: z.array(z.string()).default([]),
});
export type EventBatchResponse = z.infer<typeof EventBatchResponseSchema>;
