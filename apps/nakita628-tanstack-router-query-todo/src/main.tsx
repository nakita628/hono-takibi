import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { routeTree } from './routeTree.gen'

// const router = createRouter({ routeTree })

// Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

const rootElement = document.getElementById('root')
const root = rootElement ? createRoot(rootElement) : console.error('Root element not found')

if (root) {
  root.render(
    <StrictMode>
      <div>Hello World</div>
      {/* <RouterProvider router={router} /> */}
    </StrictMode>,
  )
}