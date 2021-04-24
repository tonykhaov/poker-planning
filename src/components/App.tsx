import * as React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

function App() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [value, ...coll] = useCollection(firebase.firestore().collection('usernames'))

  return (
    <div>
      <h1 className="text-2xl text-center uppercase">Poker planning</h1>

      <div>
        <button className="border border-gray-500">Join a room</button>

        <button className="border border-gray-500">Create a room</button>
      </div>

      <div>
        <p>login</p>
        <button
          onClick={() =>
            firebase
              .auth()
              .signInAnonymously()
              .then((res) => {
                if (!res.user?.uid) return
                firebase
                  .firestore()
                  .collection('usernames')
                  .add({
                    [res.user.uid]: 'luc',
                  })
              })
          }
        >
          Log in
        </button>
        <button onClick={() => firebase.auth().signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default App
