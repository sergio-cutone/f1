import React, { useState, useRef } from "react"

const Results = ({ scenario, onNewGame }) => {
  const [moreData, moreDataState] = useState(false)
  const pitMsg = useRef("You had an excellent Pit-Stop!")
  const correctTyre = scenario.expected === scenario.endtire ? true : false
  const correctLap =
    scenario.pitlap - scenario.box > 5
      ? 0
      : scenario.box - scenario.pitlap > 5
      ? 1
      : 2

  const correctTyreMsg = correctTyre ? scenario.righttyre : scenario.wrongtyre
  const correctLapMsg =
    correctLap === 0
      ? scenario.toosoon
      : correctLap === 1
      ? scenario.toolate
      : scenario.goodpit

  const finalPosition = (pitTime, correctTyre, correctLap) => {
    let position = "1st"
    let score = 100
    score = !correctTyre ? score - 50 : score
    score = !correctLap ? score - 20 : score
    if (parseFloat(pitTime) > 16) {
      score = score - 40
    } else if (parseFloat(pitTime) > 14) {
      score = score - 30
    } else if (parseFloat(pitTime) > 12) {
      score = score - 20
    } else if (parseFloat(pitTime) > 10) {
      score = score - 10
    }

    if (score < 30) {
      position = "12th"
      pitMsg.current = "You got stuck in the Pit-Stop."
    } else if (score < 50) {
      position = "10th"
      pitMsg.current = "You spent way too long in the Pit-Stop."
    } else if (score < 60) {
      position = "8th"
      pitMsg.current = "You spent too long in the Pit-Stop."
    } else if (score < 70) {
      position = "6th"
      pitMsg.current = "You need to be quicker in the Pit-Stop."
    } else if (score < 80) {
      position = "4th"
      pitMsg.current = "You did a fine job in your Pit-Stop."
    } else if (score < 90) {
      position = "2nd"
      pitMsg.current = "You did a great job in your Pit-Stop."
    } else {
      position = "1st"
    }

    return position
  }
  return (
    <div className="text-sm">
      <p className="font-bold text-lg">Race Results</p>
      {!moreData && (
        <>
          <p>
            <strong>Starting Tyre:</strong> {scenario.startingtire.name}
            <br />
            <strong>End Tyre:</strong> {scenario.endtire}
            <br />
            <span className="text-yellow-400 font-bold">
              Ideal End Tyre:
            </span>{" "}
            {scenario.expected}
            <br />
          </p>
          <p>
            <strong>Pit Lap:</strong> {scenario.box}
            <br />
            <span className="text-yellow-400 font-bold">
              Ideal Pit Lap:
            </span>{" "}
            {scenario.pitlap}
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Pit Time:</span>{" "}
            {scenario.pittime}s
            <br />
            <strong>Post Pit Position:</strong> {scenario.position}
            <br />
            <span className="text-yellow-400 font-bold">
              Final Position:
            </span>{" "}
            {finalPosition(scenario.pittime, correctTyre, correctLap)}
          </p>
          <button onClick={() => moreDataState(true)} className="btn-gray">
            FEEDBACK
          </button>{" "}
          <button onClick={() => onNewGame()}>RESTART!</button>{" "}
        </>
      )}
      {moreData && (
        <>
          <p>{correctTyreMsg}</p>
          <p>{correctLapMsg}</p>
          <p>{pitMsg.current}</p>
          <p>
            <span className="text-yellow-400 font-bold">Final Position:</span>{" "}
            {finalPosition(scenario.pittime, correctTyre, correctLap)}
          </p>
          <button onClick={() => moreDataState(false)} className="btn-gray">
            STATS
          </button>{" "}
          <button onClick={() => onNewGame()}>RESTART!</button>
        </>
      )}
    </div>
  )
}

export default Results
