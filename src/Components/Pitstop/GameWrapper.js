import React from "react"
import { XIcon } from "@heroicons/react/solid"

const GameWrapper = ({ children, handleGameExit }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-gray-600 overflow-hidden text-white">
      <XIcon
        className="fixed z-50 top-3 left-3 h-8 text-white bg-red-600 rounded-md cursor-pointer"
        onClick={() => handleGameExit(false)}
      />
      <div className="relative max-w-screen-sm mx-auto h-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-11/12">
          {children}
        </div>
      </div>
    </div>
  )
}
export default GameWrapper
