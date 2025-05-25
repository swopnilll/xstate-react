# 🧠 XState for React – Cheatsheet

This cheatsheet showcases basic to intermediate usage of [XState](https://xstate.js.org/) in a modern React environment using `@xstate/react`, `@tanstack/react-router`, and functional components.

---

## ✅ 1. Counter Example – Entry Actions & Context

**Demonstrates:**
- Machine definition with context
- Entry actions to update context
- Simple state transitions
- Using `useActor` with inline machine

### 📄 `/cheatsheet/Counter`

```ts
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
        count: ({ context }) => context.count + 1,
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
```

## ✅ 2. – Fetch Dog Image (Api Call)

### Features

-   Asynchronous fetch with `invoke`
-   Loading, success, and failure states
-   `fromPromise` for async actor
-   Retry logic with event transitions

```ts
// /cheatsheet/FetchDog.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useMachine } from "@xstate/react";
import { assign, fromPromise, setup } from "xstate";
import { inspector } from "../../App";

export const Route = createFileRoute("/cheatsheet/FetchDog")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FetchDog />;
}

const fetchDogImage = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  if (!response.ok) throw new Error("HTTP error");
  const data = await response.json();
  return data.message;
};

const dogMachine = setup({
  actors: {
    fetchDogImages: fromPromise(fetchDogImage),
  },
  actions: {
    setDogImage: assign({
      image: ({ event }) => event.output,
    }),
    setError: assign({
      error: ({ event }) => event.error,
    }),
  },
}).createMachine({
  id: "dogMachine",
  initial: "loading",
  context: {
    image: null,
    error: null,
  },
  states: {
    loading: {
      invoke: {
        src: "fetchDogImages",
        onDone: {
          target: "success",
          actions: "setDogImage",
        },
        onError: {
          target: "failure",
          actions: "setError",
        },
      },
    },
    success: {
      on: {
        RETRY: "loading",
      },
    },
    failure: {
      on: {
        RETRY: "loading",
      },
    },
  },
});

const FetchDog = () => {
  const [state, send] = useMachine(dogMachine, {
    inspect: inspector.inspect,
  });

  const { image } = state.context;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h1 className="text-2xl font-bold">🐶 Random Dog Image</h1>

      {state.matches("loading") && <p>Loading...</p>}

      {state.matches("success") && image && (
        <img
          src={image}
          alt="Random Dog"
          className="w-64 h-64 object-cover rounded shadow-md"
        />
      )}

      {state.matches("failure") && (
        <div>
          <p className="text-red-500">Failed to fetch image.</p>
          <button
            onClick={() => send({ type: "RETRY" })}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      {state.matches("success") && (
        <button
          onClick={() => send({ type: "RETRY" })}
          className="mt-2 px-4 py-2 bg-black text-white rounded"
        >
          ReFetch Dog Image
        </button>
      )}
    </div>
  );
};

```


