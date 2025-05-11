import Switch from "react-switch";
import { useAlarmToggle } from "./hooks/toggleAlarm/useAlarmToggle";
import { useEffect, useState } from "react";


export const ToggleUseState = () => {
  const {status, toggleAlarm} = useAlarmToggle();

  const [renderCount, setRenderCount] = useState(0);

  // Increment render count on every render
  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gray-500`} >
      <div className={`${status === "pending" ? "opacity-50" : ""}`}>
        <Switch onChange={toggleAlarm} checked={status === 'active'} />
      </div>

      <div>
        page rended {renderCount} times
      </div>

    </div>
  );
};
