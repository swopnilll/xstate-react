import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import { assign, setup } from "xstate";
import { useState } from "react";

export const Route = createFileRoute("/cheatsheet/OnOff")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OnOff />;
}

const machine = setup({}).createMachine({
  id: "OnOff",
  initial: "Off",
  context: {
    value: 0,
    isConditionMet: false,
  },
  states: {
    On: {
      entry: assign({
        value: ({ context }) => context.value + 1,
        isConditionMet: ({ context }) => !context.isConditionMet,
      }),
      on: {
        TOGGLE: { target: "Off" },
      },
    },
    Off: {
      entry: () => console.log("Entered Off state"),
      on: {
        TOGGLE: { target: "On" },
      },
    },
  },
});

const OnOff = () => {
  const [state, send] = useMachine(machine);
  const [log, setLog] = useState<string[]>([]);

  const handleToggle = () => {
    const nextState = state.value === "Off" ? "On" : "Off";
    setLog((prev) => [
      `➡️ TOGGLE -> ${nextState} | value: ${state.context.value}, isConditionMet: ${state.context.isConditionMet}`,
      ...prev,
    ]);
    send({ type: "TOGGLE" });
  };

  const isOn = state.matches("On");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">🔁 On/Off State Machine</h1>

      <div
        className={`w-48 text-center py-4 rounded-lg font-semibold mb-4 transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
      >
        State: {state.value}
      </div>

      <div className="bg-gray-800 p-4 rounded-md mb-4 w-fit">
        <p className="font-medium text-lg mb-2">Context:</p>
        <ul className="space-y-1 text-sm">
          <li>
            🔢 value:{" "}
            <span className="font-semibold">{state.context.value}</span>
          </li>
          <li>
            ✅ isConditionMet:{" "}
            <span className="font-semibold">
              {state.context.isConditionMet ? "true" : "false"}
            </span>
          </li>
        </ul>
      </div>

      <button
        onClick={handleToggle}
        className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-md font-medium mb-6"
      >
        🔄 TOGGLE
      </button>

      <div className="bg-black border border-gray-700 p-4 rounded-lg max-w-xl">
        <h3 className="text-lg font-semibold mb-2">🧾 Transition Log</h3>
        <ul className="text-sm list-disc list-inside space-y-1">
          {log.map((entry, i) => (
            <li key={i} className="font-mono">
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
