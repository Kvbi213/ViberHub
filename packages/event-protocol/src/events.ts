import { z } from 'zod';

export const AgentStatusChangedPayloadSchema = z.object({
  status: z.enum(['working', 'waiting', 'idle', 'error', 'unknown']),
  activity: z.string().optional(),
  provider: z.enum(['antigravity', 'claude-code', 'custom']),
  sessionId: z.string().optional(),
  confidence: z.number().min(0).max(1),
  expiresInMs: z.number().int().positive(),
});
export type AgentStatusChangedPayload = z.infer<typeof AgentStatusChangedPayloadSchema>;

export const AgentTaskStartedPayloadSchema = z.object({
  taskId: z.string(),
  description: z.string(),
  toolsPlanned: z.array(z.string()).optional(),
});
export type AgentTaskStartedPayload = z.infer<typeof AgentTaskStartedPayloadSchema>;

export const AgentTaskCompletedPayloadSchema = z.object({
  taskId: z.string(),
  durationMs: z.number().nonnegative(),
  success: z.boolean(),
  errorSummary: z.string().optional(),
});
export type AgentTaskCompletedPayload = z.infer<typeof AgentTaskCompletedPayloadSchema>;

export const ToolStartedPayloadSchema = z.object({
  toolName: z.string(),
  callSummary: z.string().optional(),
});
export type ToolStartedPayload = z.infer<typeof ToolStartedPayloadSchema>;

export const ToolCompletedPayloadSchema = z.object({
  toolName: z.string(),
  durationMs: z.number().nonnegative(),
  success: z.boolean(),
  exitCode: z.number().int().optional(),
});
export type ToolCompletedPayload = z.infer<typeof ToolCompletedPayloadSchema>;

export const FileChangedPayloadSchema = z.object({
  filePath: z.string(),
  changeType: z.enum(['created', 'modified', 'deleted']),
  extension: z.string(),
  linesAdded: z.number().int().nonnegative().optional(),
  linesDeleted: z.number().int().nonnegative().optional(),
});
export type FileChangedPayload = z.infer<typeof FileChangedPayloadSchema>;

export const GitCommitCreatedPayloadSchema = z.object({
  commitHash: z.string(),
  branch: z.string(),
  authorName: z.string(),
  message: z.string(),
  filesCount: z.number().int().nonnegative(),
});
export type GitCommitCreatedPayload = z.infer<typeof GitCommitCreatedPayloadSchema>;

export const PreviewStatusChangedPayloadSchema = z.object({
  isOnline: z.boolean(),
  previewType: z.enum(['tunnel', 'public_url', 'screenshot']),
  url: z.string().url().optional(),
  port: z.number().int().positive().optional(),
  screenshotUrl: z.string().url().optional(),
});
export type PreviewStatusChangedPayload = z.infer<typeof PreviewStatusChangedPayloadSchema>;
