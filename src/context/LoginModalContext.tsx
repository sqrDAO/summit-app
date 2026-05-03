'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { ReactionKey } from '@/types';

export type PendingAction = { type: 'reaction'; sessionId: string; key: ReactionKey };

interface LoginModalContextValue {
  isOpen: boolean;
  pendingAction: PendingAction | null;
  openLoginModal: (action?: PendingAction) => void;
  closeLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextValue>({
  isOpen: false,
  pendingAction: null,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const openLoginModal = useCallback((action?: PendingAction) => {
    setPendingAction(action ?? null);
    setIsOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  return (
    <LoginModalContext.Provider value={{ isOpen, pendingAction, openLoginModal, closeLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  return useContext(LoginModalContext);
}
