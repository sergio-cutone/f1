import React from "react"

const Scenario = ({ onStartRace, onTyreSpecs, scenario }) => {
  return (
    <>
      <p>
        <strong>Starting Lap:</strong> {scenario.start} / 78
        <br />
        <strong>PitStops:</strong> 1 Stop
        <br />
        <strong>Forecast:</strong> {scenario.weather}
        <br />
        <strong>Starting Tyres:</strong> {scenario.name}
        <img
          src={scenario.startingtire.img}
          alt="tyre"
          className="h-20 mx-auto mt-2"
        />
      </p>
      <button onClick={() => onTyreSpecs()} className="btn-gray">
        SPECS
      </button>{" "}
      <button onClick={() => onStartRace()}>RACE!</button>
    </>
  )
}
export default Scenario
