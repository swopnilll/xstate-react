import { useMachine } from "@xstate/react";
import { useRef, useState } from "react";
import { createMachine } from "xstate";
import { inspector } from "../App";

const timerMachine: any = createMachine({
  initial: "idle",
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
});

export const useTimerMachine = () => {
  const [state, send] = useMachine(timerMachine, {inspect: inspector.inspect});

  const intervalReference = useRef<any>(null);

  const [timer, setTimer] = useState(0);

  const clickHandler = () => {
    send({ type: "TOGGLE" });
  };

  const startTimer = () => {
    send({ type: "TOGGLE" });
    intervalReference.current = setInterval(
      () => setTimer((prev) => prev + 1),
      1000
    );
  };

  const pauseTimer = () => {
    send({ type: "TOGGLE" });

    clearInterval(intervalReference.current);
  };

  const resetTimer = () => {
    setTimer(0);
    send({ type: "RESET" });
    clearInterval(intervalReference.current);
  };

  return {
    state: state.value,
    clickHandler,
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};