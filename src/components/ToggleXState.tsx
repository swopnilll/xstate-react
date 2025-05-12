import Switch from "react-switch";
import { useAlarmToggleMachine } from "../xstate/ToggleAlarmMachine";



export const ToggleXState = () => {
  const {status, toggleAlarm} = useAlarmToggleMachine();


  return (
    <div className={`flex flex-col items-center justify-center h-screen bg-gray-500`} >
      <div className={`${status === "pending" ? "opacity-50" : ""}`}>
        <Switch onChange={toggleAlarm} checked={status === 'active'} />
      </div>
    </div>
  );
};
