'use client';

import { useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

const DISMISSED_KEY = 'notif-prompt-v1';

export default function NotificationPrompt() {
  const { permission, requestPermission, isSupported } = useNotifications();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isSupported || permission !== 'default') return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, [isSupported, permission]);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  const handleEnable = async () => {
    setVisible(false);
    await requestPermission();
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="max-w-lg w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5 shrink-0">🔔</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">Stay in the loop</p>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
              Get notified about schedule changes and summit announcements.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleEnable}
                className="flex-1 bg-yellow-400 text-black text-sm font-bold py-2 rounded-lg active:scale-95 transition-transform"
              >
                Enable
              </button>
              <button
                onClick={dismiss}
                className="flex-1 bg-zinc-800 text-zinc-300 text-sm font-medium py-2 rounded-lg active:scale-95 transition-transform"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
