function createElement(reactElement,mainContainer) {
 const domElement = document.createElement(reactElement.type)
 domElement.innerHTML = reactElement.children
 for (const prop in reactElement.props) {
  if (!Object.hasOwn(reactElement.props, prop)) continue;

  domElement.setAttribute(prop, reactElement.props[prop])
 }

 mainContainer.appendChild(domElement)
}




const reactElement = {
  type : "a",
  props: {
    href : "https://www.google.com",
    target: "_blank"
  },
  children: "Click Me"

}

const mainContainer =document.getElementById("root")
createElement(reactElement,mainContainer)

