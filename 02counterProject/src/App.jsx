import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
    // let counterValue = 0;
    const [counterValue,setCount] = useState(0)   // in Js we have to use different method to update the value of variable. But in React we have to use useState method to update the value of variable.
    // This is called as State Variable.
    function addValue() {
     if(counterValue >= 30) {
      alert("Value cannot be more than 30");
      return;
     }

     setCount(prevCounter => prevCounter + 1);   // This is the correct way to update the value of state variable.
     setCount(prevCounter => prevCounter + 1);
     setCount(prevCounter => prevCounter + 1);
}


    // Preventing negative values

    function decreaseValue() {
      if(counterValue > 0) {
        setCount(counterValue - 1);
      } else {
        alert("Value cannot be negative");
      }
    }





  return (

    <>
      <h1>Hello World</h1>
      <h2>Counter Value: {counterValue}</h2>

      <button
      onClick={addValue}>Incrase Value</button><br />
      <button
      onClick={decreaseValue}>Decrease Value</button>
    </>
  )
}

export default App
