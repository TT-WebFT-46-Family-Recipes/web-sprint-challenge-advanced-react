import { useState, useEffect } from "react";
import {
  MOVES,
  buildPerfectSquareGrid,
  gridMove,
  gridReset,
} from "../utils/grid";

export const useGrid = (gridArea) => {
  const [grid, setGrid] = useState(buildPerfectSquareGrid(gridArea));
  const [currCoordinates, setCurrCoordinates] = useState([]);

  const stateSetter = ({ grid, currCoordinates }) => {
    setGrid(grid);
    setCurrCoordinates(currCoordinates);
  };

  const handleGridMove = (d) => {
    return gridMove(d, grid, currCoordinates, stateSetter)[0];
  };

  const handleGridReset = () => {
    gridReset(gridArea, stateSetter);
  };

  useEffect(() => {
    handleGridReset();
  }, []);

  return {
    grid,
    currCoordinates,
    availableMoves: MOVES,
    handleGridMove,
    handleGridReset,
  };
};
