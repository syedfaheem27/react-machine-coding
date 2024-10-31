
import { useState } from 'react'
import './App.css'

const initialState = [{
  tabId: "A",
  title: "Tab A"
},
{
  tabId: "B",
  title: "Tab B"
},
{
  tabId: "C",
  title: "Tab C"
},
]

function App() {
  const [activeTab, setActiveTab] = useState("A");
  const [data, setData] = useState(initialState);
  const [tabs] = useState(["A", "B", "C"]);

  const handleTabChange = (id) => setActiveTab(id)

  return (
    <>
      <header>
        <h1>
          Tabs Switch component
        </h1>
      </header>
      <main style={{
        minHeight: '670px',
        padding: '2em'
      }}>
        <section className="tab-section">
          {
            tabs.map(t => {
              return <div onClick={handleTabChange.bind(null, t)} key={t} className={`${t === activeTab ? 'active' : ""}`}>
                <h3>
                  Tab {t}
                </h3>
              </div>
            })
          }
        </section>
        <section className="tabs-content">
          {
            data.map(d => {
              if (d.tabId !== activeTab)
                return null;

              return <h1 key={d.tabId}>{d.title}</h1>

            })
          }
        </section>




      </main>
    </>
  )
}

export default App
