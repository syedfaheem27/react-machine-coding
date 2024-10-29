import Accordion from "./AccordionContext"
const data = [
    {
        id: 1,
        title: "loremIpsem",
        body: "jksbkjasjksdjkajkdaskj"
    },
    {
        id: 2,
        title: "loremIpsem",
        body: "jksbkjasjksdjkajkdaskj"
    }, {
        id: 3,
        title: "loremIpsem",
        body: "jksbkjasjksdjkajkdaskj"
    },

]
const AccordionContainer = () => {
    return (
        <Accordion>
            {
                data.map((d) => {
                    return <div key={d.id} style={{
                    }}>

                        <Accordion.Title title={d.title} recievedId={d.id} />
                        <Accordion.Body body={d.body} recievedId={d.id} />

                    </div>

                })
            }
        </Accordion>
    )
}

export default AccordionContainer
