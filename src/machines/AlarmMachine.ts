import { useReducer, useRef } from "react";


// Timeout ref type
type TimeoutRef = ReturnType<typeof setTimeout> | null;

type State = 'inactive' | 'pending' | 'active';
type Event = { type: 'TOGGLE' } | { type: 'SUCCESS' } | { type: "FAILURE" };

const alarmMachine: any = {
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
}


const alarmMachineUtil = (state: State, event: Event) => {
    const nextState = alarmMachine.states[state]
        .on[event.type] || state;

    return nextState;
}

export const useAlarmToggleReducerMachine = () => {
  const [status, dispatch] = useReducer(alarmMachineUtil, "inactive");

  const timeoutRef = useRef<TimeoutRef>(null);

  const toggleAlarm = () => {
    if (status === "inactive") {
      dispatch({ type: "TOGGLE" });

      timeoutRef.current = setTimeout(() => {
        dispatch({ type: "SUCCESS" });
      }, 2000);
    } else if (status === "pending") {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
        dispatch({ type: "FAILURE" });
    } else {
        dispatch({ type: "TOGGLE" });
    }
  };

  return { status, toggleAlarm };
};