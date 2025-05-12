import { useMachine } from "@xstate/react";
import {  useRef } from "react";
import { createMachine } from "xstate";
import { inspector } from "../App";


// Timeout ref type
type TimeoutRef = ReturnType<typeof setTimeout> | null;

type State = 'inactive' | 'pending' | 'active';
type Event = { type: 'TOGGLE' } | { type: 'SUCCESS' } | { type: "FAILURE" };

export const alarmMachine: any = createMachine({
    initial: "inactive",
    states: {
        inactive: {
            on: {
                TOGGLE: "pending"
            }
        },
        pending: {
            on: {
                SUCCESS: "active",
                FAILURE: "inactive"
            }
        },
        active: {
            on: {
                TOGGLE: "inactive"
            }
        }
    }
});

export const useAlarmToggleMachine = () => {
  const [state, send] = useMachine(alarmMachine, {inspect: inspector.inspect});

  const status = state.value as State;

  const timeoutRef = useRef<TimeoutRef>(null);

  const toggleAlarm = () => {
    if (status === "inactive") {
      send({ type: "TOGGLE" });

      timeoutRef.current = setTimeout(() => {
        send({ type: "SUCCESS" });
      }, 2000);
    } else if (status === "pending") {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
        send({ type: "FAILURE" });
    } else {
        send({ type: "TOGGLE" });
    }
  };

  return { status, toggleAlarm };
};


