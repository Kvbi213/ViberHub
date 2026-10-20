import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAHmamkyjzSzGF8gTv1A1ouU7XIM2Dd4bU',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'viberhub-8842f.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'viberhub-8842f',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'viberhub-8842f.firebasestorage.app',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '221916880520',
  appId: process.env.FIREBASE_APP_ID || '1:221916880520:web:c9f0772ba68ba25a27893d',
};

let app: FirebaseApp;
let db: Firestore | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn('[!] ALERT :: Firestore initialization warning:', error);
}

export { db };

export interface PersistedEventData {
  schemaVersion: number;
  deviceId: string;
  projectId: string;
  occurredAt: string;
  source: string;
  type: string;
  data: Record<string, unknown>;
}

export async function persistEvent(roomId: string, event: PersistedEventData) {
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
    console.error('[!] ALERT :: Error writing event to Firestore from Vercel backend:', error);
    return null;
  }
}
