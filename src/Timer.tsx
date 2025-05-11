import { FaPause, FaPlay } from "react-icons/fa";
import { useTimerToggleReducerMachine } from "./machines/TimerMachine";

const Timer = () => {
  const { state, timer, startTimer, pauseTimer, resetTimer } =
    useTimerToggleReducerMachine();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black gap-10">
      <div className="w-100 h-100 border-4 border-white rounded-full flex items-center justify-center">
        <div className="text-white flex flex-col justify-center items-center gap-10">
          <div className="font-bold text-[100px]">{timer}</div>
          <button className="mt-2 px-4 py-1 bg-white text-black rounded cursor-pointer" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
      <button className="">
        {state === "idle" || state === "paused" ? (
          <FaPlay className="text-white text-5xl cursor-pointer" onClick={startTimer}/>
        ) : (
          <FaPause className="text-white text-5xl cursor-pointer" onClick={pauseTimer} />
        )}
      </button>
    </div>
  );
};

export default Timer;
