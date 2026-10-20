import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'vibehub-demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'vibehub-demo',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'vibehub-demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

let app: FirebaseApp;
let auth: Auth | null = null;
let db: Firestore | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (error) {
  console.warn('[!] ALERT :: Firebase client init fallback mode active.', error);
  app = getApps()[0];
}

export { app, auth, db };
