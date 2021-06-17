import React, { useState, useRef, useEffect, useCallback } from "react"

const Results = ({ scenario, onNewGame, setTopPitStops }) => {
  const [moreData, setMoreData] = useState(false)
  const pitMsg = useRef("You had an excellent Pit-Stop!")
  const correctTyre = scenario.expected === scenario.endtire ? true : false

  const fetchSave = useCallback(
    async (
      starting_tyre,
      selected_tyre,
      ideal_end_tyre,
      pit_lap,
      ideal_pit_lap,
      pit_time,
      post_pit_position,
      final_position
    ) => {
      await fetch(
        `https://demos.sergiocutone.com/api/f1companion?starting_tyre=${starting_tyre}&selected_tyre=${selected_tyre}&ideal_end_tyre=${ideal_end_tyre}&pit_lap=${pit_lap}&ideal_pit_lap=${ideal_pit_lap}&pit_time=${pit_time}&post_pit_position=${post_pit_position}&final_position=${final_position}`
      )
        .then(response => {
          return response.json()
        })
        .then(function (data) {
          setTopPitStops(data)
        })
    },
    []
  )

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
    let position = 1
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
      position = 12
      pitMsg.current = "You got stuck in the Pit-Stop."
    } else if (score < 50) {
      position = 10
      pitMsg.current = "You spent way too long in the Pit-Stop."
    } else if (score < 60) {
      position = 8
      pitMsg.current = "You spent too long in the Pit-Stop."
    } else if (score < 70) {
      position = 6
      pitMsg.current = "You need to be quicker in the Pit-Stop."
    } else if (score < 80) {
      position = 4
      pitMsg.current = "You did a fine job in your Pit-Stop."
    } else if (score < 90) {
      position = 2
      pitMsg.current = "You did a great job in your Pit-Stop."
    } else {
      position = 1
    }

    return position
  }

  useEffect(() => {
    fetchSave(
      scenario.endtire,
      scenario.startingtire.name,
      scenario.expected,
      scenario.box,
      scenario.pitlap,
      scenario.pittime,
      scenario.position,
      finalPosition(scenario.pittime, correctTyre, correctLap)
    )
  }, [])
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
          <button onClick={() => setMoreData(true)} className="btn-gray">
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
          <button onClick={() => setMoreData(false)} className="btn-gray">
            STATS
          </button>{" "}
          <button onClick={() => onNewGame()}>RESTART!</button>
        </>
      )}
    </div>
  )
}

export default Results
