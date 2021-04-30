import * as React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

function App() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const userID = user?.uid ?? ''
  const usersRef = firebase.firestore().collection('users')
  const [collection] = useCollection(usersRef.where('uid', '==', userID))
  const documentID = collection?.docs[0]?.id
  const [document] = useDocument(firebase.firestore().doc(`users/${documentID}`))

  const signOut = () => firebase.auth().signOut()
  const signIn = async (e: React.FormEvent<UsernameFormElement>) => {
    e.preventDefault()
    const { username: usernameInput } = e.currentTarget.elements
    const username = usernameInput.value

    if (username === '') return

    const res = await firebase.auth().signInAnonymously()
    if (!res.user?.uid) return

    usersRef.add({
      name: username,
      uid: res.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return (
    <div>
      <h1 className="text-2xl text-center uppercase">Poker planning</h1>
      <div>
        {user ? (
          <>
            <h1 className="text-xl">{document?.data()?.name}</h1>
            <button onClick={signOut} className="px-8 py-2 border border-gray-700 rounded-md">
              Log out
            </button>
          </>
        ) : (
          <form onSubmit={signIn}>
            <input
              type="text"
              name="username"
              className="px-8 py-2 border border-gray-700 rounded-sm"
              placeholder="Enter your username"
              required
            />
            <button className="px-8 py-2 border border-gray-700 rounded-md">Log in</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
