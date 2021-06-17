import React, { useState, useEffect, useReducer } from "react"
import Car from "./Pitstop/Car"
import GameIntro from "./Pitstop/GameIntro"
import Scenario from "./Pitstop/Scenario"
import Race from "./Pitstop/Race"
import TyreSpecs from "./Pitstop/TyreSpecs"
import scenarioList from "./Pitstop/helpers/scenarios"
import tyreSelector from "./Pitstop/helpers/tyreSelector"
import TopPitsScreen from "./Pitstop/TopPitScreen"
import useTimer from "./Pitstop/hooks/useTimer"
import useSound from "use-sound"
import themesongSFX from ".././sounds/themesong.mp3"
import boxSFX from ".././sounds/boxboxbox.mp3"
import postpitSFX from ".././sounds/postpit.mp3"
import lightsoutSFX from ".././sounds/lightsout.mp3"
import idleengineSFX from ".././sounds/idleengine.mp3"
import GameWrapper from "./Pitstop/GameWrapper"
import tyreReducer, {
  INITIAL_SETUP,
  PIT_STOP,
  TYRE_SWAP,
  SELECTED_TYRE,
} from "./Pitstop/reducers/tyre"
import Results from "./Pitstop/Results"

const PitStop = () => {
  const [scenario, dispatchCarTyres] = useReducer(tyreReducer, [])
  const [isGame, setIsGame] = useState(false)
  const [screen, setScreen] = useState("intro")
  const [carMove, setCarMove] = useState(0)
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer()
  const [topPitStops, setTopPitStops] = useState(false)
  const [isTopPitStops, setIsTopPitStops] = useState(false)
  const [themesong] = useSound(themesongSFX)
  const [box] = useSound(boxSFX)
  const [postpit] = useSound(postpitSFX)
  const [lightsout] = useSound(lightsoutSFX)
  const [idleengine, { stop }] = useSound(idleengineSFX)

  const handleNewGame = () => {
    themesong()
    setIsGame(false)
    setScreen("intro")
    setCarMove(0)
    setIsRunning(false)
    setIsGame(true)
    setScenario()
    setTopPitStops(false)
    setIsTopPitStops(false)
  }

  const setScenario = () => {
    const rando = Math.floor(Math.random() * scenarioList.length)
    dispatchCarTyres({
      type: INITIAL_SETUP,
      payload: scenarioList[rando],
      img: tyreSelector(scenarioList[rando].name).img,
      startingtire: tyreSelector(scenarioList[rando].name),
    })
  }

  useEffect(() => {
    setScenario()
    return () => {
      setIsRunning(false)
      stop()
    }
  }, [setIsRunning, stop])

  useEffect(() => {
    if (isRunning) {
      let swapTyreCount = 0
      scenario.tyredata.map(
        e => (swapTyreCount = e.swap ? swapTyreCount + 1 : swapTyreCount)
      )
      if (parseInt(elapsedTime) >= 16) {
        scenario.position = 6
      } else if (parseInt(elapsedTime) >= 14) {
        scenario.position = 5
      } else if (parseInt(elapsedTime) >= 12) {
        scenario.position = 4
      } else if (parseInt(elapsedTime) >= 10) {
        scenario.position = 3
      } else if (parseInt(elapsedTime) >= 5) {
        scenario.position = 2
      }
      if (elapsedTime >= 20) {
        stop()
        setIsRunning(false)
        scenario.pittime = 20
        setElapsedTime(0)
        themesong()
        setScreen("raceresults")
      }
      if (swapTyreCount === 4) {
        stop()
        postpit()
        setCarMove(2)
        scenario.pittime = elapsedTime
        setIsRunning(false)
        setTimeout(() => {
          setElapsedTime(0)
          themesong()
          setScreen("raceresults")
        }, 1500)
      }
    }
  }, [
    elapsedTime,
    isRunning,
    setIsRunning,
    scenario,
    postpit,
    themesong,
    setElapsedTime,
    stop,
  ])

  const handleGameExit = () => {
    setScreen("intro")
    setIsGame(false)
    setElapsedTime(0)
    setIsRunning(false)
    setCarMove(0)
  }

  const handlePitStop = getTime => {
    box()
    dispatchCarTyres(
      {
        type: PIT_STOP,
        payload: getTime,
      },
      []
    )
    setScreen("box")
    setTimeout(() => {
      setCarMove(1)
    }, 250)
  }

  const handleSelectedTyre = name => {
    dispatchCarTyres(
      {
        type: SELECTED_TYRE,
        name: name,
      },
      []
    )
  }

  const handleTyreSwap = (tyreColour, tyreLocation) => {
    dispatchCarTyres(
      {
        type: TYRE_SWAP,
        tyreColour: tyreColour,
        tyreLocation: tyreLocation,
      },
      []
    )
  }

  const handlePitTime = () => {
    idleengine()
    setIsRunning(true)
  }

  const handleTyreSpecs = () => {
    setScreen("tyrespecs")
  }

  const handleStartRace = () => {
    setScreen("race")
    lightsout()
  }

  return (
    <div>
      {isGame ? (
        <>
          {elapsedTime > 0 && (
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 py-1 px-2 text-white z-50 bg-black text-sm rounded-b-md">
              <span className="text-yellow-300 font-bold">Pit:</span>{" "}
              {elapsedTime}{" "}
              <span className="text-yellow-300 font-bold">Pos:</span>{" "}
              {scenario.position}
            </div>
          )}
          {isTopPitStops && <TopPitsScreen topPitStops={topPitStops} />}
          {topPitStops && (
            <div className="fixed top-3 right-3 z-50">
              <button
                className="btn-yellow"
                onClick={() => setIsTopPitStops(!isTopPitStops)}
              >
                {isTopPitStops ? "X" : "Top 10 Results"}
              </button>
            </div>
          )}
          <GameWrapper handleGameExit={handleGameExit}>
            {screen === "intro" && <GameIntro setScreen={setScreen} />}
            {screen === "scenario" && (
              <Scenario
                onStartRace={handleStartRace}
                onTyreSpecs={handleTyreSpecs}
                scenario={scenario}
              />
            )}
            {screen === "tyrespecs" && (
              <TyreSpecs setScreen={setScreen} tyreSelector={tyreSelector()} />
            )}
            {screen === "race" && (
              <Race onPitStop={handlePitStop} scenario={scenario} />
            )}
            {screen === "box" && (
              <Car
                onPitTime={handlePitTime}
                scenario={scenario}
                tyreSelector={tyreSelector()}
                onTyreSwap={handleTyreSwap}
                carMove={carMove}
                onSelectedTyre={handleSelectedTyre}
              />
            )}
            {screen === "raceresults" && (
              <Results
                scenario={scenario}
                onNewGame={handleNewGame}
                setTopPitStops={setTopPitStops}
              />
            )}
          </GameWrapper>
        </>
      ) : (
        <>
          <p>Make the right decisions to lead your team to victory!</p>
          <button onClick={() => handleNewGame()}>
            Play Pit-Stop Challenge
          </button>
        </>
      )}
    </div>
  )
}

export default PitStop
