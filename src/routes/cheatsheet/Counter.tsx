import { createFileRoute } from "@tanstack/react-router";

import { setup, assign } from "xstate";
import { useActor } from "@xstate/react";

export const Route = createFileRoute("/cheatsheet/Counter")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Counter />;
}

const toggleMachine = setup({}).createMachine({
  id: "toggle",
  initial: "active",
  context: { count: 0 },
  states: {
    active: {
      entry: assign({
        count: ({context}) => context.count + 1,
      }),  
      on: {
        TOGGLE: { target: "inactive" },
      },
    },
    inactive: {
      on: {
        TOGGLE: { target: "active" },
      },
    },
  },
});

const Counter = () => {
  const [state, send] = useActor(toggleMachine);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-4 text-black mt-4">
        Counter Example
      </h1>
      <div style={{ padding: "20px" }}>
        <h2>State: {state.value}</h2>
        <p>Active count: {state.context.count}</p>
        <button onClick={() => send({ type: "TOGGLE" })}>Toggle</button>
      </div>
    </div>
  );
};
