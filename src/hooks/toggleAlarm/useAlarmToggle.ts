import { useState, useRef, useEffect } from "react";

// Alarm status type
export type AlarmStatus = "inactive" | "pending" | "active";

// Timeout ref type
type TimeoutRef = ReturnType<typeof setTimeout> | null;

// Hook return type
export interface UseAlarmToggleResult {
  status: AlarmStatus;
  toggleAlarm: () => void;
}

export const useAlarmToggle = (): UseAlarmToggleResult => {
  const [status, setStatus] = useState<AlarmStatus>("inactive");
  const timeoutRef = useRef<TimeoutRef>(null);

  const toggleAlarm = (): void => {
    if (status === "inactive") {
      setStatus("pending");
      timeoutRef.current = setTimeout(() => {
        setStatus("active");
        timeoutRef.current = null;
      }, 2000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setStatus("inactive");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { status, toggleAlarm };
};
