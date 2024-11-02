
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { useRef } from 'react';

const initialState = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => false))

function App() {
  const [moles] = useState(initialState);
  const [hasStarted, setHasStarted] = useState(false);
  const [totalTime, setTotalTime] = useState(20);
  const [intervalId, setIntervalId] = useState(null);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const score = useRef(0);
  const bestScore = useRef(0)

  const handleStart = () => {
    if (hasStarted)
      return;
    setHasStarted(true);
  }
  const handleClick = (rowNum, colNum) => {
    if (rowNum === row && colNum === col)
      score.current += 1;
  }



  useEffect(() => {
    if (!hasStarted)
      return;

    const id = setInterval(() => {
      const rowNum = Math.floor(Math.random() * 3);
      const colNum = Math.floor(Math.random() * 3);

      setRow(rowNum);
      setCol(colNum);
      setTotalTime(t => {
        if (t === 0) {
          setHasStarted(false);
          return t
        }
        return --t;
      });

    }, 500)
    setIntervalId(id);


    return () => {
      setIntervalId(id => {
        clearInterval(id);
        return null;
      })
    };
  }, [hasStarted])

  if (totalTime === 0) {
    return <>
      <h1>Your score</h1>
      <h2>Your current score:{score.current}</h2>
      <h3>Your previous best : {bestScore.current}</h3>
      <h4>Your new best : {bestScore.current > score.current ? bestScore.current : score.current}</h4>
      <button onClick={() => {
        setTotalTime(20)
        bestScore.current = bestScore.current > score.current ? bestScore.current : score.current;
      }}>
        Start Again
      </button>
    </>
  }
  return (
    <>
      <header>
        <h1>
          A mole game
        </h1>
      </header>
      <main>
        <section className='board'>
          {
            moles.map((arr, rowNum) => {
              return <div key={rowNum}>
                {
                  arr.map((_, colNum) => {
                    return <span
                      onClick={handleClick.bind(null, rowNum, colNum)}
                      key={`${rowNum},${colNum}`}
                      className={`${row === rowNum && col === colNum && hasStarted ? 'active' : ""}`}
                    ></span>
                  })
                }
              </div>

            })

          }
        </section>
        <button onClick={handleStart}>Start Game</button>
      </main>
    </>
  )
}

export default App
