'use client';

import DogEarCard from '@/components/ui/DogEarCard';
import clsx from 'clsx';
import type { PanelQuestion } from '@/types';

interface QuestionCardProps {
  question: PanelQuestion;
  onUpvote: (qid: string) => void;
}

export default function QuestionCard({ question, onUpvote }: QuestionCardProps) {
  const { id, text, upvoteCount, hasUpvoted } = question;

  return (
    <DogEarCard className="p-4 mb-3">
      <div className="flex items-start gap-3">
        <p className="flex-1 text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
        <button
          type="button"
          onClick={() => onUpvote(id)}
          disabled={hasUpvoted}
          aria-label={hasUpvoted ? 'Already upvoted' : 'Upvote question'}
          className={clsx(
            'flex-shrink-0 flex flex-col items-center justify-center min-w-[52px] py-1.5 px-2 rounded',
            'border text-xs font-bold transition-all duration-200',
            hasUpvoted
              ? 'bg-[#FFB800]/15 border-[#FFB800]/40 text-[#FFB800] cursor-default'
              : 'bg-white/5 border-white/10 text-white hover:bg-[#FFB800]/10 hover:border-[#FFB800]/30 active:scale-95',
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
          <span className="mt-0.5 tabular-nums">{upvoteCount}</span>
        </button>
      </div>
    </DogEarCard>
  );
}
