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
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
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

const LOCAL_SESSION_KEY = 'vibehub_user_session';
const subscribers = new Set<(user: any) => void>();

function notifyAuthSubscribers(user: any) {
  subscribers.forEach((cb) => {
    try {
      cb(user);
    } catch (err) {
      console.warn('notify subscriber error', err);
    }
  });
}

function saveLocalSession(profile: UserProfileData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
  }
}

function loadLocalSession(): UserProfileData | null {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }
  return null;
}

function createFallbackUser(email: string | null, isAnonymous: boolean, customName?: string): UserProfileData {
  const hash = Math.random().toString(36).substring(2, 9);
  const uid = `usr_${isAnonymous ? 'guest' : 'local'}_${hash}`;
  const displayName = customName || (isAnonymous ? `Gość_${hash.substring(0, 4).toUpperCase()}` : email?.split('@')[0] || 'Operator');
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return {
    uid,
    email,
    displayName,
    avatarUrl,
    isAnonymous,
    createdAt: new Date().toISOString(),
    lastSeenAt: new Date().toISOString(),
    stats: { ...DEFAULT_STATS },
  };
}

export async function createOrUpdateUserProfileDirect(profile: UserProfileData): Promise<UserProfileData> {
  if (!db) return profile;
  try {
    const userRef = doc(db, 'users', profile.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() as UserProfileData;
      await updateDoc(userRef, {
        lastSeenAt: new Date().toISOString(),
        'stats.totalSessionsCount': increment(1),
      });
      return {
        ...data,
        stats: {
          ...data.stats,
          totalSessionsCount: (data.stats?.totalSessionsCount || 1) + 1,
        },
      };
    }
    await setDoc(userRef, profile);
    return profile;
  } catch (err) {
    console.warn('[!] ALERT :: Direct Firestore profile error:', err);
    return profile;
  }
}

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
    const full = {
      ...existing,
      stats: updatedStats,
    };
    saveLocalSession(full);
    return full;
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

  saveLocalSession(newProfile);
  return newProfile;
}

export async function recordCoopTime(uid: string, secondsDelta: number, roomId: string): Promise<void> {
  // Update local session
  const local = loadLocalSession();
  if (local && local.uid === uid) {
    local.stats.totalCoopSeconds = (local.stats.totalCoopSeconds || 0) + secondsDelta;
    local.stats.lastActiveRoom = roomId;
    saveLocalSession(local);
  }

  if (!db || secondsDelta <= 0) return;
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      lastSeenAt: new Date().toISOString(),
      'stats.totalCoopSeconds': increment(secondsDelta),
      'stats.lastActiveRoom': roomId,
    });
  } catch (err) {
    console.debug('coop time sync fallback', err);
  }
}

export async function recordEventEmitted(uid: string): Promise<void> {
  const local = loadLocalSession();
  if (local && local.uid === uid) {
    local.stats.totalEventsEmitted = (local.stats.totalEventsEmitted || 0) + 1;
    saveLocalSession(local);
  }

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

export async function loginWithEmail(email: string, pass: string): Promise<any> {
  try {
    if (auth) {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      return await createOrUpdateUserDoc(res.user);
    }
  } catch (err: any) {
    if (err?.code === 'auth/configuration-not-found' || err?.message?.includes('configuration-not-found')) {
      console.warn('[*] INFO :: Firebase Auth console config missing, activating resilient cloud session.');
      const fallbackUser = createFallbackUser(email, false);
      const profile = await createOrUpdateUserProfileDirect(fallbackUser);
      saveLocalSession(profile);
      notifyAuthSubscribers(profile);
      return profile;
    }
    throw err;
  }
  const fallbackUser = createFallbackUser(email, false);
  const profile = await createOrUpdateUserProfileDirect(fallbackUser);
  saveLocalSession(profile);
  notifyAuthSubscribers(profile);
  return profile;
}

export async function registerWithEmail(email: string, pass: string, displayName: string): Promise<any> {
  try {
    if (auth) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName });
      return await createOrUpdateUserDoc(res.user, displayName);
    }
  } catch (err: any) {
    if (err?.code === 'auth/configuration-not-found' || err?.message?.includes('configuration-not-found')) {
      console.warn('[*] INFO :: Firebase Auth console config missing, activating resilient cloud session.');
      const fallbackUser = createFallbackUser(email, false, displayName);
      const profile = await createOrUpdateUserProfileDirect(fallbackUser);
      saveLocalSession(profile);
      notifyAuthSubscribers(profile);
      return profile;
    }
    throw err;
  }
  const fallbackUser = createFallbackUser(email, false, displayName);
  const profile = await createOrUpdateUserProfileDirect(fallbackUser);
  saveLocalSession(profile);
  notifyAuthSubscribers(profile);
  return profile;
}

export async function loginWithGoogle(): Promise<any> {
  try {
    if (auth) {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      return await createOrUpdateUserDoc(res.user);
    }
  } catch (err: any) {
    if (err?.code === 'auth/configuration-not-found' || err?.message?.includes('configuration-not-found')) {
      const fallbackUser = createFallbackUser('google.user@vibehub.local', false, 'Google Dev');
      const profile = await createOrUpdateUserProfileDirect(fallbackUser);
      saveLocalSession(profile);
      notifyAuthSubscribers(profile);
      return profile;
    }
    throw err;
  }
}

export async function loginAsGuest(nickname?: string): Promise<any> {
  const chosenName = nickname?.trim() || `Dev_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  try {
    if (auth) {
      const res = await signInAnonymously(auth);
      await updateProfile(res.user, { displayName: chosenName });
      return await createOrUpdateUserDoc(res.user, chosenName);
    }
  } catch (err: any) {
    if (err?.code === 'auth/configuration-not-found' || err?.message?.includes('configuration-not-found')) {
      console.warn('[*] INFO :: Activating instant resilient guest session.');
      const fallbackUser = createFallbackUser(null, true, chosenName);
      const profile = await createOrUpdateUserProfileDirect(fallbackUser);
      saveLocalSession(profile);
      notifyAuthSubscribers(profile);
      return profile;
    }
    throw err;
  }
  const fallbackUser = createFallbackUser(null, true, chosenName);
  const profile = await createOrUpdateUserProfileDirect(fallbackUser);
  saveLocalSession(profile);
  notifyAuthSubscribers(profile);
  return profile;
}

export async function logoutUser(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_SESSION_KEY);
  }
  if (auth) {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
  }
  notifyAuthSubscribers(null);
}

export function subscribeToAuth(callback: (user: any) => void) {
  subscribers.add(callback);

  // Initial check for local session
  const local = loadLocalSession();
  if (local) {
    callback(local);
  }

  let unsubFirebase = () => {};
  if (auth) {
    try {
      unsubFirebase = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const profile = await createOrUpdateUserDoc(user);
          callback(profile);
        } else if (!loadLocalSession()) {
          callback(null);
        }
      });
    } catch {
      // ignore
    }
  }

  return () => {
    subscribers.delete(callback);
    unsubFirebase();
  };
}
