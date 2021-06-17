import soft from "../../../img/red.svg"
import medium from "../../../img/yellow.svg"
import hard from "../../../img/white.svg"
import intermediate from "../../../img/green.svg"
import wet from "../../../img/blue.svg"

const tyreSelector = name => {
  const tyres = [
    {
      img: soft,
      name: "C5 Soft",
      extra: "Fastest",
      rated: "21-23",
      colour: "#ff2928",
    },
    {
      img: medium,
      name: "C5 Medium",
      extra: "Balanced",
      rated: "43-51",
      colour: "#f2ca12",
    },
    {
      img: hard,
      name: "C5 Hard",
      extra: "Longest",
      rated: "51-57",
      colour: "#ffffff",
    },
    {
      img: intermediate,
      name: "Intermediate",
      extra: "Light Rain",
      rated: "54-60",
      colour: "#3ecc2e",
    },
    {
      img: wet,
      name: "Wet",
      extra: "Heavy Rain",
      rated: "54-60",
      colour: "#018dd2",
    },
  ]

  return name ? tyres.find(e => e.name === name) : tyres
}

export default tyreSelector
