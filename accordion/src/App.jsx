import AccordionContainer from "./components/accordion/AccordionContainer"

function App() {

  return (
    <>
      <header>
        <h1>An Accoridon component build using compound component pattern</h1>
      </header>
      <section style={{
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <AccordionContainer />
      </section>
    </>
  )
}

export default App
