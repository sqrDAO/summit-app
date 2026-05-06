'use client';

import { useState, useEffect } from 'react';
import GoldButton from '@/components/ui/GoldButton';
import clsx from 'clsx';

const MAX_LEN = 280;
const COOLDOWN_MS = 30_000;

interface QuestionFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (cooldownUntil <= now) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [cooldownUntil, now]);

  const remaining = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const trimmed = text.trim();
  const tooLong = trimmed.length > MAX_LEN;
  const disabled = submitting || trimmed.length === 0 || tooLong || remaining > 0;

  async function handleSubmit() {
    if (disabled) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setText('');
      setCooldownUntil(Date.now() + COOLDOWN_MS);
      setNow(Date.now());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mb-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask anything — your name won't be shown."
        rows={3}
        maxLength={MAX_LEN + 20}
        className={clsx(
          'w-full bg-[#0D0D10] border rounded p-3 text-white text-sm placeholder:text-[#A1A1AA]',
          'focus:outline-none focus:border-[#FFB800]/60 transition-colors resize-none',
          tooLong ? 'border-red-500/50' : 'border-white/10',
        )}
      />
      <div className="flex items-center justify-between mt-2">
        <span className={clsx('text-xs', tooLong ? 'text-red-400' : 'text-[#A1A1AA]')}>
          {trimmed.length} / {MAX_LEN}
        </span>
        <GoldButton onClick={handleSubmit} disabled={disabled}>
          {submitting
            ? 'Sending…'
            : remaining > 0
            ? `Wait ${remaining}s`
            : 'Submit anonymously'}
        </GoldButton>
      </div>
    </div>
  );
}
