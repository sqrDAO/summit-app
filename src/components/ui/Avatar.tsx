'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  photoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: { px: 32, cls: 'w-8 h-8 text-xs' },
  md: { px: 48, cls: 'w-12 h-12 text-sm' },
  lg: { px: 80, cls: 'w-20 h-20 text-lg' },
  xl: { px: 120, cls: 'w-30 h-30 text-2xl' },
};

export default function Avatar({ name, photoUrl, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const { px, cls } = sizeMap[size];

  return (
    <div
      className={clsx(
        cls,
        'relative rounded-full overflow-hidden bg-[#FFB800]/20 flex-shrink-0 flex items-center justify-center',
        className
      )}
    >
      {photoUrl && !imgError ? (
        <Image
          src={photoUrl}
          alt={name}
          width={px}
          height={px}
          className="object-cover object-top w-full h-full"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold text-[#FFB800]">{getInitials(name)}</span>
      )}
    </div>
  );
}
