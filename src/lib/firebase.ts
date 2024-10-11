import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCosCxZ4y_wv0NdFhEaY8JPA1L_OXMaqFk',
  authDomain: 'arthur-gustavo.firebaseapp.com',
  projectId: 'arthur-gustavo',
  storageBucket: 'arthur-gustavo.appspot.com',
  messagingSenderId: '970845978584',
  appId: '1:970845978584:web:9db7c7d1b716ac8fc33cad',
  measurementId: 'G-L3QCCVW4J5',
}

const firebase = initializeApp(firebaseConfig)
export const firebaseStorage = getStorage(firebase)
