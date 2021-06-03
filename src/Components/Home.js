import React, { useEffect, useState } from "react"

const LastRace = ({ lastRaceResults }) => {
  const raceResults = () => {
    const raceName = lastRaceResults[0].RaceName
    const raceDate = lastRaceResults[0].Date
    const raceResults = lastRaceResults[0].ResultsList[0].Result
    return (
      <>
        <h1 className="text-3xl font-bold my-3">{raceName}</h1>
        <p>
          <strong>Latest Results</strong>
          <br />
          {raceDate}
        </p>
        <table className="table-auto w-full text-xs sm:text-base shadow-xl bg-white">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Time</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {raceResults.map((e, i) => {
              const driverName = `${e.Driver[0].GivenName} ${e.Driver[0].FamilyName}`
              const position = e.$.positionText
              const points = e.$.points
              const timee = typeof e.Time === "object" ? e.Time[0]._ : ""
              return (
                <tr
                  className={`${i === 0 && "bg-yellow-200"} ${
                    i === 1 && "bg-gray-200"
                  }`}
                >
                  <td className="border border-gray-400 p-1">{position}</td>
                  <td className="border border-gray-400 p-1">{driverName}</td>
                  <td className="border border-gray-400 p-1">{timee}</td>
                  <td className="border border-gray-400 p-1">{points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>{!lastRaceResults.length ? "Loading..." : <div>{raceResults()}</div>}</>
  )
}

const Home = () => {
  const [lastRaceResults, lastRaceResultsState] = useState([])

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    }

    fetch("https://ergast.com/api/f1/current/last/results", requestOptions)
      .then(response => response.text())
      .then(result => {
        const parseString = require("xml2js").parseString
        parseString(result, function (err, result) {
          lastRaceResultsState(result.MRData.RaceTable[0].Race)
        })
      })
      .catch(error => console.log("error", error))
  }, [])
  return (
    <>
      <LastRace lastRaceResults={lastRaceResults} />
    </>
  )
}

export default Home
