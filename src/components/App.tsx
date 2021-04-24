import * as React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

function App() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const userID = user?.uid ?? ''
  const usersRef = firebase.firestore().collection('users')
  const [collection] = useCollection(usersRef.where('uid', '==', userID))
  const documentID = collection?.docs[0]?.id
  const [document] = useDocument(firebase.firestore().doc(`users/${documentID}`))

  const [username, setUsername] = React.useState('')
  const signOut = () => firebase.auth().signOut()
  const signIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === '') return
    firebase
      .auth()
      .signInAnonymously()
      .then((res) => {
        if (!res.user?.uid) return
        usersRef.add({
          name: username,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: res.user?.uid,
        })
      })
      .then(() => setUsername(''))
  }

  return (
    <div>
      <h1 className="text-2xl text-center uppercase">Poker planning</h1>
      <div>
        {user ? <h1 className="text-xl">{document?.data()?.name}</h1> : null}
        {user ? (
          <button onClick={signOut} className="px-8 py-2 border border-gray-700 rounded-md">
            Log out
          </button>
        ) : (
          <form onSubmit={signIn}>
            <input
              type="text"
              className="px-8 py-2 border border-gray-700 rounded-sm"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
            />
            <button onClick={signIn} className="px-8 py-2 border border-gray-700 rounded-md">
              Log in
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
