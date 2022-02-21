import React from "react";

const Grid = ({
  className,
  stepsMoved,
  grid,
  x,
  y,
  msg,
  availableMoves,
  handleMoveClick,
  handleResetClick,
  emailForm,
  handleFormSubmit,
}) => (
  <div id="wrapper" className={className}>
    <div className="info">
      <h3 id="coordinates">{`Coordinates (${[x + 1, y + 1]})`}</h3>
      <h3 id="steps">{`You moved ${stepsMoved} times`}</h3>
    </div>
    <div id="grid">
      {grid.map((row) =>
        row.map((e, i) => (
          <div key={i} className={e ? "square active" : "square"}>
            {e && "B"}
          </div>
        ))
      )}
    </div>
    <div className="info">
      <h3 id="message">{msg}</h3>
    </div>
    <div id="keypad">
      {availableMoves.map((d) => (
        <button id={d} key={d} onClick={() => handleMoveClick(d)}>
          {d.toUpperCase()}
        </button>
      ))}
      <button id="reset" onClick={handleResetClick}>
        reset
      </button>
    </div>
    <form ref={emailForm} onSubmit={handleFormSubmit}>
      <input id="email" type="email" placeholder="type email"></input>
      <input id="submit" type="submit"></input>
    </form>
  </div>
);

export default Grid;
