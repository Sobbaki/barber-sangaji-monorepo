import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import 'leaflet/dist/leaflet.css'
import './theme.css'

// --- PERBAIKAN DI SINI ---
const router = createRouter({
  routeTree,
  basepath: "/"
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)