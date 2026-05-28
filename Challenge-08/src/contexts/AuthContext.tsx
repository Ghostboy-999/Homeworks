import type { ReactNode } from 'react'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import { AuthContext, type AuthContextValue } from './AuthContextInternal'

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, error, signIn, signUp, signOut, clearError } =
    useFirebaseAuth()

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

