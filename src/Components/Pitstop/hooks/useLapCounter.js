import React, { useState, useEffect } from "react"
import useSound from "use-sound"
import trackSFX from "../../.././sounds/track.mp3"

const useLapCounter = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [track] = useSound(trackSFX)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        track()
        setElapsedTime(elapsedTime => elapsedTime + 1)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isRunning, track])

  return {
    setIsRunning,
    elapsedTime,
    setElapsedTime,
  }
}

export default useLapCounter
