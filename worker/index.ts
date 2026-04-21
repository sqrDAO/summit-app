/// <reference lib="webworker" />

import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

declare const self: ServiceWorkerGlobalScope;

const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  const { title = 'LFBUIDL 2026', body = '', icon } = payload.notification ?? {};
  self.registration.showNotification(title, {
    body,
    icon: icon ?? '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: payload.data,
  });
});
