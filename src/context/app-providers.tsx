import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyA_3pH_mSGLlruZhc935W_usggb7I0otwo',
  authDomain: 'poker-planning-5c616.firebaseapp.com',
  projectId: 'poker-planning-5c616',
  storageBucket: 'poker-planning-5c616.appspot.com',
  messagingSenderId: '251954642401',
  appId: '1:251954642401:web:882cfd8616101926df26a0',
  databaseURL: 'https://poker-planning-5c616-default-rtdb.europe-west1.firebasedatabase.app/',
}

firebase.initializeApp({
  ...config,
})

const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()

const client = new QueryClient()

export default function AppProviders({ children }: any) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
