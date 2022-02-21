import React, { useState, useRef } from "react";
import { useGrid } from "../hooks/useGridv2";
import { sendEmail } from "../utils/sendEmail";
import Grid from "./Grid";

const GRIDAREA = 9;
const NOSTEPS = 0;
const ERRMSG = "You can't go ";

export default function AppFunctional({ className }) {
  const [stepsMoved, setStepsMoved] = useState(NOSTEPS);
  const [msg, setMsg] = useState("");
  const emailForm = useRef(null);
  const {
    grid,
    currCoordinates,
    availableMoves,
    handleGridMove,
    handleGridReset,
  } = useGrid(GRIDAREA);

  const handleMoveClick = (direction) => {
    if (handleGridMove(direction) === 0) {
      setStepsMoved((steps) => steps + 1);
      setMsg("");
    } else setMsg(ERRMSG + direction);
  };

  const handleResetClick = () => {
    handleGridReset();
    setStepsMoved(NOSTEPS);
    setMsg("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = emailForm.current;

    const resMsg = await sendEmail({
      x: x + 1,
      y: y + 1,
      steps: stepsMoved,
      email: form.email.value,
    });

    setMsg(resMsg);
  };

  const [x, y] = currCoordinates;

  return (
    <Grid
      className={className}
      stepsMoved={stepsMoved}
      grid={grid}
      x={x}
      y={y}
      msg={msg}
      availableMoves={availableMoves}
      handleMoveClick={handleMoveClick}
      handleResetClick={handleResetClick}
      emailForm={emailForm}
      handleFormSubmit={handleFormSubmit}
    />
  );
}
