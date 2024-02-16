/**
 * @param {number} length
 * @returns {number[]}
 */
export const createArrayOfNumbers = (length) =>
  Array.from(Array(length).keys());

/**
 * @param {boolean} currentStatus
 * @param {number} count
 * @returns boolean
 */
export const updateCell = (currentStatus, count) => {
  switch (count) {
    case 0:
    case 1:
      return false;
    case 2:
      return currentStatus;
    case 3:
      return true;
    default:
      return false;
  }
};

/**
 * @param {number} i
 * @param {number} j
 * @param {boolean[][]} grid
 * @returns number
 */
export const getNumberOfAliveCells = (i, j, grid) => {
  let counter = 0;

  for (let ci = i - 1; ci <= i + 1; ci++) {
    for (let cj = j - 1; cj <= j + 1; cj++) {
      if (ci === i && cj === j) {
        continue;
      }
      if (grid?.[ci]?.[cj]) {
        counter++;
      }
    }
  }

  return counter;
};

/**
 * @param {number} height
 * @param {number} width
 * @param {string[]} initialPopulation
 * @returns {boolean[][]}
 */
export const initGrid = (height, width, initialPopulation) => {
  const hArray = createArrayOfNumbers(height);
  const wArray = createArrayOfNumbers(width);

  return hArray.map((i) =>
    wArray.map((j) => {
      if (initialPopulation.includes(`${i}-${j}`)) {
        return true;
      }
      return false;
    })
  );
};

/**
 * @param {boolean} grid
 * @param {number} height
 * @param {number} width
 * @returns {boolean[][]}
 */
export const updateGrid = (grid, height, width) => {
  const hArray = createArrayOfNumbers(height);
  const wArray = createArrayOfNumbers(width);

  return hArray.map((i) =>
    wArray.map((j) => {
      const count = getNumberOfAliveCells(i, j, grid);
      return updateCell(grid[i][j], count);
    })
  );
};

/**
 * @param {number} number
 * @returns {number}
 */
export const clampValue = (number) => Math.min(Math.max(number, 20), 100);
