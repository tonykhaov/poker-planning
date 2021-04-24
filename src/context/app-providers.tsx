import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()

const client = new QueryClient()

export default function AppProviders({ children }: any) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
