import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '@/api/endpoints/auth';
import { getItem, removeItem, setItem, TOKEN_KEY } from '@/lib/storage';
import type { User } from '@/types';

// ─── State context (re-render sensitive) ─────────────────────────────────────

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);

// ─── Actions context (stable refs, no re-renders) ─────────────────────────────

interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthActionsContext = createContext<AuthActions | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const token = await getItem<string>(TOKEN_KEY);
        if (!token) return;
        // TODO: swap for a real /me endpoint call once the BE is ready
        const cached = await getItem<User>('auth_user');
        if (cached) setUser(cached);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { token, user: authedUser } = await apiLogin(email, password);
    await setItem(TOKEN_KEY, token);
    await setItem('auth_user', authedUser);
    setUser(authedUser);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      await removeItem(TOKEN_KEY);
      await removeItem('auth_user');
      setUser(null);
    }
  }, []);

  return (
    <AuthStateContext.Provider value={{ user, isLoading }}>
      <AuthActionsContext.Provider value={{ signIn, signOut }}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAuth() {
  const state = useContext(AuthStateContext);
  const actions = useContext(AuthActionsContext);
  if (!state || !actions) throw new Error('useAuth must be used inside <AuthProvider>');
  return { ...state, ...actions };
}
