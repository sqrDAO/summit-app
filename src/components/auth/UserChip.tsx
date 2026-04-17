'use client';

import { useAuth } from '@/context/AuthContext';
import { signOutUser } from '@/lib/firebaseAuth';
import Avatar from '@/components/ui/Avatar';

export default function UserChip() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <div className="flex items-center justify-between bg-[#0D0D10] border border-white/10 rounded-full pl-1 pr-3 py-1 mb-4">
      <div className="flex items-center gap-2">
        <Avatar
          name={user.displayName ?? user.email ?? '?'}
          photoUrl={user.photoURL ?? undefined}
          size="sm"
        />
        <span className="text-white text-sm font-medium truncate max-w-[160px]">
          {user.displayName ?? user.email}
        </span>
      </div>
      <button
        onClick={() => signOutUser()}
        className="text-[#A1A1AA] text-xs hover:text-white transition-colors ml-3 flex-shrink-0"
      >
        Sign out
      </button>
    </div>
  );
}
