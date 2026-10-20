import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserStats {
  totalCoopSeconds: number;
  totalSessionsCount: number;
  totalEventsEmitted: number;
  roomsJoinedCount: number;
  lastActiveRoom: string;
}

export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string;
  avatarUrl: string;
  isAnonymous: boolean;
  createdAt: string;
  lastSeenAt: string;
  stats: UserStats;
}

const DEFAULT_STATS: UserStats = {
  totalCoopSeconds: 0,
  totalSessionsCount: 1,
  totalEventsEmitted: 0,
  roomsJoinedCount: 1,
  lastActiveRoom: 'viberhub-8842f',
};

export async function getUserProfile(uid: string): Promise<UserProfileData | null> {
  if (!db) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfileData;
    }
    return null;
  } catch (error) {
    console.warn('[!] ALERT :: Failed to fetch user profile:', error);
    return null;
  }
}

export async function createOrUpdateUserDoc(user: User, customDisplayName?: string): Promise<UserProfileData> {
  const displayName = customDisplayName || user.displayName || (user.isAnonymous ? 'Gość Co-op' : 'Operator');
  const avatarUrl =
    user.photoURL ||
    `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  const existing = await getUserProfile(user.uid);
  if (existing) {
    const updatedStats: UserStats = {
      ...DEFAULT_STATS,
      ...existing.stats,
      totalSessionsCount: (existing.stats?.totalSessionsCount || 0) + 1,
    };
    if (db) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          lastSeenAt: new Date().toISOString(),
          'stats.totalSessionsCount': increment(1),
        });
      } catch (err) {
        console.warn('[!] ALERT :: Could not update lastSeenAt:', err);
      }
    }
    return {
      ...existing,
      stats: updatedStats,
    };
  }

  const newProfile: UserProfileData = {
    uid: user.uid,
    email: user.email,
    displayName,
    avatarUrl,
    isAnonymous: user.isAnonymous,
    createdAt: new Date().toISOString(),
    lastSeenAt: new Date().toISOString(),
    stats: { ...DEFAULT_STATS },
  };

  if (db) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, newProfile);
    } catch (err) {
      console.warn('[!] ALERT :: Could not write new user doc:', err);
    }
  }

  return newProfile;
}

export async function recordCoopTime(uid: string, secondsDelta: number, roomId: string): Promise<void> {
  if (!db || secondsDelta <= 0) return;
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      lastSeenAt: new Date().toISOString(),
      'stats.totalCoopSeconds': increment(secondsDelta),
      'stats.lastActiveRoom': roomId,
    });
  } catch (err) {
    // Ciche ignorowanie przy braku uprawnień offline
    console.debug('coop time sync fallback', err);
  }
}

export async function recordEventEmitted(uid: string): Promise<void> {
  if (!db) return;
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      'stats.totalEventsEmitted': increment(1),
    });
  } catch {
    // fallback
  }
}

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  if (!auth) throw new Error('Firebase Auth unavailable');
  const res = await signInWithEmailAndPassword(auth, email, pass);
  await createOrUpdateUserDoc(res.user);
  return res.user;
}

export async function registerWithEmail(email: string, pass: string, displayName: string): Promise<User> {
  if (!auth) throw new Error('Firebase Auth unavailable');
  const res = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(res.user, { displayName });
  await createOrUpdateUserDoc(res.user, displayName);
  return res.user;
}

export async function loginWithGoogle(): Promise<User> {
  if (!auth) throw new Error('Firebase Auth unavailable');
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  await createOrUpdateUserDoc(res.user);
  return res.user;
}

export async function loginAsGuest(nickname?: string): Promise<User> {
  if (!auth) throw new Error('Firebase Auth unavailable');
  const res = await signInAnonymously(auth);
  const chosenName = nickname?.trim() || `Dev_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  await updateProfile(res.user, { displayName: chosenName });
  await createOrUpdateUserDoc(res.user, chosenName);
  return res.user;
}

export async function logoutUser(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
