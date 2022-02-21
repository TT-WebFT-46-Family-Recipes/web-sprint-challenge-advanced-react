export const MOVES = ["left", "up", "right", "down"];
export const DIRECTIONMAP = {
  left: [0, -1],
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
};

export const buildPerfectSquareGrid = (gridArea) => {
  const length = Math.sqrt(gridArea);
  return Array.from({ length }, () => Array.from({ length }, () => false));
};

export const gridMove = (d, grid, currCoordinates, stateSetter = null) => {
  const [xMove, yMove] = DIRECTIONMAP[d];
  const [currX, currY] = currCoordinates;

  const x = xMove + currX;
  const y = yMove + currY;

  if (x < 0 || x >= grid.length || y < 0 || y >= grid.length) {
    return [1];
  }

  const modGrid = updateGrid(grid, x, y, currX, currY);

  if (stateSetter) {
    stateSetter({ grid: modGrid, currCoordinates: [x, y] });
  }

  return [0, modGrid, [x, y]];
};

export const updateGrid = (grid, x, y, currX, currY) => {
  const modGrid = grid;
  modGrid[currX][currY] = false;
  modGrid[x][y] = true;

  return modGrid;
};

export const gridReset = (area, stateSetter) => {
  const modGrid = buildPerfectSquareGrid(area);
  const s = modGrid.length ** 2 % 2 != 0 ? Math.floor(modGrid.length / 2) : 0;
  modGrid[s][s] = true;

  if (stateSetter) {
    stateSetter({ grid: modGrid, currCoordinates: [s, s] });
  }
};
