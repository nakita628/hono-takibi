import { Link } from 'react-router'

type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center'>
        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <span className='text-red-500 text-3xl'>!</span>
        </div>
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Something went wrong</h1>
        <p className='text-gray-600 mb-6'>An unexpected error occurred. Please try again.</p>
        <div className='bg-red-50 rounded-lg p-4 mb-6 text-left'>
          <p className='text-sm text-red-700 font-mono break-all'>{error.message}</p>
        </div>
        <div className='flex gap-3 justify-center'>
          <button
            type='button'
            onClick={resetErrorBoundary}
            className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors'
          >
            Try Again
          </button>
          <Link
            to='/'
            className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
