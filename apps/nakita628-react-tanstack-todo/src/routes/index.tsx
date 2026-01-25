import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className='py-12 px-4'>
      <div className='max-w-2xl mx-auto text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Todo App</h1>
        <p className='text-gray-600 mb-8'>Built with TanStack Router + TanStack Query</p>
        <Link
          to='/todos'
          className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors'
        >
          View Todos
        </Link>
      </div>
    </div>
  )
}
