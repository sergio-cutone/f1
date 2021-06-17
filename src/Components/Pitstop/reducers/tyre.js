import React from "react"

const INITIAL_SETUP = "INITIAL_SETUP"
const PIT_STOP = "PIT_STOP"
const TYRE_SWAP = "TYRE_SWAP"
const SELECTED_TYRE = "SELECTED_TYRE"

const tyreReducer = (state, action) => {
  switch (action.type) {
    case INITIAL_SETUP:
      return {
        ...action.payload,
        tyredata: [
          {
            location: "FL",
            tyre: action.startingtire.colour,
            swap: 0,
          },
          {
            location: "FR",
            tyre: action.startingtire.colour,
            swap: 0,
          },
          {
            location: "BL",
            tyre: action.startingtire.colour,
            swap: 0,
          },
          {
            location: "BR",
            tyre: action.startingtire.colour,
            swap: 0,
          },
        ],
        position: 1,
        box: action.payload.start,
        startingtire: action.startingtire,
        pittime: 0,
        endtire: false,
      }
    case PIT_STOP:
      return { ...state, box: action.payload }
    case SELECTED_TYRE:
      return { ...state, endtire: action.name }
    case TYRE_SWAP:
      const tmpTyreData = state.tyredata.map(e =>
        e.location === action.tyreLocation
          ? { ...e, tyre: action.tyreColour, name: action.tyreName, swap: 1 }
          : e
      )
      return { ...state, tyredata: tmpTyreData }
    default:
      return state
  }
}

export { INITIAL_SETUP, PIT_STOP, TYRE_SWAP, SELECTED_TYRE }
export default tyreReducer
