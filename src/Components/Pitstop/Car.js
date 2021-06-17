import React, { useState, useEffect, useRef } from "react"
import CarSVG from "./CarSVG"
import useSound from "use-sound"
import wheelgunSFX from "./../../sounds/wheelgun.mp3"

const Intro = ({ onPitTime }) => {
  return (
    <>
      <p>
        <strong>Instructions</strong>
      </p>
      <p>
        <strong>
          You have a maximum of 20 seconds.
          <br />
          Once the timer starts, do the following:
        </strong>
        <br />
        1. Select a new tyre
        <br />
        2. Tap on each tyre on the car to play the mini game to swap it
        <br />
        3. Each tyre needs to be replaced
      </p>
      <p>
        <button onClick={onPitTime}>START TIMER</button>
      </p>
    </>
  )
}

const TyreSelect = ({ tyreSelector, scenario, onTyreSelect }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-x-2 gap-y-3 text-xs mb-3">
        {tyreSelector.map((e, i) => (
          <div key={`tyre-${i}`}>
            <img
              src={e.img}
              alt="tyre"
              className="h-14 mx-auto cursor-pointer"
              onClick={() => onTyreSelect(e.colour, e.name)}
            />
            <strong>{e.name}</strong>
            {e.extra && (
              <>
                <br />
                {e.extra}
              </>
            )}
            <br />
            {e.rated} Laps
          </div>
        ))}
        <div>
          <p>
            <strong>Select New Tyre</strong>
          </p>
          <p>
            <span className="text-yellow-300 font-bold">Lap</span>
            <br />
            {scenario.box} / 78
            <br />
            <span className="text-yellow-300 font-bold">Weather</span>
            <br />
            {scenario.raceweather.map((e, i, a) => {
              const next = typeof a[i + 1] === "object" ? a[i + 1].lap : 78
              return scenario.box >= e.lap && scenario.box < next
                ? e.weather
                : ""
            })}
          </p>
        </div>
      </div>
    </>
  )
}

const ChangeTyre = ({ scenario, onTyreColourChange }) => {
  const [isLights, setIsLights] = useState(false)
  const lights = useRef([0, 0, 0, 0])
  const [wheelgun] = useSound(wheelgunSFX)

  const handleLights = () => {
    let lit = lights.current.reduce((p, c) => p + c) < 8 ? false : true
    while (!lit) {
      let rando = Math.floor(Math.random() * lights.current.length)
      if (lights.current[rando] === 0) {
        lights.current = lights.current.map((e, i) => (i === rando ? 1 : e))
        lit = true
      }
    }
    setIsLights(!isLights)

    if (lights.current.reduce((p, c) => p + c) === 8) {
      onTyreColourChange()
    }
  }

  useEffect(() => {
    handleLights()
  }, [])

  const handleTapLight = index => {
    wheelgun()
    lights.current = lights.current.map((e, i) => (i === index ? e + 1 : e))
    handleLights()
  }
  return (
    <div>
      <p>
        Tap the <span className="text-red-400">red dots</span> as they show up
        to remove the tyre.
      </p>
      <p>
        <img
          src={scenario.startingtire.img}
          className={`h-20 mx-auto duration-700 transition transform ${
            lights.current.reduce((p, c) => p + c) === 3 && "-rotate-90"
          } ${lights.current.reduce((p, c) => p + c) === 5 && "-rotate-180"} ${
            lights.current.reduce((p, c) => p + c) === 7 && "-rotate-270"
          }`}
          alt="tyre"
        />
      </p>
      <div className="grid grid-cols-4">
        {lights.current.map((e, i) => (
          <div className="text-center" key={`light-${i}`}>
            {e === 1 ? (
              <div
                className="h-12 w-12 bg-red-600 mx-auto rounded-full cursor-pointer animate-pulse"
                onClick={() => handleTapLight(i)}
              ></div>
            ) : (
              <div className="h-12 w-12"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const Car = ({
  onPitTime,
  scenario,
  tyreSelector,
  onTyreSwap,
  carMove,
  onSelectedTyre,
}) => {
  const [pop, setPop] = useState(false)
  const [tyreColour, setTyreColour] = useState(false)
  const selectedTyreLocation = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      setPop("intro")
    }, 1500)
  }, [])

  const handleTyreChange = tyre => {
    if (tyreColour) {
      selectedTyreLocation.current = tyre
      setPop("changeTyre")
    }
  }

  const handlePitTime = () => {
    setPop("tyreSelect")
    onPitTime(true)
  }

  const handleTyreSelect = (tyreColour, tyreName) => {
    setTyreColour(tyreColour)
    onSelectedTyre(tyreName)
    setPop(false)
  }

  const handleTyreColourChange = () => {
    onTyreSwap(tyreColour, selectedTyreLocation.current)
    setPop(false)
  }

  return (
    <>
      {pop && (
        <div className="w-11/12 rounded-md p-3 absolute z-30 -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black">
          {pop === "intro" && <Intro onPitTime={handlePitTime} />}
          {pop === "tyreSelect" && (
            <TyreSelect
              tyreSelector={tyreSelector}
              scenario={scenario}
              onTyreSelect={handleTyreSelect}
            />
          )}
          {pop === "changeTyre" && (
            <ChangeTyre
              scenario={scenario}
              onTyreColourChange={handleTyreColourChange}
            />
          )}
        </div>
      )}
      <CarSVG
        carMove={carMove}
        onTyreChange={handleTyreChange}
        scenario={scenario}
      />
    </>
  )
}

export default Car
