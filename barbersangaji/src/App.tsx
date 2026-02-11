import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

// Tambahkan properti basepath di sini:
const router = createRouter({ 
  routeTree,
  basepath: "/sangaji" // <--- WAJIB DITAMBAHKAN
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}