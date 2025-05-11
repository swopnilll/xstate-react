import { useReducer, useRef } from "react";

// Alarm status type
export type AlarmStatus = "inactive" | "pending" | "active";

// Timeout ref type
type TimeoutRef = ReturnType<typeof setTimeout> | null;

const alarmReducer = (state: any, event: any) => {
  switch (state) {
    case "inactive":
      if (event.type === "TOGGLE") {
        return "pending";
      }

      return state;

    case "pending":
      if (event.type === "TOGGLE") {
        return "inactive";
      }

      if (event.type === "SUCCESS") {
        return "active";
      }

      if (event.type === "FAILURE") {
        return "inactive";
      }

      return state;

    case "active":
      if (event.type === "TOGGLE") {
        return "inactive";
      }
      return state;
    default:
      throw new Error(`Unhandled state: ${state}`);
  }
};

export const useAlarmToggleReducer = () => {
  const [status, dispatch] = useReducer(alarmReducer, "inactive");

  const timeoutRef = useRef<TimeoutRef>(null);

  const toggleAlarm = (): void => {
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
