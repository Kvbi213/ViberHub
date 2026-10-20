import { z } from 'zod';

export const PairDeviceRequestSchema = z.object({
  pairingCode: z.string().min(6).max(16),
  hostname: z.string(),
  platform: z.enum(['win32', 'darwin', 'linux']),
  bridgeVersion: z.string(),
  operator: z
    .object({
      name: z.string().optional(),
      role: z.string().optional(),
    })
    .optional(),
  activeAgents: z.array(z.string()).optional(),
  workspaceRoot: z.string().optional(),
  systemInfo: z.record(z.any()).optional(),
});
export type PairDeviceRequest = z.infer<typeof PairDeviceRequestSchema>;

export const PairDeviceResponseSchema = z.object({
  success: z.boolean(),
  deviceId: z.string(),
  deviceToken: z.string(),
  ownerId: z.string(),
});
export type PairDeviceResponse = z.infer<typeof PairDeviceResponseSchema>;

export const HeartbeatRequestSchema = z.object({
  deviceId: z.string(),
  bridgeVersion: z.string(),
  uptimeSeconds: z.number(),
  activeProjectsCount: z.number(),
  activeAdapters: z.array(z.string()),
});
export type HeartbeatRequest = z.infer<typeof HeartbeatRequestSchema>;

export const HeartbeatResponseSchema = z.object({
  acknowledged: z.boolean(),
  serverTime: z.string(),
});
export type HeartbeatResponse = z.infer<typeof HeartbeatResponseSchema>;

export const RegisterProjectRequestSchema = z.object({
  roomId: z.string(),
  name: z.string(),
  rootPathRedacted: z.string(),
  gitBranch: z.string().optional(),
  gitRepo: z.string().optional(),
  sharedLevels: z.array(z.enum(['L1', 'L2', 'L3', 'L4'])),
});
export type RegisterProjectRequest = z.infer<typeof RegisterProjectRequestSchema>;

export const ActiveAgentSessionSchema = z.object({
  id: z.string(),
  conversationId: z.string().optional(),
  provider: z.enum(['antigravity', 'claude-code', 'cursor', 'custom']),
  name: z.string(),
  model: z.string(),
  status: z.enum(['working', 'waiting', 'idle', 'error']),
  activity: z.string(),
  currentTool: z.string().optional(),
  activeFile: z.string().optional(),
  fileStats: z.string().optional(),
  diffSnippet: z
    .array(
      z.object({
        line: z.number(),
        type: z.enum(['+', '-', ' ']),
        text: z.string(),
      })
    )
    .optional(),
  tokens: z
    .object({
      input: z.number().optional(),
      output: z.number().optional(),
      cacheRead: z.number().optional(),
    })
    .optional(),
  duration: z.string().optional(),
  confidence: z.number().optional(),
  lastActiveAt: z.string(),
  machine: z.string().optional(),
  operatorName: z.string().optional(),
});
export type ActiveAgentSession = z.infer<typeof ActiveAgentSessionSchema>;

export const SyncActiveAgentsRequestSchema = z.object({
  roomId: z.string(),
  deviceId: z.string(),
  agents: z.array(ActiveAgentSessionSchema),
});
export type SyncActiveAgentsRequest = z.infer<typeof SyncActiveAgentsRequestSchema>;
