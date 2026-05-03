'use client';

import { useEffect, useState } from 'react';
import QRPoster from './QRPoster';
import { usePanelQA } from '@/hooks/usePanelQA';
import type { Session } from '@/types';
import clsx from 'clsx';

const TOP_N = 10;

interface PanelQADisplayProps {
  session: Session;
}

export default function PanelQADisplay({ session }: PanelQADisplayProps) {
  const { questions, loading } = usePanelQA(session.id);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setQrUrl(`${window.location.origin}/sessions/${session.id}/qa`);
    }
  }, [session.id]);

  const top = questions.slice(0, TOP_N);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="flex items-start justify-between gap-8 px-10 pt-10 pb-6 border-b border-[#FFB800]/20">
        <div className="flex-1 min-w-0">
          <p className="text-[#FFB800] text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Audience Q&amp;A · Live
          </p>
          <h1 className="font-[family-name:var(--font-anton)] uppercase leading-tight text-4xl md:text-5xl xl:text-6xl">
            {session.title}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          {qrUrl && <QRPoster url={qrUrl} size={180} />}
          <p className="text-[#FFB800] font-bold text-sm tracking-wider uppercase">
            Scan to ask
          </p>
        </div>
      </header>

      {/* Questions */}
      <main className="flex-1 px-10 py-8 overflow-hidden">
        {loading ? (
          <p className="text-[#A1A1AA] text-2xl">Loading…</p>
        ) : top.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="font-[family-name:var(--font-anton)] uppercase text-[#FFB800] text-6xl mb-6">
              Be the first to ask
            </p>
            <p className="text-[#A1A1AA] text-2xl">
              Scan the QR code to submit a question.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {top.map((q, idx) => (
              <li
                key={q.id}
                className={clsx(
                  'flex items-start gap-6 transition-all duration-500',
                  idx === 0
                    ? 'bg-[#FFB800]/10 border-l-4 border-[#FFB800] pl-5 pr-5 py-4 rounded-sm'
                    : 'pl-6 pr-5 py-3 border-l-2 border-white/10',
                )}
              >
                <span
                  className={clsx(
                    'font-[family-name:var(--font-anton)] tabular-nums leading-none flex-shrink-0',
                    idx === 0 ? 'text-[#FFB800] text-7xl' : 'text-white/40 text-4xl',
                  )}
                >
                  {q.upvoteCount}
                </span>
                <p
                  className={clsx(
                    'leading-snug',
                    idx === 0
                      ? 'text-white text-3xl md:text-4xl xl:text-5xl font-medium'
                      : 'text-white/85 text-2xl md:text-3xl',
                  )}
                >
                  {q.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="px-10 py-4 border-t border-[#FFB800]/20 flex items-center justify-between text-sm text-[#A1A1AA]">
        <span>{questions.length} question{questions.length === 1 ? '' : 's'} submitted</span>
        <span className="font-[family-name:var(--font-anton)] uppercase tracking-widest text-[#FFB800]">
          Web3 Builders&apos; Summit · LFBUIDL 2026
        </span>
      </footer>
    </div>
  );
}
