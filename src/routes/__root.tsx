import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex bg-black text-white font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 p-4 border-r border-gray-800 bg-gray-900">
        <h1 className="text-xl font-bold mb-4 text-white">Navigation</h1>
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            About
          </Link>
          <Link
            to="/toggle/using-usestate"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Toggle using useState
          </Link>
          <Link
            to="/toggle/using-usereducer"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Toggle using useReducer
          </Link>

          <Link
            to="/toggle/using-usereducermachine"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Toggle using useReducer and Machine Object
          </Link>

          <hr />
          <Link
            to="/toggle/using-xstate"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Toggle using XState
          </Link>

          <Link
            to="/timer/using-xstate-timer"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Timer using XState
          </Link>

          <hr />

          <Link
            to="/cheatsheet/Counter"
            className="[&.active]:font-bold hover:text-gray-300 transition"
          >
            Counter
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  ),
});
