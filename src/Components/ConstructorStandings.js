import React, { useEffect, useState, useCallback } from "react"
import Years from "./../helpers/years"

const ConstructorStandings = () => {
  const date = new Date()
  const [standingsTable, setStandingsTable] = useState([])
  const [year, yearState] = useState(date.getFullYear())

  const handleYear = value => {
    yearState(value)
  }

  const fetchConstructorStandings = useCallback(async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    }
    await fetch(
      `https://ergast.com/api/f1/${year}/constructorStandings`,
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
    fetchConstructorStandings()
  }, [fetchConstructorStandings, year])

  return (
    <>
      {!standingsTable.$ ? (
        "Loading..."
      ) : (
        <>
          <Years onYear={handleYear} />
          <h1 className="text-3xl font-bold my-3">
            {standingsTable.$.season} Constructor Standings
          </h1>
          <table className="table-auto w-full text-xs sm:text-base shadow-xl bg-white">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Constructor</th>
                <th>Nationality</th>
                <th>Pts</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {standingsTable.StandingsList[0].ConstructorStanding.map(
                (e, i) => {
                  return (
                    <tr key={`constructor-${i}`}>
                      <td className="border border-gray-400 p-1">{i + 1}</td>
                      <td className="border border-gray-400 p-1">
                        {e.Constructor[0].Name}
                      </td>
                      <td className="border border-gray-400 p-1">
                        {e.Constructor[0].Nationality}
                      </td>
                      <td className="border border-gray-400 p-1">
                        {e.$.points}
                      </td>
                      <td className="border border-gray-400 p-1">{e.$.wins}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default ConstructorStandings
