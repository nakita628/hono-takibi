import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-4xl mx-auto px-4 py-3'>
          <div className='flex gap-4'>
            <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium'>
              Home
            </Link>
            <Link to='/todos' className='text-blue-600 hover:text-blue-800 font-medium'>
              Todos
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  ),
})
