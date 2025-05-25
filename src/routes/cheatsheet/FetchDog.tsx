import { createFileRoute } from "@tanstack/react-router";
import { useActor, useMachine } from "@xstate/react";
import { assign, fromPromise, setup } from "xstate";
import { inspector } from "../../App";

export const Route = createFileRoute("/cheatsheet/FetchDog")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FetchDog />;
}

const fetchDogImage = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.message; // Return the image URL
  } catch (error) {
    throw new Error("Failed to fetch dog image");
  }
};

const dogMachine = setup({
  actors: {
    fetchDogImages: fromPromise(async () => {
      return fetchDogImage();
    }),
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

  console.log("Current state:", state.value);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <h1>Fetch Dog</h1>
      <div className="flex flex-col items-center justify-center bg-gray-100 text-black gap-4">
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
    </div>
  );
};
