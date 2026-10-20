import { z } from 'zod';

export const PairDeviceRequestSchema = z.object({
  pairingCode: z.string().min(6).max(16),
  hostname: z.string(),
  platform: z.enum(['win32', 'darwin', 'linux']),
  bridgeVersion: z.string(),
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

export const RegisterProjectRequestSchema = z.object({
  roomId: z.string(),
  name: z.string(),
  rootPathRedacted: z.string(),
  gitBranch: z.string().optional(),
  gitRepo: z.string().optional(),
  sharedLevels: z.array(z.enum(['L1', 'L2', 'L3', 'L4'])),
});
export type RegisterProjectRequest = z.infer<typeof RegisterProjectRequestSchema>;
