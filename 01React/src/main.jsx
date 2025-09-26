import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
// import newFunction from './new.jsx'


// const reactElement = {
//   type : "a",
//   props: {
//     href : "https://www.google.com",
//     target: "_blank"
//   },
//   children: "Click Me"

// }

const anotherElement = (
  <a href="https://www.google.com" target="_blank">Click Me </a>
)

const reactElement = React.createElement(
  "a",
  {href: "https://github.com/Souma061", target: "_blank"},
  "Go to Github"
)

const root = createRoot(document.getElementById('root'));
root.render(

  <App />
    // <NewFunction />

)



