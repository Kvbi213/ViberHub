import { create } from 'zustand';

export interface AgentInfo {
  id: string;
  name: string;
  ownerName: string;
  ownerRole: string;
  avatarUrl: string;
  machine: string;
  provider: 'antigravity' | 'claude-code' | 'custom';
  model: string;
  status: 'working' | 'waiting' | 'idle' | 'error' | 'unknown';
  activity: string;
  currentStep?: string;
  tool: string;
  duration: string;
  confidence: number;
  activeFile: string;
  fileStats: string;
  diffSnippet: { line: number; type: '+' | '-' | ' '; text: string }[];
  ping: number;
  memory: string;
}

export interface TelemetryEvent {
  id: string;
  time: string;
  source: 'antigravity' | 'claude-code' | 'system' | 'git';
  type: string;
  badge: string;
  badgeColor: string;
  details: string;
  metadata?: string;
}

interface VibeHubState {
  roomId: string;
  roomName: string;
  isBridgeConnected: boolean;
  bridgeLatency: number;
  activeProject: 'apps/web' | 'apps/bridge';
  tunnelUrl: string;
  eventsIngestedToday: number;
  activeBridgesCount: number;
  devA: AgentInfo;
  devB: AgentInfo;
  events: TelemetryEvent[];
  permissions: {
    L1_git: boolean;
    L2_agent: boolean;
    L3_context: boolean;
    L4_preview: boolean;
  };
  setRoomId: (id: string) => void;
  setActiveProject: (proj: 'apps/web' | 'apps/bridge') => void;
  setTunnelUrl: (url: string) => void;
  addEvent: (event: TelemetryEvent) => void;
  togglePermission: (key: keyof VibeHubState['permissions']) => void;
  simulateNextStep: () => void;
}

