
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [lights] = useState(['red', 'yellow', 'green']);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(index => {
        if (index === lights.length - 1)
          return 0;
        return ++index;
      })
    }, 1000)


    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header>
        <h1>Traffic react</h1>
      </header>
      <main className="container">
        <section className="traffic-outline">
          {
            lights.map((light, i) => {
              if (i !== activeIndex) {
                return <div key={light} className="light"></div>
              }
              return <div key={light} className={`${light} light`}></div>
            })
          }
        </section>
      </main>
    </>
  )
}

export default App
