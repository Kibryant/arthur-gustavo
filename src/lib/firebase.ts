import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { env } from './env'

const firebaseConfig: FirebaseOptions = {
  apiKey: env.GOOGLE_API_KEY,
  authDomain: env.GOOGLE_AUTH_DOMAIN,
  projectId: env.GOOGLE_PROJECT_ID,
  storageBucket: env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: env.GOOGLE_MESSAGING_SENDER_ID,
  appId: env.GOOGLE_APP_ID,
  measurementId: env.GOOGLE_MEASUREMENT_ID,
}

const firebase = initializeApp(firebaseConfig)
export const firebaseStorage = getStorage(firebase)
