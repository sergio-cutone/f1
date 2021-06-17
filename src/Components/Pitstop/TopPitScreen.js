import React from "react"

const TopPitsScreen = ({ topPitStops }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black z-50 text-white py-3 bg-opacity-80">
      <p className="font-bold">Top 10 Results</p>
      <div className="flex flex-row text-xs mx-auto font-bold text-yellow-300 w-52 mb-1">
        <div className="flex-1">Time</div>
        <div className="flex-1">Position</div>
      </div>
      {topPitStops.map((e, i) => (
        <div
          key={`result-${i}`}
          className="flex flex-row text-xs mx-auto w-52 mb-1"
        >
          <div className="flex-1">{e[0]}s</div>
          <div className="flex-1">{e[1]}</div>
        </div>
      ))}
    </div>
  )
}

export default TopPitsScreen
