import React from 'react'
import {useState} from 'react'
import {Login} from './components/login.jsx'
import {Home} from './components/home.jsx'


function App() {
  const [username, setUsername] = useState("")

  return (
    username?(
      <Home/>
    ):(
      <Login onSubmit={setUsername} />
    )
  )
  // return (
  //   <Login onSubmit={setUsername}/>
  // )
}

export default App
