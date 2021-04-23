import * as React from 'react'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'

function App() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [value] = useDocumentData(firebase.firestore().doc('users/XdcaOF0moHeAyCGJs8g9'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  const username = value?.[user?.uid ?? '']
  console.log(user)
  return (
    <div>
      <h1 className="text-2xl text-center uppercase">Poker planning</h1>

      <div>
        <button className="border border-gray-500">Join a room</button>

        <button className="border border-gray-500">Create a room</button>
      </div>

      <div>
        <p>login</p>
        {username ? username : null}
        <button
          onClick={() =>
            firebase
              .auth()
              .signInAnonymously()
              .then((res) => {
                if (!res.user?.uid) return
                firebase
                  .firestore()
                  .collection('users')
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
