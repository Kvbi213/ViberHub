import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  lastActiveAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  ownerId: z.string(),
  memberIds: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Room = z.infer<typeof RoomSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  ownerId: z.string(),
  name: z.string(),
  rootPathRedacted: z.string(),
  gitRepo: z.string().optional(),
  branch: z.string().optional(),
  sharedLevels: z.array(z.enum(['L1', 'L2', 'L3', 'L4'])),
  updatedAt: z.string().datetime(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const DeviceSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  hostname: z.string(),
  platform: z.enum(['win32', 'darwin', 'linux']),
  bridgeVersion: z.string(),
  status: z.enum(['online', 'offline', 'stale']),
  lastHeartbeatAt: z.string().datetime(),
  pairedAt: z.string().datetime(),
});
export type Device = z.infer<typeof DeviceSchema>;

export const AgentSnapshotSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  projectId: z.string(),
  deviceId: z.string(),
  provider: z.enum(['antigravity', 'claude-code', 'custom']),
  sessionId: z.string().optional(),
  status: z.enum(['working', 'waiting', 'idle', 'error', 'unknown']),
  activity: z.string().optional(),
  capabilities: z.array(z.string()),
  lastObservedAt: z.string().datetime(),
  statusExpiresAt: z.string().datetime(),
});
export type AgentSnapshot = z.infer<typeof AgentSnapshotSchema>;
