import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/AddTodo'
import SimpleTodo from './components/SimpleTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AddTodo />
    <SimpleTodo />

    </>
  )
}

export default App
