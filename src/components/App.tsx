import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

function App() {
  return (
    <Router>
      <div>
        <h1 className="text-2xl text-center uppercase">Poker planning</h1>
        <nav>
          <ul className="flex justify-center gap-12">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path="/">
              <TemporaryAppComponent />
            </Route>
            <Route exact path="/users">
              <h1>HELLO USERS</h1>
            </Route>
            <Route exact path="/about">
              <h1>HELLO ABOUT</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

function TemporaryAppComponent() {
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
  )
}

export default App
