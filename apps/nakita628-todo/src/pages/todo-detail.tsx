import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import type { Todo } from '@/api/routes'
import { getApiTodoId } from '@/rpc'

/**
 * Formats an ISO date string into a human-readable format.
 *
 * @param dateString - ISO 8601 formatted date string
 * @returns Formatted date string (e.g., "Jan 15, 2024, 10:30 AM")
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TodoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [todo, setTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) {
        setError('No ID provided')
        setLoading(false)
        return
      }

      const res = await getApiTodoId({ param: { id } })
      if (res.ok) {
        const data = await res.json()
        setTodo(data)
      } else {
        setError('Todo not found')
      }
      setLoading(false)
    }

    fetchTodo()
  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center'>
        <div className='text-gray-600 text-lg'>Loading...</div>
      </div>
    )
  }

  if (error || !todo) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4'>
        <div className='max-w-2xl mx-auto'>
          <div className='mb-6'>
            <Link
              to='/todos'
              className='inline-flex items-center text-orange-600 hover:text-orange-700 font-medium'
            >
              <span className='mr-1'>←</span> Back to Todos
            </Link>
          </div>
          <div className='bg-white rounded-2xl shadow-xl p-6'>
            <p className='text-red-500 text-center'>{error || 'Todo not found'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-6'>
          <Link
            to='/todos'
            className='inline-flex items-center text-orange-600 hover:text-orange-700 font-medium'
          >
            <span className='mr-1'>←</span> Back to Todos
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6'>Todo Details</h1>

          <div className='space-y-6'>
            <div>
              <span className='block text-sm font-medium text-gray-500 mb-2'>ID</span>
              <p className='text-gray-700 font-mono text-sm bg-gray-50 p-3 rounded-lg break-all'>
                {todo.id}
              </p>
            </div>

            <div>
              <span className='block text-sm font-medium text-gray-500 mb-2'>Content</span>
              <p className='text-gray-800 text-lg'>{todo.content}</p>
            </div>

            <div>
              <span className='block text-sm font-medium text-gray-500 mb-2'>Status</span>
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  todo.completed === 1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    todo.completed === 1 ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                />
                {todo.completed === 1 ? 'Completed' : 'Pending'}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <span className='block text-sm font-medium text-gray-500 mb-2'>Created</span>
                <p className='text-gray-700'>{formatDate(todo.createdAt)}</p>
              </div>
              <div>
                <span className='block text-sm font-medium text-gray-500 mb-2'>Updated</span>
                <p className='text-gray-700'>{formatDate(todo.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
