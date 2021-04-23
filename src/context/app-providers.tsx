import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { FirebaseAuthProvider } from '@react-firebase/auth'
import { FirestoreProvider } from '@react-firebase/firestore'

const client = new QueryClient()

export const config = {
  apiKey: 'AIzaSyA_3pH_mSGLlruZhc935W_usggb7I0otwo',
  authDomain: 'poker-planning-5c616.firebaseapp.com',
  projectId: 'poker-planning-5c616',
  storageBucket: 'poker-planning-5c616.appspot.com',
  messagingSenderId: '251954642401',
  appId: '1:251954642401:web:882cfd8616101926df26a0',
  databaseURL: 'https://poker-planning-5c616-default-rtdb.europe-west1.firebasedatabase.app/',
}

export default function AppProviders({ children }: any) {
  return (
    <FirestoreProvider firebase={firebase} {...config}>
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </FirebaseDatabaseProvider>
      </FirebaseAuthProvider>
    </FirestoreProvider>
  )
}
