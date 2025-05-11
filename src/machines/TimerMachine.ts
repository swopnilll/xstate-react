import { useReducer, useRef, useState } from "react";

const timerMachine: any = {
  initial: "",
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
        RESET: "idle",
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
      },
    },
  },
};

const timerMachineUtil = (state: string, event: { type: string }) => {
  const nextState = timerMachine.states[state].on[event.type] || state;

  return nextState;
};

export const useTimerToggleReducerMachine = () => {
  const [state, dispatch] = useReducer(timerMachineUtil, "idle");

  const pausedTime = useRef(0);

  const intervalReference = useRef<any>(null);

  const [timer, setTimer] = useState(0);

  const clickHandler = () => {
    dispatch({ type: "TOGGLE" });
  };

  const startTimer = () => {
    dispatch({ type: "TOGGLE" });
    intervalReference.current = setInterval(
      () => setTimer((prev) => prev + 1),
      1000
    );
  };

  const pauseTimer = () => {
    dispatch({ type: "TOGGLE" });

    pausedTime.current = timer;

    clearInterval(intervalReference.current);
  };

  const resetTimer = () => {
    setTimer(0);
    dispatch({ type: "RESET" });
    clearInterval(intervalReference.current);
  };

  return {
    state,
    clickHandler,
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
