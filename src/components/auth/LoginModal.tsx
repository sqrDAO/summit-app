'use client';

import { useState, useEffect } from 'react';
import { AuthError } from 'firebase/auth';
import { useLoginModal } from '@/context/LoginModalContext';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, getAuthErrorMessage } from '@/lib/firebaseAuth';
import clsx from 'clsx';

type Mode = 'signin' | 'signup';

export default function LoginModal() {
  const { isOpen, pendingAction, closeLoginModal } = useLoginModal();

  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode('signin');
      setName('');
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      closeLoginModal();
    } catch (e) {
      const msg = getAuthErrorMessage(e as AuthError);
      if (msg) setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
      } else {
        if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
        await signUpWithEmail(name.trim(), email, password);
      }
      closeLoginModal();
    } catch (e) {
      setError(getAuthErrorMessage(e as AuthError));
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={closeLoginModal}
      />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto">
        <div className="bg-[#0D0D10] border-t border-white/10 rounded-t-2xl px-5 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
          {/* Handle bar */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-white text-xl uppercase">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-[#A1A1AA] text-sm mt-1">
                {pendingAction?.type === 'reaction'
                  ? 'Sign in to react'
                  : 'Sign in to continue'}
              </p>
            </div>
            <button
              onClick={closeLoginModal}
              className="text-[#A1A1AA] hover:text-white p-1 transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Luma ticket hint */}
          <div className="flex items-start gap-2.5 bg-[#FFB800]/8 border border-[#FFB800]/20 rounded-lg px-3 py-2.5 mb-4">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[#FFB800]/90 text-xs leading-relaxed">
              Use the same email as your Luma account to link your Summit ticket.
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 mb-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[#A1A1AA] text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-[#A1A1AA] text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFB800]/40"
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-[#A1A1AA] text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFB800]/40"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-[#A1A1AA] text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFB800]/40"
            />

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FFB800] text-black font-bold text-sm rounded-lg hover:bg-[#ffc929] transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-[#A1A1AA] text-xs mt-4">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
              className="text-[#FFB800] font-semibold hover:underline"
            >
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
