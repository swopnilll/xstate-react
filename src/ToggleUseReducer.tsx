import Switch from "react-switch";
import { useAlarmToggleReducer } from "./hooks/toggleAlarm/useAlarmToggleReducer";



export const ToggleUseReducer = () => {
  const {status, toggleAlarm} = useAlarmToggleReducer();

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gray-500`} >
      <div className={`${status === "pending" ? "opacity-50" : ""}`}>
        <Switch onChange={toggleAlarm} checked={status === 'active'} />
      </div>
    </div>
  );
};
