import { useState, useEffect, useRef, React } from "react";
import '.src/App.css';


export default function Stopwatch(props){


    const [time, setTime] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const increment = useRef(null)


    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);

        increment.current = setInterval(() => {
          setTime((time) => time + 1000)}, 1000)
    };


    const handlePause = () => {
      clearInterval(increment.current)
      setIsPaused(!isPaused);
    };

    const handleResume = () => {
      setIsPaused(!isPaused);
      increment.current = setInterval(() => {
        setTime((time) => time + 1000)}, 1000)
    };
  
    const handleReset = () => {
     clearInterval(increment.current)
      setIsActive(false)
      setIsPaused(false)
      setTime(0)
    };

    return(
        <section id='stopwatch'>
            <div className='inner' >
            <h1> React Stopwatch </h1>

            <p id='time' data-testid='time'>{`${String(Math.floor(time % 360000)).slice(-2)} : ${String(Math.floor(time/60000) % 60).slice(-2)} : ${String(Math.floor(time/1000) % 60).slice(-2)}`}</p>


            <div className='buttons'>
            
            {
            !isActive && !isPaused?
              <button onClick={handleStart} data-testid='start'>Start</button>
              : (
                !isPaused ? <button data-testid='pause' onClick={handlePause}>Pause</button> :  <button data-testid='resume' onClick={handleResume}>Resume</button>
              )
            }

          <button id='reset' data-testid='reset' onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
        </div>

        </section>
    )
}