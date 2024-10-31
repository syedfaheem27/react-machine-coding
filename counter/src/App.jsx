import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [counter, setCounter] = useState([0]);
  const [currIndex, setCurrIndex] = useState(0);

  const handleIncrement = () => {
    setCurrIndex(c => c + 1)
    setCounter(c => {
      let arr = [...c];
      arr.push(arr.at(-1) + 1)
      return [...arr];
    })
  }

  const handleDecrement = () => {
    setCurrIndex(c => c + 1)
    setCounter(c => {
      let arr = [...c];
      arr.push(arr.at(-1) - 1)
      return [...arr];
    })
  }


  const handleUndo = () => {
    if (currIndex === 0)
      return;
    setCurrIndex(c => c - 1);
  }

  const handleRedo = () => {
    if (currIndex === counter.length - 1)
      return;
    setCurrIndex(c => c + 1);
  }


  return (
    <>
      <header>
        <h1>
          Counter with undo/redo
        </h1>
      </header>
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '670px'
      }}>
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1em'
        }}>
          <div >
            {
              counter[currIndex]
            }
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1em'
          }}>
            <button style={{
              cursor: 'pointer'
            }}
              onClick={handleUndo}
            >Undo</button>
            <button style={{
              cursor: 'pointer'
            }}
              onClick={handleIncrement}
            >+</button>
            <button style={{
              cursor: 'pointer'
            }}
              onClick={handleDecrement}
            >-</button>
            <button style={{
              cursor: 'pointer'
            }}
              onClick={handleRedo}
            >Redo</button>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
