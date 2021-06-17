import React, { useCallback, useEffect, useState } from "react"

const Schedule = () => {
  const [raceTable, setRaceTable] = useState([])
  let nextRace = 0
  let raceCount = 0

  const fetchSchedule = useCallback(async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    }

    await fetch("https://ergast.com/api/f1/current", requestOptions)
      .then(response => response.text())
      .then(result => {
        const parseString = require("xml2js").parseString
        parseString(result, function (err, result) {
          setRaceTable(result.MRData.RaceTable[0])
        })
      })
      .catch(error => console.log("error", error))
  }, [])

  useEffect(() => {
    fetchSchedule()
  }, [fetchSchedule])
  return (
    <>
      {!raceTable.$ ? (
        "Loading..."
      ) : (
        <>
          <h1 className="text-3xl font-bold my-3">
            {raceTable.$.season} Schedule
          </h1>
          <table className="table-auto w-full text-xs sm:text-base shadow-xl bg-white">
            <thead>
              <tr>
                <th>Rnd</th>
                <th>Date</th>
                <th>Driver</th>
              </tr>
            </thead>
            <tbody>
              {raceTable.Race.map((e, i) => {
                const raceDate = new Date(e.Date + " " + e.Time)
                const today = new Date()
                if (today < raceDate && raceCount >= 0) {
                  raceCount++
                  nextRace = raceCount === 1 ? 1 : 2
                }
                const raceDateFormat = raceDate
                  .toLocaleString("en-US", {
                    timeZone: "America/Toronto",
                  })
                  .split(", ")
                return (
                  <tr
                    className={`${
                      nextRace === 0
                        ? "bg-gray-200"
                        : nextRace === 1
                        ? "bg-green-200"
                        : "bg-white"
                    }`}
                    key={`schedule-${i}`}
                  >
                    <td className="border border-gray-400 p-1">{i + 1}</td>
                    <td className="border border-gray-400 p-1">
                      {raceDateFormat[0]}
                      <br />
                      {raceDateFormat[1]} est
                    </td>
                    <td className="border border-gray-400 p-1">{e.RaceName}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default Schedule
