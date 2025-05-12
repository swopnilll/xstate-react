import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {  createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import './index.css'
import App from './App.tsx'

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
