import React from "react"
import react from "../img/react.png"
import tailwindcss from "../img/tailwindcss.png"
import postgresql from "../img/postgresql.png"
import python from "../img/python.png"

const Footer = () => {
  const date = new Date()

  return (
    <footer className="text-center py-10">
      <p>Copyright {date.getFullYear()} Sergio Cutone</p>
      <p>
        <img src={react} alt="React" title="React" className="inline h-14" />{" "}
        <img
          src={tailwindcss}
          alt="TailwindCSS"
          title="TailwindCSS"
          className="inline h-14"
        />
        <img src={python} alt="Python" title="Python" className="inline h-14" />
        <img
          src={postgresql}
          alt="Postgresql"
          title="Postgresql"
          className="inline h-14"
        />
      </p>
    </footer>
  )
}

export default Footer
