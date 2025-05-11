import Switch from "react-switch";
import { useAlarmToggleReducerMachine } from "./machines/AlarmMachine";




export const ToggleUseReducerMachine = () => {
  const {status, toggleAlarm} = useAlarmToggleReducerMachine();

  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gray-500`} >
      <div className={`${status === "pending" ? "opacity-50" : ""}`}>
        <Switch onChange={toggleAlarm} checked={status === 'active'} />
      </div>
    </div>
  );
};
