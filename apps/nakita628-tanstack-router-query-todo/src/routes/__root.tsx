import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  ErrorComponent,
  Outlet,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface RouterContext {
  queryClient: QueryClient
}

function RootLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

function RootErrorComponent({ error }: { error: Error }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">An unexpected error occurred.</p>
          <details className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto whitespace-pre-wrap">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => router.invalidate()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  errorComponent: RootErrorComponent,
})