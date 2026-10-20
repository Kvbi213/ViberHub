import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

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
