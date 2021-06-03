import React from "react"
import Home from "../Components/Home"
import Drivers from "../Components/Drivers"
import DriverStandings from "./DriverStandings"
import Constructors from "../Components/Constructors"
import ConstructorStandings from "../Components/ConstructorStandings"
import Schedule from "../Components/Schedule"
import PitStop from "./../Components/PitStop"
import { Router } from "@reach/router"

const Main = () => {
  return (
    <Router basepath="/f1">
      <Home path="/" />
      <Drivers path="/drivers" />
      <DriverStandings path="/standings" />
      <Schedule path="/schedule" />
      <Constructors path="/constructors" />
      <ConstructorStandings path="/constructor-standings" />
      <ConstructorStandings path="/constructor-standings" />
      <PitStop path="/pit-stop" />
    </Router>
  )
}

export default Main
