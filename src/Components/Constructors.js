import React, { useEffect, useState } from "react"

const ConstructorsList = ({ constructors }) => {
  const constructorsTable = constructors.map((e, i) => {
    const raceDate = new Date(e.Date + " " + e.Time)
    const today = new Date()
    return (
      <>
        <div
          className={`table-row w-full ${
            today > raceDate ? "bg-gray-200" : "bg-white"
          }`}
          key={`constructors-${i}`}
        >
          <div className="table-cell border border-gray-300 p-1">{e.Name}</div>
          <div className="table-cell border border-gray-300 p-1">
            {e.Nationality}
          </div>
        </div>
      </>
    )
  })
  return (
    <>
      <h1 className="text-3xl font-bold my-3">Constructors</h1>
      {!constructors.length ? (
        <div>Loading...</div>
      ) : (
        <div className="table w-full text-xs sm:text-base shadow-xl bg-white">
          <div className="table-header-group">
            <div className="table-cell font-bold border border-gray-300 p-1 min-w-min">
              Name
            </div>
            <div className="table-cell font-bold border border-gray-300 p-1">
              Nationality
            </div>
          </div>
          <div className="table-row-group">{constructorsTable}</div>
        </div>
      )}
    </>
  )
}

const Constructors = () => {
  const [constructors, constructorsState] = useState([])

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    }

    fetch("https://ergast.com/api/f1/2021/constructors", requestOptions)
      .then(response => response.text())
      .then(result => {
        const parseString = require("xml2js").parseString
        parseString(result, function (err, result) {
          constructorsState(result.MRData.ConstructorTable[0].Constructor)
        })
      })
      .catch(error => console.log("error", error))
  }, [])
  return (
    <>
      <ConstructorsList constructors={constructors} />
    </>
  )
}

export default Constructors
