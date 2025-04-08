import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [isRunning, setisRunning] = useState(false);
  const [elapsedtime, setelapsedtime] = useState(0);
  const intervalRef = useRef(null);
  const starttimeRef = useRef(null);

  const handleStart = () => {
    if (isRunning) return;
    setisRunning(true);
    starttimeRef.current = Date.now() - elapsedtime * 1000;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - starttimeRef.current) / 1000);
      setelapsedtime(diff);
    }, 1000);
  };

  const handleEnd = () => {
    if (!isRunning) return;
    clearInterval(intervalRef.current);
    setisRunning(false);
  };

  const handleReset = () => {
    setisRunning(false);
    clearInterval(intervalRef.current);
    starttimeRef.current = null;
    setelapsedtime(0);
    console.log('reset is clicked');
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
  };

  return (
    <>
      <div className='bg-blue-200 min-h-screen w-full font-bold font-serif flex flex-col items-center justify-center p-6'>
        <div className='text-4xl text-white bg-blue-500 p-4 rounded-xl shadow-md mb-8'>
          StopWatch
        </div>
        <h1 className='text-7xl text-black mb-8'>{formatTime(elapsedtime)}</h1>
        <div className='flex flex-row justify-center items-center space-x-6'>
          <button
            className='text-xl bg-blue-500 text-white rounded-2xl px-6 py-2 border-2 border-blue-800 hover:bg-red-500 transition'
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className='text-xl bg-blue-500 text-white rounded-2xl px-6 py-2 border-2 border-blue-800 hover:bg-red-500 transition'
            onClick={handleEnd}
          >
            Stop
          </button>
          <button
            className='text-xl bg-blue-500 text-white rounded-2xl px-6 py-2 border-2 border-blue-800 hover:bg-red-500 transition'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
