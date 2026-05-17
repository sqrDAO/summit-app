'use client';

import { useEffect, useState } from 'react';

const DISMISSED_KEY = 'pwa-install-dismissed-v1';

type Platform = 'ios' | 'android' | null;

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return null;
}

function isInStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as { standalone?: boolean }).standalone === true)
  );
}

export default function InstallPrompt() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> } | null>(null);
  const [visible, setVisible] = useState(false);
  const [showIOSSteps, setShowIOSSteps] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const plat = detectPlatform();
    if (!plat) return;
    setPlatform(plat);

    if (plat === 'android') {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> });
        setTimeout(() => setVisible(true), 3000);
      };
      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }

    if (plat === 'ios') {
      setTimeout(() => setVisible(true), 3000);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
    setShowIOSSteps(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') dismiss();
    else setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="max-w-lg w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-4 duration-300">
        {!showIOSSteps ? (
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-0.5 shrink-0">📲</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">Add to Home Screen</p>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                Install the summit app for quick access during the event.
              </p>
              <div className="flex gap-2 mt-3">
                {platform === 'android' && deferredPrompt && (
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-yellow-400 text-black text-sm font-bold py-2 rounded-lg active:scale-95 transition-transform"
                  >
                    Install
                  </button>
                )}
                {platform === 'ios' && (
                  <button
                    onClick={() => setShowIOSSteps(true)}
                    className="flex-1 bg-yellow-400 text-black text-sm font-bold py-2 rounded-lg active:scale-95 transition-transform"
                  >
                    How to install
                  </button>
                )}
                <button
                  onClick={dismiss}
                  className="flex-1 bg-zinc-800 text-zinc-300 text-sm font-medium py-2 rounded-lg active:scale-95 transition-transform"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-white">Install on iPhone</p>
              <button onClick={dismiss} className="text-zinc-500 text-xs">✕ Close</button>
            </div>
            <ol className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">1</span>
                Tap the <span className="inline-flex items-center gap-0.5 bg-zinc-800 px-1.5 py-0.5 rounded font-medium text-white">Share <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg></span> button at the bottom of Safari
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">2</span>
                Scroll down and tap <span className="bg-zinc-800 px-1.5 py-0.5 rounded font-medium text-white">Add to Home Screen</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">3</span>
                Tap <span className="bg-zinc-800 px-1.5 py-0.5 rounded font-medium text-white">Add</span> to confirm
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
