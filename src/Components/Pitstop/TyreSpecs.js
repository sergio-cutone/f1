import React from "react"

const TyreSpecs = ({ screenState, tyreSelector }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
        {tyreSelector.map(e => (
          <div>
            <img src={e.img} alt="tyre" className="h-14 mx-auto" />
            <strong>{e.name}</strong>
            {e.extra && (
              <>
                <br />
                {e.extra}
              </>
            )}
            <br />
            {e.rated} Laps
          </div>
        ))}
      </div>
      <button onClick={() => screenState("scenario")}>BACK</button>
    </>
  )
}
export default TyreSpecs
