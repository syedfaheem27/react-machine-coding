import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

const Accordion = ({ children }) => {
    const [id, setId] = useState(null);
    return <AccordionContext.Provider value={{
        id, setId
    }}>
        {children}
    </AccordionContext.Provider>
}


const Title = ({ title, recievedId }) => {
    const { id, setId } = useContext(AccordionContext);

    return <button

        style={{
            display: 'flex',
            width: '100%',
            border: 'none',
            justifyContent: 'space-between',
            padding: '0.5em 1em',
            cursor: 'pointer'
        }}
        onClick={() => {
            setId(id => {
                return id !== recievedId ? recievedId : null
            })
        }}>
        <span>
            {title}
        </span>
        <span>
            {id === recievedId ? '-' : '+'}
        </span>
    </button>
}


const Body = ({ body, recievedId }) => {
    const { id } = useContext(AccordionContext);

    if (id !== recievedId)
        return null;

    return <div style={{
        background: 'beige',
        padding: '0.75em 1em'
    }}>
        {
            body
        }
    </div>
}

Accordion.Title = Title;
Accordion.Body = Body;

export default Accordion