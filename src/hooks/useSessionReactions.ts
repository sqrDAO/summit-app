'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactionKey } from '@/types';
import { app } from '@/lib/firebase';
import { getClientId } from '@/lib/clientId';

export interface ReactionEvent {
  id: string;
  key: ReactionKey;
  cid: string;
}

type Counts = Partial<Record<ReactionKey, number>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;

async function getDb() {
  if (!_db) {
    const { getFirestore } = await import('firebase/firestore');
    if (!_db) _db = getFirestore(app);
  }
  return _db;
}

export function useSessionReactions(sessionId: string) {
  const [counts, setCounts] = useState<Counts>({});
  const [recentEvents, setRecentEvents] = useState<ReactionEvent[]>([]);
  const [countsLoading, setCountsLoading] = useState(true);
  const mountTimeRef = useRef<Date>(new Date());
  const clientIdRef = useRef<string>('');

  if (!clientIdRef.current && typeof window !== 'undefined') {
    clientIdRef.current = getClientId();
  }

  // Live aggregate counts
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const db = await getDb();
      if (cancelled) return;
      const { doc, onSnapshot } = await import('firebase/firestore');
      if (cancelled) return;
      unsub = onSnapshot(
        doc(db, 'reactions', sessionId),
        (snap) => {
          setCounts(snap.exists() ? (snap.data() as Counts) : {});
          setCountsLoading(false);
        },
        () => setCountsLoading(false),
      );
    })();

    return () => { cancelled = true; unsub?.(); };
  }, [sessionId]);

  // Live event stream — only events newer than mount time
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    const mountTime = mountTimeRef.current;

    (async () => {
      const db = await getDb();
      if (cancelled) return;
      const { collection, onSnapshot, query, where, orderBy, limit, Timestamp } = await import('firebase/firestore');
      if (cancelled) return;
      const q = query(
        collection(db, 'reactions', sessionId, 'events'),
        where('ts', '>', Timestamp.fromDate(mountTime)),
        orderBy('ts', 'asc'),
        limit(50),
      );
      unsub = onSnapshot(q, (snap) => {
        const fresh: ReactionEvent[] = [];
        snap.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data() as { key: ReactionKey; cid?: string };
            fresh.push({ id: change.doc.id, key: data.key, cid: data.cid ?? '' });
          }
        });
        if (fresh.length > 0) {
          setRecentEvents((prev) => [...prev, ...fresh].slice(-100));
        }
      });
    })();

    return () => { cancelled = true; unsub?.(); };
  }, [sessionId]);

  const sendReaction = useCallback(async (key: ReactionKey) => {
    const cid = clientIdRef.current || getClientId();
    const db = await getDb();
    const { doc, collection, serverTimestamp, increment, writeBatch } = await import('firebase/firestore');
    const reactionsRef = doc(db, 'reactions', sessionId);
    const eventRef = doc(collection(db, 'reactions', sessionId, 'events'));

    const batch = writeBatch(db);
    batch.set(reactionsRef, { [key]: increment(1) }, { merge: true });
    batch.set(eventRef, { key, cid, ts: serverTimestamp() });
    await batch.commit();
  }, [sessionId]);

  return {
    counts,
    recentEvents,
    sendReaction,
    clientId: clientIdRef.current,
    loading: countsLoading,
  };
}
