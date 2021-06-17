import React, { useEffect } from "react"
import Track from "./TrackSVG"
import useLapCounter from "./hooks/useLapCounter"

const Race = ({ onPitStop, scenario }) => {
  const { setIsRunning, elapsedTime, setElapsedTime } = useLapCounter()
  useEffect(() => {
    setIsRunning(true)
    setElapsedTime(scenario.start)
  }, [])

  useEffect(() => {
    if (elapsedTime === 65) {
      onPitStop(78)
      setIsRunning(false)
    }
  }, [elapsedTime, setIsRunning, onPitStop])
  return (
    <>
      <div className="w-60 mx-auto relative mb-3">
        <div className="absolute left-0 top-0 text-sm">
          <img
            src={scenario.startingtire.img}
            alt="tyre"
            className="h-14 mx-auto tyre"
          />
          {scenario.name}
        </div>
        <div className="absolute right-0 bottom-2 leading-5">
          <p>
            <strong>Position: </strong> {scenario.position}
            <br />
            <strong>Lap:</strong> {elapsedTime} / 78
            <br />
            <strong>Weather:</strong>{" "}
            {scenario.raceweather.map((e, i, a) => {
              const next = typeof a[i + 1] === "object" ? a[i + 1].lap : 78
              return elapsedTime >= e.lap && elapsedTime < next ? e.weather : ""
            })}
          </p>
          <button className="btn-yellow" onClick={() => onPitStop(elapsedTime)}>
            BOX, BOX!
          </button>
        </div>
        <Track />
      </div>
    </>
  )
}

export default Race
