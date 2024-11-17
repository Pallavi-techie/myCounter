import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [autoIncrement, setAutoIncrement] = useState(false);
  const [autoDecrement, setAutoDecrement] = useState(false);

  //-----------------Sound Effect----------------
  const playSound = () => {
    const audio = new Audio(`/sound.mp3`);
    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
  };

  //---------------------Increment, Decrement, and Reset functions with limits---------------
  const increment = () => {
    setCount((prev) => Math.min(prev + 1, 100));
  };

  const decrement = () => {
    setCount((prev) => Math.max(prev - 1, -100));
  };

  const reset = () => {
    setCount(0);
    playSound(); // Play sound only once for reset
  };

  // -----------------------Auto increment/decrement logic-------------------------
  useEffect(() => {
    let interval = null;
    if (autoIncrement) {
      interval = setInterval(increment, 200);
    } else if (autoDecrement) {
      interval = setInterval(decrement, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoIncrement, autoDecrement]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 mt-10 relative">
  Counter
  <span className="absolute top-0 right-0 -mr-4 -mt-4 p-2 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">START</span>
</h1>



      {/*--------------------------Counter Card------------------*/}
      <div
        className={`relative flex items-center justify-center w-64 h-64 my-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-full shadow-2xl p-8 border-4 ${
          darkMode ? "border-blue-500" : "border-gray-300"
        } animate-bounce`}
      >
        <div
          className="text-6xl font-extrabold mb-6 text-center transform transition-all duration-300"
          style={{
            color: count > 0 ? "#34D399" : count < 0 ? "#EF4444" : "#374151",
            textShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)",
          }}
        >
          {count}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-6">
        {/* -----------------Styled Buttons--------------*/}
        <button
          onMouseDown={() => {
            setAutoIncrement(true);
            playSound(); // Play sound once when auto-increment starts
          }}
          onMouseUp={() => setAutoIncrement(false)}
          onMouseLeave={() => setAutoIncrement(false)}
          className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200"
        >
          +
        </button>
        <button
          onMouseDown={() => {
            setAutoDecrement(true);
            playSound(); // Play sound once when auto-decrement starts
          }}
          onMouseUp={() => setAutoDecrement(false)}
          onMouseLeave={() => setAutoDecrement(false)}
          className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200"
        >
          Reset
        </button>
      </div>

      {/*-------------------Dark Mode Toggle----------------------*/}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transform hover:scale-110 transition-all duration-200"
      >
        Toggle Dark Mode
      </button>

      {/*-----------------------Instructions-------------------*/}
      <div className="mt-4 text-sm text-gray-500">
        <p>Hold + or - to auto-increment/decrement</p>
        <p>Limit: -100 to 100</p>
      </div>
    </div>
  );
};

export default Counter;
