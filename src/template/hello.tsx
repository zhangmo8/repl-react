import React from "react"
import { createRoot } from "react-dom/client";

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

createRoot(document.getElementById('root')).render(React.createElement(App));
