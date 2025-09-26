import { useState } from 'react'
import NewFunction from './New.jsx'

// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const userName = "Soumabrata"

  return (
    <>
    <NewFunction />
    <h1>Hello World! {userName}</h1>
    </>

  )
}

export default App
