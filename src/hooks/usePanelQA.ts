'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { app } from '@/lib/firebase';
import { getDeviceId } from '@/lib/deviceId';
import type { PanelQuestion } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;

async function getDb() {
  if (!_db) {
    const { getFirestore } = await import('firebase/firestore');
    if (!_db) _db = getFirestore(app);
  }
  return _db;
}

interface UsePanelQAResult {
  questions: PanelQuestion[];
  loading: boolean;
  submit: (text: string) => Promise<void>;
  upvote: (qid: string) => Promise<void>;
  deviceId: string;
}

export function usePanelQA(sessionId: string): UsePanelQAResult {
  const [questions, setQuestions] = useState<PanelQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [upvotedSet, setUpvotedSet] = useState<Set<string>>(new Set());
  const deviceIdRef = useRef<string>('');

  if (!deviceIdRef.current) deviceIdRef.current = getDeviceId();
  const deviceId = deviceIdRef.current;

  // Live questions stream, sorted client-side by upvotes desc, then createdAt desc.
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const db = await getDb();
      if (cancelled) return;
      const { collection, onSnapshot, query, orderBy } = await import('firebase/firestore');
      if (cancelled) return;

      const q = query(
        collection(db, 'panelQA', sessionId, 'questions'),
        orderBy('createdAt', 'desc'),
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          const next: PanelQuestion[] = snap.docs.map((d) => {
            const data = d.data() as { text: string; createdAt?: { toMillis?: () => number }; upvoteCount?: number };
            const millis = typeof data.createdAt?.toMillis === 'function' ? data.createdAt.toMillis() : 0;
            return {
              id: d.id,
              text: data.text,
              createdAt: millis,
              upvoteCount: data.upvoteCount ?? 0,
              hasUpvoted: false,
            };
          });
          next.sort((a, b) => (b.upvoteCount - a.upvoteCount) || (b.createdAt - a.createdAt));
          setQuestions(next);
          setLoading(false);
        },
        () => setLoading(false),
      );
    })();

    return () => { cancelled = true; unsub?.(); };
  }, [sessionId]);

  // On first load, fetch the set of question IDs this device has upvoted.
  // Cheap because we only check upvoters/{deviceId} for currently visible questions.
  useEffect(() => {
    if (loading || questions.length === 0) return;
    let cancelled = false;

    (async () => {
      const db = await getDb();
      if (cancelled) return;
      const { doc, getDoc } = await import('firebase/firestore');
      if (cancelled) return;

      const checks = await Promise.all(
        questions
          .filter((q) => !upvotedSet.has(q.id))
          .map(async (q) => {
            const ref = doc(db, 'panelQA', sessionId, 'questions', q.id, 'upvoters', deviceId);
            const snap = await getDoc(ref);
            return snap.exists() ? q.id : null;
          }),
      );
      if (cancelled) return;
      const found = checks.filter((x): x is string => x !== null);
      if (found.length > 0) {
        setUpvotedSet((prev) => {
          const next = new Set(prev);
          for (const id of found) next.add(id);
          return next;
        });
      }
    })();

    return () => { cancelled = true; };
    // We intentionally check only against the current questions snapshot, not on every set change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, deviceId, loading, questions.length]);

  const submit = useCallback(async (rawText: string) => {
    const text = rawText.trim();
    if (!text || text.length > 280) return;

    const db = await getDb();
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    await addDoc(collection(db, 'panelQA', sessionId, 'questions'), {
      text,
      authorUid: deviceId,
      upvoteCount: 0,
      createdAt: serverTimestamp(),
    });
  }, [sessionId, deviceId]);

  const upvote = useCallback(async (qid: string) => {
    if (upvotedSet.has(qid)) return;
    // Optimistic UI: lock immediately to prevent double-tap.
    setUpvotedSet((prev) => new Set(prev).add(qid));

    const db = await getDb();
    const { doc, runTransaction, serverTimestamp } = await import('firebase/firestore');
    const questionRef = doc(db, 'panelQA', sessionId, 'questions', qid);
    const upvoterRef = doc(db, 'panelQA', sessionId, 'questions', qid, 'upvoters', deviceId);

    try {
      await runTransaction(db, async (tx) => {
        const [qSnap, upSnap] = await Promise.all([tx.get(questionRef), tx.get(upvoterRef)]);
        if (!qSnap.exists() || upSnap.exists()) return;
        tx.set(upvoterRef, { createdAt: serverTimestamp() });
        tx.update(questionRef, { upvoteCount: (qSnap.data().upvoteCount ?? 0) + 1 });
      });
    } catch {
      // Roll back optimistic lock so the user can retry.
      setUpvotedSet((prev) => {
        const next = new Set(prev);
        next.delete(qid);
        return next;
      });
    }
  }, [sessionId, deviceId, upvotedSet]);

  // Decorate questions with hasUpvoted before returning.
  const decorated = questions.map((q) => ({ ...q, hasUpvoted: upvotedSet.has(q.id) }));

  return { questions: decorated, loading, submit, upvote, deviceId };
}
