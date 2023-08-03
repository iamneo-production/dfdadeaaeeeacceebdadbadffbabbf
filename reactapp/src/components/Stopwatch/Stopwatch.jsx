import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsActive(false);
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsActive(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsPaused(false);
    setIsActive(false);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
    const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
    return ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid #00BFFF", padding: "20px"}}>
      <h1 style={{textAlign: "center"}}>React Stopwatch</h1>
      <p style={{fontSize: "3rem"}} data-testid="time">{formatTime(time)}</p>
      {isPaused ? (
        <button style={{background: "#00BFFF", color: "white", fontWeight: "bold", fontSize: "1rem", padding: "10px 20px", margin: "10px"}} data-testid="resume" onClick={handleResume}>Resume</button>
      ) : isActive ? (
        <button style={{background: "#FF6347", color: "white", fontWeight: "bold", fontSize: "1rem", padding: "10px 20px", margin: "10px"}} data-testid="pause" onClick={handlePause}>Pause</button>
      ) : (
        <button style={{background: "#008000", color: "white", fontWeight: "bold", fontSize: "1rem", padding: "10px 20px", margin: "10px"}} data-testid="start" onClick={handleStart}>Start</button>
      )}
      <button style={{background: "#D3D3D3", color: "black", fontWeight: "bold", fontSize: "1rem", padding: "10px 20px", margin: "10px"}} data-testid="reset" onClick={handleReset} disabled={!isActive && time === 0}>Reset</button>
    </div>
  );
}

export default Stopwatch;