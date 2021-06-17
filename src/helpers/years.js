import React from "react"

const Years = ({ onYear }) => {
  const date = new Date()
  const year = date.getFullYear()
  const years = []
  for (let i = 0; i < 10; i++) {
    years.push(year - i)
  }

  return (
    <>
      <strong>Year</strong>{" "}
      <select
        onChange={e => onYear(e.target.value)}
        className="border border-black"
      >
        {years.map((e, i) => (
          <option value={e} key={`year-${i}`}>
            {e}
          </option>
        ))}
      </select>
    </>
  )
}

export default Years
