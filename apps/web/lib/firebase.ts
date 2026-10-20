import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAHmamkyjzSzGF8gTv1A1ouU7XIM2Dd4bU',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'viberhub-8842f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'viberhub-8842f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'viberhub-8842f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '221916880520',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:221916880520:web:c9f0772ba68ba25a27893d',
};

let app: FirebaseApp;
let auth: Auth | null = null;
let db: Firestore | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  if (typeof window !== 'undefined') {
    auth = getAuth(app);
  }
} catch (error) {
  console.warn('[!] ALERT :: Firebase client init fallback mode active.', error);
  app = getApps()[0];
  if (app) {
    db = getFirestore(app);
  }
}

export { app, auth, db };
