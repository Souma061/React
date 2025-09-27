import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    age: 20,
    city: "Kolkata"
  }

  let num=[1,2,3,4,5]

  return (
    <>
    <h1 className='bg-green-500 text-black p-5 m-2 rounded-3xl'>Tailwind Test</h1>
    <Card name="Souma" info={myObj} numbers={num} />
    <Card name="John" />
    </>
  )
}



export default App
