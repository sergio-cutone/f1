import React from "react"
import "./App.css"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Main from "./Components/Main"

function App() {
  return (
    <div className="App max-w-screen-md mx-auto overflow-x-hidden">
      <Header />
      <div className="p-3">
        <Main />
      </div>
      <Footer />
    </div>
  )
}

export default App
