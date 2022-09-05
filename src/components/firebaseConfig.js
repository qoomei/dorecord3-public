import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDm2s-_l2gGgLwce0YqG5OwptGynAv0Wvs',
  authDomain: 'dorecord-public.firebaseapp.com',
  projectId: 'dorecord-public',
  storageBucket: 'dorecord-public.appspot.com',
  messagingSenderId: '799730784391',
  appId: '1:799730784391:web:6842b2b310efac5379c022',
  measurementId: 'G-Y4EF2LTHZH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
