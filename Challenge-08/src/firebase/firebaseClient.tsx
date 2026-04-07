import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

function readFirebaseConfigFromEnv(): FirebaseOptions | null {
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

let cachedAuth: Auth | null = null
let initError: string | null = null

export function getFirebaseAuthClient(): { auth: Auth | null; error: string | null } {
  if (cachedAuth || initError) return { auth: cachedAuth, error: initError }

  const config = readFirebaseConfigFromEnv()
  if (!config) {
    initError =
      'Firebase no está configurado. Copia tus credenciales en el archivo .env.'
    return { auth: null, error: initError }
  }

  const app =
    getApps().length > 0 ? getApps()[0] : initializeApp(config, 'homeworks_firebase')
  cachedAuth = getAuth(app)

  return { auth: cachedAuth, error: null }
}

