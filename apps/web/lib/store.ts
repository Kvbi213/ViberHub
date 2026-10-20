import { create } from 'zustand';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import {
  UserProfileData,
  subscribeToAuth,
  createOrUpdateUserDoc,
  recordCoopTime,
  recordEventEmitted,
  logoutUser,
} from './auth-service';

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
  recentGitCommits: Array<{ hash: string; message: string; date: string }>;
  gitBranch: string;
  permissions: {
    L1_git: boolean;
    L2_agent: boolean;
    L3_context: boolean;
    L4_preview: boolean;
  };
  currentUser: UserProfileData | null;
  activeCoopSessionSeconds: number;
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  setProfileModalOpen: (open: boolean) => void;
  setCurrentUser: (user: UserProfileData | null) => void;
  tickCoopTimer: () => void;
  persistCoopTime: () => Promise<void>;
  handleLogout: () => Promise<void>;
  initAuthListener: () => () => void;
  setRoomId: (id: string) => void;
  setActiveProject: (proj: 'apps/web' | 'apps/bridge') => void;
  setTunnelUrl: (url: string) => void;
  addEvent: (event: TelemetryEvent) => void;
  togglePermission: (key: keyof VibeHubState['permissions']) => void;
  syncWithSystemTelemetry: () => Promise<void>;
  initFirestoreLiveListener: (roomId: string) => () => void;
  simulateNextStep: () => Promise<void>;
}

