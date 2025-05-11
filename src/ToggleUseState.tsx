import Switch from "react-switch";
import { useAlarmToggle } from "./hooks/toggleAlarm/useAlarmToggle";
import { useEffect, useRef, useState } from "react";


export const ToggleUseState = () => {
  const {status, toggleAlarm} = useAlarmToggle();

  const renderCount = useRef(0);

  // Increment render count on every render
  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gray-500`} >
      <div className={`${status === "pending" ? "opacity-50" : ""}`}>
        <Switch onChange={toggleAlarm} checked={status === 'active'} />
      </div>

      <div>
        page rended {renderCount.current} times
      </div>

    </div>
  );
};
