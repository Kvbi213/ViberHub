import { db } from './firebase';
import { collection, addDoc, getDocs, doc, setDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

export interface PersistedEvent {
  id?: string;
  schemaVersion: number;
  deviceId: string;
  projectId: string;
  occurredAt: string;
  source: string;
  type: string;
  data: Record<string, unknown>;
  createdAt?: unknown;
}

export interface DeviceRecord {
  deviceId: string;
  deviceToken?: string;
  hostname: string;
  platform: string;
  bridgeVersion: string;
  pairedAt: string;
  lastHeartbeat: string;
  status: 'online' | 'offline';
  operator?: {
    name?: string;
    role?: string;
  };
  activeAgents?: string[];
  systemInfo?: Record<string, any>;
  workspaceRoot?: string;
}

export async function registerOrUpdateDevice(roomId: string, device: DeviceRecord) {
  if (!db) return null;
  try {
    const devRef = doc(db, 'rooms', roomId, 'devices', device.deviceId);
    await setDoc(
      devRef,
      {
        ...device,
        lastHeartbeat: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return device.deviceId;
  } catch (error) {
    console.error('[!] ALERT :: Error registering device to Firestore:', error);
    return null;
  }
}

export async function fetchDevices(roomId: string): Promise<DeviceRecord[]> {
  if (!db) return [];
  try {
    const devsRef = collection(db, 'rooms', roomId, 'devices');
    const snap = await getDocs(devsRef);
    return snap.docs.map((d) => ({ deviceId: d.id, ...(d.data() as any) }));
  } catch (error) {
    console.error('[!] ALERT :: Error fetching devices from Firestore:', error);
    return [];
  }
}

export async function persistEvent(roomId: string, event: PersistedEvent) {
  if (!db) {
    console.warn('[*] INFO :: Firestore offline mode.');
    return null;
  }

  try {
    const eventsRef = collection(db, 'rooms', roomId, 'events');
    const docRef = await addDoc(eventsRef, {
      ...event,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[!] ALERT :: Error writing event to Firestore:', error);
    return null;
  }
}

export async function fetchRecentEvents(roomId: string, maxLimit = 20) {
  if (!db) return [];

  try {
    const eventsRef = collection(db, 'rooms', roomId, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'), limit(maxLimit));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('[!] ALERT :: Error fetching events from Firestore:', error);
    return [];
  }
}

export async function syncActiveAgentsInFirestore(roomId: string, agents: any[]) {
  if (!db) return false;
  try {
    const promises = agents.map(async (agent) => {
      const agentRef = doc(db!, 'rooms', roomId, 'agents', agent.id);
      await setDoc(
        agentRef,
        {
          ...agent,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    });
    await Promise.all(promises);
    return true;
  } catch (err) {
    console.warn('[!] ALERT :: Failed to sync active agents in Firestore:', err);
    return false;
  }
}

export async function getActiveAgentsFromFirestore(roomId: string) {
  if (!db) return [];
  try {
    const agentsRef = collection(db, 'rooms', roomId, 'agents');
    const snap = await getDocs(agentsRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('[!] ALERT :: Failed to get agents from Firestore:', err);
    return [];
  }
}
