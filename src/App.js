import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const handleLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  return (
    <div className="App">
      <div className="stopwatch-container">
      <h1>STOPWATCH</h1>
        <div className="stopwatch">
             <div className="timer">
            <h2>{formatTime(time)}</h2>
          </div>
          <div className="buttons">
            <button onClick={() => setRunning(true)}>Start</button>
            <button onClick={() => setRunning(false)}>Pause</button>
            <button onClick={handleLap}>Lap</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className="laps">
          <h3>Lap Times</h3>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{lap}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
