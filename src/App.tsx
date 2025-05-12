import { RouterProvider } from '@tanstack/react-router'
import { router } from './main'
import { createBrowserInspector } from '@statelyai/inspect'

export const inspector = createBrowserInspector()

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
