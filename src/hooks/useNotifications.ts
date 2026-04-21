'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { app } from '@/lib/firebase';

type Permission = 'default' | 'granted' | 'denied';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;
async function getDb() {
  if (!_db) {
    const { getFirestore } = await import('firebase/firestore');
    if (!_db) _db = getFirestore(app);
  }
  return _db;
}

async function saveToken(token: string, uid: string | null) {
  const db = await getDb();
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  await setDoc(
    doc(db, 'pushTokens', token),
    { uid, platform: 'web', updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export function useNotifications() {
  const { user } = useAuth();
  const [permission, setPermission] = useState<Permission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const tokenSaved = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ok =
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window;
    setIsSupported(ok);
    if (ok) setPermission(Notification.permission as Permission);
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported || tokenSaved.current) return;

    const result = await Notification.requestPermission();
    setPermission(result as Permission);
    if (result !== 'granted') return;

    try {
      const swReg = await navigator.serviceWorker.ready;
      const { getMessaging } = await import('firebase/messaging');
      const { getToken } = await import('firebase/messaging');
      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: swReg,
      });
      if (token) {
        await saveToken(token, user?.uid ?? null);
        tokenSaved.current = true;
      }
    } catch (err) {
      console.error('Push token error:', err);
    }
  }, [isSupported, user]);

  return { permission, requestPermission, isSupported };
}
