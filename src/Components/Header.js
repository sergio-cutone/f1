import React, { useState } from "react"
import logo from ".././img/logo.png"
import { MenuIcon } from "@heroicons/react/solid"
import { XIcon } from "@heroicons/react/solid"
import { Link } from "@reach/router"

const Header = () => {
  const [menu, menuState] = useState(false)
  const handleMenu = x => {
    menuState(x)
  }
  return (
    <header className="App-header mb-3 p-3 bg-red-f1">
      <Link to="/f1/">
        <img src={logo} alt="Formula 1 Companion App" className="h-16" />
      </Link>
      <div
        className={`${
          !menu ? "absolute" : "fixed"
        } top-3 left-3 z-40 sm:hidden bg-white hover:bg-gray-300 rounded-md text-black p-1 cursor-pointer`}
      >
        {!menu && (
          <MenuIcon onClick={() => handleMenu(true)} className="h-6 w-6" />
        )}
        {menu && (
          <XIcon onClick={() => handleMenu(false)} className="h-6 w-6" />
        )}
      </div>
      <div
        className={`overflow-y-auto w-screen h-screen sm:block sm:h-auto sm:w-auto sm:relative gap-2 text-2xl sm:text-sm py-3 z-30 ${
          menu && "fixed top-0 left-0 bg-white sm:bg-opacity-0"
        } ${!menu && "hidden"}`}
      >
        <Link
          to="/f1/schedule"
          className="w-full p-3 block sm:inline text-red-600 sm:text-white hover:text-black"
          onClick={() => handleMenu(false)}
        >
          Schedule
        </Link>
        <Link
          to="/f1/drivers"
          className="w-full p-3 block sm:inline text-red-600 sm:text-white hover:text-black"
          onClick={() => handleMenu(false)}
        >
          Drivers
        </Link>
        <Link
          to="/f1/standings"
          className="w-full p-3 block sm:inline text-red-600 sm:text-white hover:text-black"
          onClick={() => handleMenu(false)}
        >
          Standings
        </Link>
        <Link
          to="/f1/constructor-standings"
          className="w-full p-3 block sm:inline text-red-600 sm:text-white hover:text-black"
          onClick={() => handleMenu(false)}
        >
          Constructor Standings
        </Link>
        <Link
          to="/f1/pit-stop"
          className="w-full p-3 block sm:inline text-red-600 sm:text-white hover:text-black"
          onClick={() => handleMenu(false)}
        >
          Pit-Stop Challenge
        </Link>
        <Link
          to="/f1/"
          className="sm:hidden w-full p-3 block sm:inline text-red-600 sm:text-white hover:text-black"
          onClick={() => handleMenu(false)}
        >
          Home
        </Link>
      </div>
    </header>
  )
}

export default Header
