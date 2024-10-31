import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [started, setStarted] = useState(false);

  const seconds = counter % 60 <= 9 ? `${counter % 60}`.padStart(2, '0') : `${counter % 60}`
  const minutes = Math.floor(counter / 60) <= 9 ? (Math.floor(counter / 60)).toString().padStart(2, "0") : (Math.floor(counter / 60)).toString();

  const handleResumeTimer = () => {
    if (intervalId)
      return;



    const id = setInterval(() => {
      setCounter(c => c + 1);
    }, 1000);
    setIntervalId(id);
    setStarted(true);
  }

  const handleResetTimer = () => {
    if (!intervalId && counter === 0)
      return;
    setCounter(0)
    clearInterval(intervalId);
    setIntervalId(null)
    setStarted(false);
  };

  const handlePause = () => {
    if (!intervalId)
      return;
    clearInterval(intervalId);
    setIntervalId(null);
  }

  return (
    <>
      <header>
        <h1>
          React stopwatch
        </h1>
      </header>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#626F47', minHeight: '676px' }}>

        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em', color: '#F2EED7', padding: '1em 2em', }}>
          <div style={{ display: 'flex', gap: '0.5em', fontWeight: 'bold', fontSize: '1.25rem' }}>
            <span>
              {seconds}
            </span>
            <span>
              :
            </span>
            <span>
              {minutes}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <button
              style={{
                border: 'none',
                padding: '0.75em 2em',
                borderRadius: '4px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (counter === 0 || intervalId === null)
                  handleResumeTimer();
                else if (counter !== 0 && intervalId !== null)
                  handlePause()

              }}
            >{!started ? 'start' : intervalId === null ? "start" : 'pause'}</button>
            <button
              style={{
                border: 'none',
                padding: '0.75em 2em',
                borderRadius: '4px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={handleResetTimer}>Reset</button>
          </div>

        </section>


      </main>
    </>
  )
}

export default App
