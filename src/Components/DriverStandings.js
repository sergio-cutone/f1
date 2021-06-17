import React, { useState, useEffect, useCallback } from "react"
import Years from "../helpers/years"

const DriverStandings = () => {
  const [standingsTable, setStandingsTable] = useState([])
  const [year, setYear] = useState(2021)

  const handleYear = value => {
    setYear(value)
  }

  const fetchDriverStandings = useCallback(async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    }
    await fetch(
      `https://ergast.com/api/f1/${year}/driverStandings`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        const parseString = require("xml2js").parseString
        parseString(result, function (err, result) {
          setStandingsTable(result.MRData.StandingsTable[0])
        })
      })
      .catch(error => console.log("error", error))
  }, [year])

  useEffect(() => {
    fetchDriverStandings(year)
  }, [fetchDriverStandings, year])

  return (
    <>
      {!standingsTable.$ ? (
        "Loading..."
      ) : (
        <>
          <Years onYear={handleYear} />
          <h1 className="text-3xl font-bold my-3">
            {standingsTable.$.season} Driver Standings
          </h1>
          <table className="table-auto w-full text-xs sm:text-base shadow-xl bg-white">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Pts</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {standingsTable.StandingsList[0].DriverStanding.map((e, i) => {
                const driverName = `${e.Driver[0].GivenName[0]} ${e.Driver[0].FamilyName[0]}`
                const constructorName = e.Constructor[0].Name
                const points = e.$.points
                const wins = e.$.wins
                return (
                  <tr
                    className={`${i === 0 && "bg-yellow-200"} ${
                      i === 1 && "bg-gray-200"
                    }`}
                    key={`standings-${i}`}
                  >
                    <td className="border border-gray-400 p-1">{i + 1}</td>
                    <td className="border border-gray-400 p-1">{driverName}</td>
                    <td className="border border-gray-400 p-1">
                      {constructorName}
                    </td>
                    <td className="border border-gray-400 p-1">{points}</td>
                    <td className="border border-gray-400 p-1">{wins}</td>
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

export default DriverStandings
