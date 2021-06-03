import React from "react"

const GameIntro = ({ screenState }) => {
  return (
    <>
      <p className="text-xl font-bold">Pit-Stop Challenge</p>
      <p>Welcome to Monaco!</p>
      <p>
        Decide the correct lap to pit your car, which tyres to swap in and
        quickly get your car back on track to victory!
      </p>
      <p>
        Be sure to read the Tyre Specs to understand how many laps each tyre is
        ideally rated for.
      </p>
      <button onClick={() => screenState("scenario")}>NEXT</button>
    </>
  )
}

export default GameIntro
