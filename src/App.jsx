import { useCallback, useEffect, useState } from "react";
import Cell from "./components/Cell";

import {
  initGrid,
  updateGrid,
  createArrayOfNumbers,
  clampValue,
} from "./utils";

const n = 40;

const aliveCells = [
  "12-2",
  "12-3",
  "12-4",
  "11-4",
  "10-3",
  "10-22",
  "10-23",
  "10-24",
  "14-22",
  "15-22",
  "11-22",
  "13-24",
  "12-24",
  "6-6",
  "6-7",
  "6-8",
  "7-7",
  "7-8",
  "7-9",
];

function App() {
  // base state
  const [isPaused, setIsPaused] = useState(true);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [width, setWidth] = useState(n);
  const [height, setHeight] = useState(n);

  // derived state
  const [initialPopulation, setInitialPopulation] = useState(aliveCells);
  const [grid, setGrid] = useState(() =>
    initGrid(height, width, initialPopulation)
  );

  const isGameRunning = !isPaused && !isSetupMode;

  const update = useCallback(() => {
    return setInterval(() => {
      if (!isGameRunning) {
        return;
      }
      setGrid((old) => updateGrid(old, height, width));
    }, 200);
  }, [isGameRunning, height, width]);

  useEffect(() => {
    const timer = update();
    return () => {
      clearInterval(timer);
    };
  }, [update]);

  useEffect(() => {
    setGrid(initGrid(height, width, initialPopulation));
  }, [height, width, initialPopulation]);

  return (
    <>
      <h1>React&apos;s game of life</h1>
      <p>
        A recreation of{" "}
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noreferrer noopener"
        >
          Conway&apos;s game of life
        </a>{" "}
        in React. (because why not)
      </p>
      <div className="form">
        <input
          disabled={isGameRunning || isSetupMode}
          value={width}
          placeholder="width"
          min="20"
          max="50"
          type="number"
          onChange={(e) => setWidth(clampValue(parseInt(e.target.value, 10)))}
        />
        <input
          disabled={isGameRunning || isSetupMode}
          value={height}
          placeholder="height"
          min="20"
          max="50"
          type="number"
          onChange={(e) => setHeight(clampValue(parseInt(e.target.value, 10)))}
        />
        <button
          type="button"
          disabled={isSetupMode}
          onClick={() =>
            setIsPaused((p) => {
              return !p;
            })
          }
        >
          {isPaused ? "Start" : "Pause"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSetupMode((p) => !p);
          }}
        >
          {isSetupMode ? "Set initial population" : "Update initial population"}
        </button>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {createArrayOfNumbers(height).map((i) =>
          createArrayOfNumbers(width).map((j) => (
            <Cell
              id={`${i}-${j}`}
              key={`${i}-${j}`}
              isAlive={grid[i][j]}
              onClick={(e) => {
                if (isGameRunning || !isSetupMode) {
                  return;
                }

                const stringId = `${e.target.id}`;

                if (initialPopulation.includes(stringId)) {
                  setInitialPopulation((p) => [
                    ...p.filter((e) => e !== stringId),
                  ]);
                  return;
                }

                setInitialPopulation((p) => [...p, stringId]);
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