export const useVibeHubStore = create<VibeHubState>((set, get) => ({
  roomId: 'viberhub-8842f',
  roomName: 'VibeHub Observability Mesh',
  isBridgeConnected: true,
  bridgeLatency: 14,
  activeProject: 'apps/web',
  tunnelUrl: 'viber-hub-git-main-kvbi.vercel.app/dashboard',
  eventsIngestedToday: 48,
  activeBridgesCount: 2,
  gitBranch: 'main',
  recentGitCommits: [],

  devA: {
    id: 'agent_dev01',
    name: 'Google Antigravity CLI',
    ownerName: 'Jakub (Operator)',
    ownerRole: 'Systems & Observability Architect',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8773YpK97KyUtsEgIpcFHWL4tE3leo59aFmWMdEazZynprwHNGMoZX2c-GSv0dxcpxzjMVi0NWTA0GPjFmnhKBrmuLiQRIyKSNbcc7XKxJ3cnyCC29nFGHJu9z9YI38ZB-ZrQ0S91cLjspbx3ERlwuf5PCarr2pab_30mQzMdvO9O3nGob45QczWNjG1huV482OLwswucklN2VRqWL-GSEZe73nXj8qw0G8MQP6ZbpeDjMVbLCKYy',
    machine: 'Windows 11 Workstation',
    provider: 'antigravity',
    model: 'Gemini 3.8 Flash (High)',
    status: 'working',
    activity: 'Zarządzanie projektem Firebase viberhub-8842f i wdrożenie reguł Firestore',
    currentStep: 'LIVE FIREBASE SYNC ACTIVE',
    tool: 'run_command',
    duration: '54m 20s',
    confidence: 100,
    activeFile: 'firebase/firestore.rules',
    fileStats: '+56 -8 LOC',
    diffSnippet: [
      { line: 36, type: '+', text: 'match /rooms/{roomId}/events/{eventId} {' },
      { line: 37, type: '+', text: '  allow read: if isRoomMember(roomId);' },
      { line: 38, type: ' ', text: '  allow write: if false; // Zapis z autoryzowanego backendu' },
      { line: 39, type: '+', text: '}' },
    ],
    ping: 12,
    memory: '512MB',
  },

  devB: {
    id: 'agent_dev02',
    name: 'Claude Code Agent',
    ownerName: 'Współpracownik (Peer)',
    ownerRole: 'Fullstack Systems Engineer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKYPqT4ZQwFKhH6SiBBJn9Pn3fPf0bmQFsvo8gn1aJY4zLEICzOqViDwlMLUgCbjtgSjoTHhbwqO4HyueLkOIvKEhNx4Vctv7g-m9eGHqt_gbRImP_dkWOmscKdPdZI-acw31ZVb2ix2NsVtIFaRB_aVrSit2_r_Aqv6FW0VsBWMzWKiMV9V6AsskRzl9U5RPHG-ILyfQwLSMrRau589mugxNhZg3oNR8u2gVKK8iEJkG38inxbfFG',
    machine: 'Arch Linux Devbox (Remote)',
    provider: 'claude-code',
    model: 'claude-3.5-sonnet',
    status: 'waiting',
    activity: 'Oczekiwanie na zatwierdzenie komendy testowej pnpm test w środowisku peer',
    currentStep: 'WAITING HUMAN CONFIRMATION',
    tool: 'run_command',
    duration: '22m 14s',
    confidence: 100,
    activeFile: 'packages/event-protocol/src/types.ts',
    fileStats: '+24 -3 LOC',
    diffSnippet: [
      { line: 28, type: '+', text: 'export const CanonicalEventEnvelopeSchema = z.object({' },
      { line: 29, type: '+', text: '  id: z.string(),' },
      { line: 30, type: ' ', text: '  schemaVersion: z.number().int().default(1),' },
    ],
    ping: 18,
    memory: '388MB',
  },

  events: [
    {
      id: 'evt_init_01',
      time: '15:25:51',
      source: 'system',
      type: 'firebase.deploy_complete',
      badge: 'FIREBASE_DEPLOY',
      badgeColor: 'text-[#34C759] bg-emerald-50 border-emerald-200/60',
      details: 'Reguły firestore.rules i indeksy wdrożone pomyślnie do projektu viberhub-8842f',
      metadata: 'project: viberhub-8842f, region: europe-central2',
    },
    {
      id: 'evt_init_02',
      time: '15:25:06',
      source: 'system',
      type: 'firestore.database_created',
      badge: 'FIRESTORE_NATIVE',
      badgeColor: 'text-[#0071E3] bg-blue-50 border-blue-200/60',
      details: 'Utworzono bazę Cloud Firestore w regionie europe-central2 (Warszawa)',
      metadata: 'mode: NATIVE, status: ONLINE',
    },
    {
      id: 'evt_init_03',
      time: '15:22:25',
      source: 'system',
      type: 'firebase.app_registered',
      badge: 'WEB_APP_READY',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200/60',
      details: 'Zarejestrowano aplikację viberhub (App ID: 1:221916880520:web:c9f077...)',
      metadata: 'apiKey: AIzaSyAHmam...',
    },
    {
      id: 'evt_init_04',
      time: '15:17:26',
      source: 'git',
      type: 'git.commit_created',
      badge: 'GIT_COMMIT',
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200/60',
      details: 'feat(ui): implement Milky Glass Observability, Apple Fluid design system',
      metadata: 'hash: c13edc9, files: 35',
    },
  ],

  permissions: {
    L1_git: true,
    L2_agent: true,
    L3_context: true,
    L4_preview: true,
  },

  currentUser: null,
  activeCoopSessionSeconds: 0,
  isAuthModalOpen: false,
  isProfileModalOpen: false,
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  setProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
  setCurrentUser: (user) => set({ currentUser: user }),

  tickCoopTimer: () =>
    set((state) => {
      const nextSec = state.activeCoopSessionSeconds + 1;
      // Auto-save every 30 seconds
      if (nextSec > 0 && nextSec % 30 === 0) {
        state.persistCoopTime();
      }
      return { activeCoopSessionSeconds: nextSec };
    }),

  persistCoopTime: async () => {
    const { currentUser, activeCoopSessionSeconds, roomId } = get();
    if (!currentUser || activeCoopSessionSeconds <= 0) return;
    try {
      await recordCoopTime(currentUser.uid, 30, roomId);
      set((state) => ({
        currentUser: state.currentUser
          ? {
              ...state.currentUser,
              stats: {
                ...state.currentUser.stats,
                totalCoopSeconds: (state.currentUser.stats?.totalCoopSeconds || 0) + 30,
              },
            }
          : null,
      }));
    } catch {
      // offline fallback
    }
  },

  handleLogout: async () => {
    await logoutUser();
    set({ currentUser: null, isProfileModalOpen: false });
  },

  initAuthListener: () => {
    const unsub = subscribeToAuth(async (user) => {
      if (user) {
        const profile = await createOrUpdateUserDoc(user);
        set({ currentUser: profile });
      } else {
        set({ currentUser: null });
      }
    });
    return unsub;
  },

  setRoomId: (id) => set({ roomId: id }),
  setActiveProject: (proj) => set({ activeProject: proj }),
  setTunnelUrl: (url) => set({ tunnelUrl: url }),
  addEvent: (event) =>
    set((state) => {
      if (state.events.some((e) => e.id === event.id)) {
        return state;
      }
      return {
        events: [event, ...state.events.slice(0, 49)],
        eventsIngestedToday: state.eventsIngestedToday + 1,
      };
    }),
  togglePermission: (key) =>
    set((state) => ({
      permissions: {
        ...state.permissions,
        [key]: !state.permissions[key],
      },
    })),

  simulateNextStep: async () => {
    const currentRoom = get().roomId || 'viberhub-8842f';
    const sampleTasks = [
      'Weryfikacja integralności tokenów Milky Glass w Tailwind CSS',
      'Testowanie handoffu zdarzeń z Bridge do Firestore',
      'Kompilacja i sanityzacja diffa Git w kanonicznym protokole',
      'Heartbeat i sprawdzenie mTLS tunelu obserwowalności',
      'Optymalizacja zużycia pamięci w sesji agenta',
    ];
    const chosenTask = sampleTasks[Math.floor(Math.random() * sampleTasks.length)];
    const eventPayload = {
      schemaVersion: 1,
      deviceId: 'dev_win32_local',
      projectId: currentRoom,
      events: [
        {
          id: `evt_live_${Date.now()}`,
          schemaVersion: 1,
          deviceId: 'dev_win32_local',
          projectId: currentRoom,
          occurredAt: new Date().toISOString(),
          source: 'antigravity',
          type: 'agent.task_started',
          data: {
            status: 'working',
            activity: chosenTask,
            provider: 'antigravity',
            confidence: 1.0,
          },
        },
      ],
    };
    try {
      const apiBase =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? ''
          : process.env.NEXT_PUBLIC_API_URL || 'https://viber-hub-git-main-kvbi.vercel.app';

      await fetch(`${apiBase}/api/v1/events/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      });

      const { currentUser } = get();
      if (currentUser) {
        await recordEventEmitted(currentUser.uid);
      }

      await get().syncWithSystemTelemetry();
    } catch (err) {
      console.warn('[!] ALERT :: Error emitting live event:', err);
    }
  },

  syncWithSystemTelemetry: async () => {
    try {
      const apiBase =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? ''
          : process.env.NEXT_PUBLIC_API_URL || 'https://viber-hub-git-main-kvbi.vercel.app';

      const res = await fetch(`${apiBase}/api/v1/system/status`);
      if (!res.ok) return;
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          gitBranch: data.git.branch || state.gitBranch,
          recentGitCommits: data.git.recentCommits || state.recentGitCommits,
          devA: {
            ...state.devA,
            machine: `${data.system.hostname} (${data.system.platform} ${data.system.arch})`,
            memory: data.system.memory,
            activity: data.agent.activeTask,
          },
        }));
      }
    } catch {
      // Ignoruj błąd cichej synchronizacji
    }
  },

  initFirestoreLiveListener: (roomId: string) => {
    if (!db) return () => {};

    try {
      const eventsRef = collection(db, 'rooms', roomId, 'events');
      const q = query(eventsRef, orderBy('createdAt', 'desc'), limit(50));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            const occurredTime = data.occurredAt
              ? new Date(data.occurredAt).toTimeString().split(' ')[0]
              : new Date().toTimeString().split(' ')[0];

            const newEvent: TelemetryEvent = {
              id: change.doc.id,
              time: occurredTime,
              source: (data.source as any) || 'system',
              type: data.type || 'agent.status_changed',
              badge: data.type ? data.type.toUpperCase().replace('.', '_') : 'EVENT',
              badgeColor:
                data.source === 'antigravity'
                  ? 'text-[#34C759] bg-emerald-50 border-emerald-200/60'
                  : data.source === 'claude-code'
                  ? 'text-[#FF9500] bg-amber-50 border-amber-200/60'
                  : 'text-[#0071E3] bg-blue-50 border-blue-200/60',
              details:
                data.data && typeof data.data.activity === 'string'
                  ? data.data.activity
                  : `${data.type} zarejestrowane w Firestore`,
              metadata: `id: ${change.doc.id.substring(0, 8)}`,
            };

            get().addEvent(newEvent);
          }
        });
      });

      return unsubscribe;
    } catch (error) {
      console.warn('[!] ALERT :: Firestore listener error:', error);
      return () => {};
    }
  },
}));
