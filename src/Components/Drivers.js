import React, { useCallback, useEffect, useState } from "react"
import Years from "../helpers/years"

const Drivers = () => {
  const [driverTable, setDriverTable] = useState([])
  const date = new Date()
  const currentYear = date.getFullYear()
  const [year, setYear] = useState(currentYear)

  const handleYear = value => {
    setYear(value)
  }

  const fetchDrivers = useCallback(async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    }
    await fetch(`https://ergast.com/api/f1/${year}/drivers`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const parseString = require("xml2js").parseString
        parseString(result, function (err, result) {
          setDriverTable(result.MRData.DriverTable[0])
        })
      })
      .catch(error => console.log("error", error))
  }, [year])

  useEffect(() => {
    fetchDrivers()
  }, [year, fetchDrivers])

  return (
    <>
      {!driverTable.$ ? (
        "Loading..."
      ) : (
        <>
          <Years onYear={handleYear} />
          <h1 className="text-3xl font-bold my-3">
            {driverTable.$.season} Drivers
          </h1>
          <table className="table-auto w-full text-xs sm:text-base shadow-xl bg-white">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Number</th>
                <th>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {driverTable.Driver.map((e, i) => {
                const driverName = `${e.GivenName} ${e.FamilyName}`
                const nationality = e.Nationality
                const number = e.PermanentNumber
                return (
                  <tr key={`driver-${i}`}>
                    <td className="border border-gray-400 p-1">{driverName}</td>
                    <td className="border border-gray-400 p-1">{number}</td>
                    <td className="border border-gray-400 p-1">
                      {nationality}
                    </td>
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

export default Drivers
