import { useState } from 'react'

import './App.css'

function App() {
 const [color,setColor] = useState("white")

 const colors = [
   { name: "Red", value: "red", textColor: "text-black" },
   { name: "Green", value: "green", textColor: "text-black" },
   { name: "Blue", value: "blue", textColor: "text-black" },
   { name: "Orange", value: "orange", textColor: "text-black" },
   { name: "Gray", value: "gray", textColor: "text-black" },
   { name: "Yellow", value: "yellow", textColor: "text-black" },
   { name: "Pink", value: "pink", textColor: "text-black" },
   { name: "Purple", value: "purple", textColor: "text-black" },
   { name: "Lavender", value: "lavender", textColor: "text-black" },
   { name: "White", value: "white", textColor: "text-black" },
   { name: "Black", value: "black", textColor: "text-white" }
 ]

  return (
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          {colors.map((colorItem) => (
            <button
              key={colorItem.name}
              onClick={()=> setColor(colorItem.value)}
              className={`outline-none px-4 py-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 font-medium cursor-pointer ${colorItem.textColor}`}
              style={{backgroundColor: colorItem.value}}
            >
              {colorItem.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
