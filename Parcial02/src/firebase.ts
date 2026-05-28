import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

function readConfig(): FirebaseOptions | null {
  const env = import.meta.env

  const apiKey = env.VITE_FIREBASE_API_KEY
  const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN
  const projectId = env.VITE_FIREBASE_PROJECT_ID
  const storageBucket = env.VITE_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID
  const appId = env.VITE_FIREBASE_APP_ID

  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !storageBucket ||
    !messagingSenderId ||
    !appId
  ) {
    return null
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }
}

let cachedApp: FirebaseApp | null = null
let cachedAuth: Auth | null = null
let cachedDb: Firestore | null = null

export function getFirebaseServices() {
  if (cachedApp && cachedAuth && cachedDb) {
    return {
      app: cachedApp,
      auth: cachedAuth,
      db: cachedDb,
      enabled: true as const,
    }
  }

  const config = readConfig()
  if (!config) {
    return {
      app: null,
      auth: null,
      db: null,
      enabled: false as const,
    }
  }

  cachedApp = getApps().length > 0 ? getApps()[0] : initializeApp(config, 'parcial02')
  cachedAuth = getAuth(cachedApp)
  cachedDb = getFirestore(cachedApp)

  return {
    app: cachedApp,
    auth: cachedAuth,
    db: cachedDb,
    enabled: true as const,
  }
}
