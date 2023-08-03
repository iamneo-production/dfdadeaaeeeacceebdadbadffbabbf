import React, { useState } from "react";

const Stopwatch = () => {
  const [isActive, setActive] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [time, setTime] = useState(0);

  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setActive(true);
    setPaused(false);
    setDisabled(false);
  };

  const handleReset = () => {
    setPaused(false);
    setActive(false);
    setTime(0);
  };

  const handlePauseResume = () => {
    setPaused(!isPaused);
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">React Stopwatch</h1>
        <p className="timer" id="time">
          <span className="digits">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)} : {""}
          </span>
          <span className="digits">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)} : {""}
          </span>
          <span className="digits mili-sec">
            {("0" + ((time / 10) % 100)).slice(-2)}
          </span>
        </p>
        <div className="buttons">
          {isActive ? (
            <>
              {isPaused ? (
                <button data-testid="resume" onClick={handlePauseResume}>
                  Resume
                </button>
              ) : (
                <button data-testid="pause" onClick={handlePauseResume}>
                  Pause
                </button>
              )}
            </>
          ) : (
            <button data-testid="start" onClick={handleStart}>
              Start
            </button>
          )}
          <button data-testid="reset" onClick={handleReset} disabled={disabled}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
