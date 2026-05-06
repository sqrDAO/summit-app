'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import TopBar from '@/components/layout/TopBar';
import Badge from '@/components/ui/Badge';
import QuestionForm from './QuestionForm';
import QuestionCard from './QuestionCard';
import { usePanelQA } from '@/hooks/usePanelQA';
import { formatTime } from '@/lib/utils';
import type { Session } from '@/types';

interface PanelQARoomProps {
  session: Session;
}

export default function PanelQARoom({ session }: PanelQARoomProps) {
  const { questions, loading, submit, upvote } = usePanelQA(session.id);

  return (
    <PageWrapper>
      <TopBar title="Audience Q&A" backHref={`/sessions/${session.id}`} />

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="blue">Panel</Badge>
        <Badge variant="gray">{formatTime(session.startTime)} – {formatTime(session.endTime)}</Badge>
        <Badge variant="gold">Anonymous</Badge>
      </div>

      <h1 className="font-[family-name:var(--font-anton)] text-white text-2xl leading-snug uppercase mb-4">
        {session.title}
      </h1>

      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
        Submit a question, query, or challenge for the speakers. Top-upvoted questions appear on the LED screen and get answered first.
      </p>

      <QuestionForm onSubmit={submit} />

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-[family-name:var(--font-anton)] text-white text-lg uppercase">
          Live Questions
        </h2>
        <span className="text-[#A1A1AA] text-xs">
          {loading ? '…' : `${questions.length} so far`}
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-10 text-[#A1A1AA] text-sm border border-dashed border-white/10 rounded">
          No questions yet — be the first to ask.
        </div>
      ) : (
        <div>
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} onUpvote={upvote} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
