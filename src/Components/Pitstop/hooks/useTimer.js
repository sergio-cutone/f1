import React, { useState, useEffect } from "react"

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        setElapsedTime((elapsedTime / 1000).toFixed(3))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
  }
}

export default useTimer