export const useVibeHubStore = create<VibeHubState>((set) => ({
  roomId: '409',
  roomName: 'Antigravity Core Lab',
  isBridgeConnected: true,
  bridgeLatency: 14,
  activeProject: 'apps/web',
  tunnelUrl: 'preview-tunnel.vibehub.internal:3000/dashboard',
  eventsIngestedToday: 1482,
  activeBridgesCount: 2,

  devA: {
    id: 'agent_dev01',
    name: 'Google Antigravity CLI',
    ownerName: 'Ty',
    ownerRole: 'Staff Distributed Systems Architect',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8773YpK97KyUtsEgIpcFHWL4tE3leo59aFmWMdEazZynprwHNGMoZX2c-GSv0dxcpxzjMVi0NWTA0GPjFmnhKBrmuLiQRIyKSNbcc7XKxJ3cnyCC29nFGHJu9z9YI38ZB-ZrQ0S91cLjspbx3ERlwuf5PCarr2pab_30mQzMdvO9O3nGob45QczWNjG1huV482OLwswucklN2VRqWL-GSEZe73nXj8qw0G8MQP6ZbpeDjMVbLCKYy',
    machine: 'MacBook Pro M3 Max',
    provider: 'antigravity',
    model: 'gemini-2.5-pro',
    status: 'working',
    activity: 'Refactoring Firestore Security Rules & event batch validator across microservices',
    currentStep: 'EXECUTION STEP 4 / 7',
    tool: 'write_to_file',
    duration: '42m 18s',
    confidence: 98,
    activeFile: 'firestore.rules',
    fileStats: '+48 -12 LOC',
    diffSnippet: [
      { line: 104, type: '+', text: 'match /databases/{database}/documents/events/{eventId} {' },
      { line: 105, type: '+', text: '  allow create: if request.auth != null && request.resource.data.version == "v1";' },
      { line: 106, type: '-', text: '  allow write: if request.auth != null;' },
      { line: 107, type: ' ', text: '  allow read: if request.auth != null;' },
    ],
    ping: 14,
    memory: '412MB',
  },

  devB: {
    id: 'agent_dev02',
    name: 'Claude Code Agent',
    ownerName: 'Ziomek',
    ownerRole: 'Principal Fullstack Engineer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKYPqT4ZQwFKhH6SiBBJn9Pn3fPf0bmQFsvo8gn1aJY4zLEICzOqViDwlMLUgCbjtgSjoTHhbwqO4HyueLkOIvKEhNx4Vctv7g-m9eGHqt_gbRImP_dkWOmscKdPdZI-acw31ZVb2ix2NsVtIFaRB_aVrSit2_r_Aqv6FW0VsBWMzWKiMV9V6AsskRzl9U5RPHG-ILyfQwLSMrRau589mugxNhZg3oNR8u2gVKK8iEJkG38inxbfFG',
    machine: 'Arch Linux Devbox (Threadripper)',
    provider: 'claude-code',
    model: 'claude-3.5-sonnet',
    status: 'waiting',
    activity: 'Awaiting human authorization for terminal command: vitest run --coverage',
    currentStep: 'APPROVAL GATED',
    tool: 'run_command',
    duration: '18m 04s',
    confidence: 100,
    activeFile: 'packages/contracts/src/validator.ts',
    fileStats: '+19 -4 LOC',
    diffSnippet: [
      { line: 42, type: '+', text: 'export const EventEnvelopeSchema = z.object({' },
      { line: 43, type: '+', text: '  id: z.string().uuid(),' },
      { line: 44, type: ' ', text: '  schemaVersion: z.literal(1),' },
    ],
    ping: 18,
    memory: '388MB',
  },

  events: [
    {
      id: 'evt_101',
      time: '14:22:08',
      source: 'antigravity',
      type: 'tool.completed',
      badge: 'TOOL_COMPLETED',
      badgeColor: 'text-[#34C759] bg-emerald-50 border-emerald-200/60',
      details: 'write_to_file :: firestore.rules [Success, 12ms]',
      metadata: 'size: 4.2KB, lines: 48 added',
    },
    {
      id: 'evt_102',
      time: '14:22:01',
      source: 'claude-code',
      type: 'agent.status_changed',
      badge: 'STATUS_WAITING',
      badgeColor: 'text-[#FF9500] bg-amber-50 border-amber-200/60',
      details: 'Agent paused for operator approval on command execution',
      metadata: 'cmd: vitest run --coverage',
    },
    {
      id: 'evt_103',
      time: '14:21:45',
      source: 'git',
      type: 'git.commit_created',
      badge: 'GIT_COMMIT',
      badgeColor: 'text-[#0071E3] bg-blue-50 border-blue-200/60',
      details: 'feat(contracts): add canonical event validation schemas',
      metadata: 'hash: 7502efa, files: 8',
    },
    {
      id: 'evt_104',
      time: '14:21:12',
      source: 'system',
      type: 'bridge.heartbeat',
      badge: 'HEARTBEAT',
      badgeColor: 'text-slate-600 bg-slate-100 border-slate-200',
      details: 'Bridge pulse verified on both nodes (MacBook Pro + Arch Linux)',
      metadata: 'latency: 14ms / 18ms',
    },
  ],

  permissions: {
    L1_git: true,
    L2_agent: true,
    L3_context: true,
    L4_preview: true,
  },

  setRoomId: (id) => set({ roomId: id }),
  setActiveProject: (proj) => set({ activeProject: proj }),
  setTunnelUrl: (url) => set({ tunnelUrl: url }),
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events.slice(0, 49)],
      eventsIngestedToday: state.eventsIngestedToday + 1,
    })),
  togglePermission: (key) =>
    set((state) => ({
      permissions: {
        ...state.permissions,
        [key]: !state.permissions[key],
      },
    })),
  simulateNextStep: () =>
    set((state) => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newEvt: TelemetryEvent = {
        id: `evt_${Date.now()}`,
        time: timeStr,
        source: 'antigravity',
        type: 'agent.status_changed',
        badge: 'STATUS_SYNC',
        badgeColor: 'text-[#34C759] bg-emerald-50 border-emerald-200/60',
        details: 'Antigravity Agent progressed step in active execution loop',
        metadata: 'latency: 12ms',
      };
      return {
        events: [newEvt, ...state.events.slice(0, 49)],
        eventsIngestedToday: state.eventsIngestedToday + 1,
      };
    }),
}));
