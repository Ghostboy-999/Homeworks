import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getFirebaseServices } from '../firebase'
import type { AppUser } from '../types'

type AuthContextValue = {
  user: AppUser | null
  error: string | null
  usingFirebase: boolean
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

type StoredAccount = {
  uid: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USERS_KEY = 'parcial02-users'
const SESSION_KEY = 'parcial02-session'

function readAccounts(): StoredAccount[] {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as StoredAccount[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(accounts))
}

function readSession(): AppUser | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AppUser
  } catch {
    return null
  }
}

function writeSession(user: AppUser | null) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY)
    return
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const services = useMemo(() => getFirebaseServices(), [])

  useEffect(() => {
    if (!services.enabled || !services.auth) {
      setUser(readSession())
      return
    }

    const unsubscribe = onAuthStateChanged(services.auth, (firebaseUser) => {
      if (!firebaseUser?.email) {
        setUser(null)
        return
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        provider: 'firebase',
      })
    })

    return () => unsubscribe()
  }, [services])

  async function register(email: string, password: string) {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanEmail || !cleanPassword) {
      const nextError = 'Debes completar correo y contrasena.'
      setError(nextError)
      throw new Error(nextError)
    }

    if (services.enabled && services.auth) {
      await createUserWithEmailAndPassword(services.auth, cleanEmail, cleanPassword)
      setError(null)
      return
    }

    const accounts = readAccounts()
    if (accounts.some((account) => account.email === cleanEmail)) {
      const nextError = 'Ese correo ya se encuentra registrado.'
      setError(nextError)
      throw new Error(nextError)
    }

    const account: StoredAccount = {
      uid: createId(),
      email: cleanEmail,
      password: cleanPassword,
    }

    writeAccounts([...accounts, account])

    const nextUser: AppUser = {
      uid: account.uid,
      email: account.email,
      provider: 'mock',
    }

    writeSession(nextUser)
    setUser(nextUser)
    setError(null)
  }

  async function login(email: string, password: string) {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (services.enabled && services.auth) {
      await signInWithEmailAndPassword(services.auth, cleanEmail, cleanPassword)
      setError(null)
      return
    }

    const account = readAccounts().find(
      (current) => current.email === cleanEmail && current.password === cleanPassword
    )

    if (!account) {
      const nextError = 'Credenciales invalidas.'
      setError(nextError)
      throw new Error(nextError)
    }

    const nextUser: AppUser = {
      uid: account.uid,
      email: account.email,
      provider: 'mock',
    }

    writeSession(nextUser)
    setUser(nextUser)
    setError(null)
  }

  async function logout() {
    if (services.enabled && services.auth) {
      await signOut(services.auth)
      setUser(null)
      setError(null)
      return
    }

    writeSession(null)
    setUser(null)
    setError(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      error,
      usingFirebase: services.enabled,
      register,
      login,
      logout,
      clearError: () => setError(null),
    }),
    [error, services.enabled, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return context
}
