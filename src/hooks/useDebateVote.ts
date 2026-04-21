'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DebateStance } from '@/types';
import { app } from '@/lib/firebase';

interface Counts { bullCount: number; bearCount: number; }

// Module-level cache — populated on first client-side call, never on the server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;

async function getDb() {
  if (!_db) {
    const { getFirestore } = await import('firebase/firestore');
    if (!_db) _db = getFirestore(app);
  }
  return _db;
}

export function useDebateVote(debateId: string) {
  const { user, loading: authLoading } = useAuth();
  const [counts, setCounts] = useState<Counts>({ bullCount: 0, bearCount: 0 });
  const [myVote, setMyVote] = useState<DebateStance | null>(null);
  const [countsLoading, setCountsLoading] = useState(true);
  const [voteLoading, setVoteLoading] = useState(false);
  const loadedForUid = useRef<string | null>(null);

  // Live aggregate counts via real-time subscription
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const db = await getDb();
      if (cancelled) return;
      const { doc, onSnapshot } = await import('firebase/firestore');
      if (cancelled) return;
      unsub = onSnapshot(
        doc(db, 'debates', debateId),
        (snap) => {
          if (snap.exists()) {
            const d = snap.data() as Counts;
            setCounts({ bullCount: d.bullCount ?? 0, bearCount: d.bearCount ?? 0 });
          }
          setCountsLoading(false);
        },
        () => setCountsLoading(false), // surface errors by un-blocking the UI
      );
    })();

    return () => { cancelled = true; unsub?.(); };
  }, [debateId]);

  // Restore user's existing vote once per uid
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setMyVote(null); loadedForUid.current = null; return; }
    if (loadedForUid.current === user.uid) return;

    let cancelled = false;
    setVoteLoading(true);

    (async () => {
      const db = await getDb();
      if (cancelled) return;
      const { doc, getDoc } = await import('firebase/firestore');
      if (cancelled) return;
      const snap = await getDoc(doc(db, 'votes', debateId, 'userVotes', user.uid));
      if (cancelled) return;
      if (snap.exists()) setMyVote((snap.data() as { stance: DebateStance }).stance);
      loadedForUid.current = user.uid;
      setVoteLoading(false);
    })();

    return () => { cancelled = true; };
  }, [user, authLoading, debateId]);

  // Atomic vote transaction with server-side idempotency guard
  const castVote = useCallback(async (stance: DebateStance) => {
    if (!user || myVote !== null) return;

    const db = await getDb();
    const { doc, runTransaction, serverTimestamp } = await import('firebase/firestore');
    const debateRef = doc(db, 'debates', debateId);
    const voteRef = doc(db, 'votes', debateId, 'userVotes', user.uid);

    await runTransaction(db, async (tx) => {
      const [debateSnap, voteSnap] = await Promise.all([tx.get(debateRef), tx.get(voteRef)]);
      if (voteSnap.exists()) return;

      tx.set(voteRef, { stance, timestamp: serverTimestamp(), uid: user.uid });

      if (debateSnap.exists()) {
        const d = debateSnap.data() as Counts;
        tx.update(debateRef, {
          bullCount: (d.bullCount ?? 0) + (stance === 'bull' ? 1 : 0),
          bearCount: (d.bearCount ?? 0) + (stance === 'bear' ? 1 : 0),
        });
      } else {
        tx.set(debateRef, {
          bullCount: stance === 'bull' ? 1 : 0,
          bearCount: stance === 'bear' ? 1 : 0,
        });
      }
    });

    setMyVote(stance);
  }, [user, myVote, debateId]);

  const total = counts.bullCount + counts.bearCount;
  return {
    myVote,
    bullPercent: total === 0 ? 50 : Math.round((counts.bullCount / total) * 100),
    totalVotes: total,
    loading: authLoading || countsLoading || voteLoading,
    castVote,
  };
}
