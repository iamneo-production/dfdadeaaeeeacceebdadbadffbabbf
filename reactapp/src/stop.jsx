import React, { useState, useEffect } from 'react';

import "./App.css"

function Stopwatch() {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [disabled, setDisabled] = useState(true)

  function handleStart() {
    setIsActive(true);
    setIsPaused(true);
    setDisabled(false)
  }

  function handlePause() {
    setIsActive(false);
    setIsPaused(false)
  }

  function handleResume() {
    setIsActive(true);
    setIsPaused(true)
  }

  function handleReset() {
    setTimer(0);
    setIsActive(false);
    setIsPaused(false)
    setDisabled(true)
  }

  function formatTime(time) {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="app">
      <div className='stopwatch-card'>
        <div className="container">
        <h1>React Stopwatch</h1>
        <p data-testid="time">{formatTime(timer)}</p> 
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart} data-testid="start">Start</button>
              : (
                isPaused ? <button onClick={handlePause} data-testid="pause">Pause</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          <button onClick={handleReset} disabled={disabled} data-testid="reset">Reset</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
