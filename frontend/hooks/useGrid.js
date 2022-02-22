import { useState, useEffect } from "react";

const MOVES = ["left", "up", "right", "down"];
const DIRECTIONMAP = {
  left: [0, -1],
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
};

const buildPerfectSquareGrid = (gridArea) => {
  const length = Math.sqrt(gridArea);
  return Array.from({ length }, () => Array.from({ length }, () => false));
};

export const useGrid = (gridArea) => {
  const [grid, setGrid] = useState([]);
  const [currCoordinates, setCurrCoordinates] = useState([]);

  const handleGridMove = (d) => {
    const [xMove, yMove] = DIRECTIONMAP[d];
    const [currX, currY] = currCoordinates;

    const x = xMove + currX;
    const y = yMove + currY;

    if (x < 0 || x >= grid.length || y < 0 || y >= grid.length) {
      return 1;
    }

    updateGrid(x, y, currX, currY);
    return 0;
  };

  const updateGrid = (x, y, currX, currY) => {
    const modGrid = grid;
    modGrid[currX][currY] = false;
    modGrid[x][y] = true;

    setGrid(modGrid);
    setCurrCoordinates([x, y]);
  };

  const handleGridReset = () => {
    const modGrid = buildPerfectSquareGrid(gridArea);
    const s = modGrid.length ** 2 % 2 != 0 ? Math.floor(modGrid.length / 2) : 0;
    modGrid[s][s] = true;

    setGrid(modGrid);
    setCurrCoordinates([s, s]);
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
