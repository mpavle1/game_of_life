import { Fragment, useEffect, useRef, useState } from 'react';
import Cell from './Cell'

const n = 30;
const arr =  Array.from(Array(n).keys());

const aliveCells = [/*'10-22','10-23','10-24','14-22','15-22','11-22','13-24','12-24',*/'6-6','6-7','6-8','7-7','7-8','7-9'];

const updateCell = (currentStatus, count) => {
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
}

const getNumberOfAliveCells = (i, j, grid) => {
  let counter = 0;

  for (let ci = i-1; ci <= i + 1; ci++) {
    for (let cj = j-1; cj <= j + 1; cj++) {
      if (`${i}-${j}` === '7-7') {
        console.log({
          i,j,ci,cj,grid: grid?.[ci]?.[cj]
        })
      }
      if (ci === i && cj === j) {
        continue;
      }
      if (grid?.[ci]?.[cj]) {
        counter++;
      }
    }
  }

  return counter;
}

const emptyGrid = arr.map(() => (
  arr.map(() => {
    return false
  })
));

const initGrid = arr.map((i) => (
    arr.map((j) => {
      if (aliveCells.includes(`${i}-${j}`)) {
        return true;
      }
      return false
    })
  ))

const updateGrid = (grid) => {
  const newGrid = [...emptyGrid];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const count = getNumberOfAliveCells(i, j, grid);
      newGrid[i][j] = updateCell(grid[i][j], count);
    }
  }

  console.log({ newGrid})

  return newGrid;
}

function App() {
  const [grid, setGrid] = useState(() => initGrid);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setGrid(old => updateGrid(old))
  //   }, 1000)

  //   return () => {
  //     clearInterval(timer);
  //   }
  //   // timer.current = setTimeout(() => {
  //   //   setGrid(old => updateGrid(old))
  //   // }, 1000)

  //   // return () => {
  //   //   clearTimeout(timer);
  //   // }
  // }, []);

  return (
    <Fragment>
      <button onClick={() => {
        setGrid(old => updateGrid([...old]))
      }}>
        Update
      </button>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`}}>
        {
          Array.from(Array(n).keys()).map(i => (
            Array.from(Array(n).keys()).map(j => (
              <Cell key={`${i}-${j}`} isAlive={grid[i][j]} />
            ))
          ))
        }
    </div>
    </Fragment>
    
  )
}

export default App
