import Link from 'next/link';
import DogEarCard from '@/components/ui/DogEarCard';
import Avatar from '@/components/ui/Avatar';
import { Speaker } from '@/types';

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Link href={`/speakers/${speaker.id}`}>
      <DogEarCard className="p-4 h-full hover:-translate-y-1 transition-transform duration-200">
        <div className="flex flex-col items-center text-center gap-2">
          <Avatar name={speaker.name} photoUrl={speaker.photoUrl} size="lg" />
          <div>
            <p className="text-white font-semibold text-sm leading-snug">{speaker.name}</p>
            <p className="text-[#A1A1AA] text-xs mt-0.5">{speaker.title}</p>
            <p className="text-[#FFB800] text-xs font-medium mt-0.5">{speaker.company}</p>
          </div>
        </div>
      </DogEarCard>
    </Link>
  );
}
