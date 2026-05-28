import { useCallback, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { getFirebaseAuthClient } from '../firebase/firebaseClient'

export function useFirebaseAuth() {
  const [{ user, loading, error }, setState] = useState<{
    user: User | null
    loading: boolean
    error: string | null
  }>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const { auth, error: initError } = getFirebaseAuthClient()

    if (!auth) {
      queueMicrotask(() => {
        setState({ user: null, loading: false, error: initError })
      })
      return
    }

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setState({ user: firebaseUser, loading: false, error: null })
    })

    return () => unsub()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, error: null }))
    const { auth, error: initError } = getFirebaseAuthClient()
    if (!auth) {
      setState((s) => ({ ...s, error: initError }))
      return
    }

    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, error: null }))
    const { auth, error: initError } = getFirebaseAuthClient()
    if (!auth) {
      setState((s) => ({ ...s, error: initError }))
      return
    }

    await createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const signOutUser = useCallback(async () => {
    setState((s) => ({ ...s, error: null }))
    const { auth, error: initError } = getFirebaseAuthClient()
    if (!auth) {
      setState((s) => ({ ...s, error: initError }))
      return
    }

    await signOut(auth)
  }, [])

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut: signOutUser,
    clearError: () => setState((s) => ({ ...s, error: null })),
  }
}

