import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Hono🔥 + TanStack
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Todo App with TanStack Router & Query + Drizzle ORM
        </p>
        <Link
          to="/todos"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
        >
          View Todos →
        </Link>
      </div>
    </div>
  )
}
