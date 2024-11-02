import { useState } from "react"


const Progress = ({ taskPercent = 10 }) => {
    const [finished, setFinished] = useState(taskPercent)
    const [intervalId, setIntervalId] = useState(null);
    const [isRunning, setIsRunning] = useState(false);


    const handleStart = () => {
        setIsRunning(true);
        const id = setInterval(() => {
            setFinished(f => {
                if (f >= 100) {
                    handleStop(id);
                    return 100;
                }
                return f + 1;
            })
        }, 50)
        setIntervalId(id);
    }
    const handleStop = (id) => {
        setIsRunning(false);
        clearInterval(id);
        setIntervalId(null);
    }

    const handleReset = (id) => {
        handleStop(id);
        setFinished(taskPercent)

    }



    return (
        <section className="progress-container">
            <div className="progress-bar">
                <span style={{
                    width: `${finished}%`
                }}></span>
                <span>{finished}%</span>
            </div>
            <div>
                <button onClick={isRunning ? handleStop.bind(null, intervalId) : handleStart}>
                    {!isRunning ? "Start" : "Stop"}
                </button>
                <button onClick={handleReset.bind(null, intervalId)}>
                    Reset
                </button>
            </div>
        </section>
    )
}

export default Progress
