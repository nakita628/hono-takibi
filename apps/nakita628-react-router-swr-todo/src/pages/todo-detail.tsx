import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useSWRConfig } from 'swr'
import { getGetTodoKey, useDeleteTodoId, useGetTodoId, usePutTodoId } from '@/hooks/swr'

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
  const navigate = useNavigate()
  const { mutate } = useSWRConfig()

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
    }
  }, [isEditing])

  const {
    data: todo,
    isLoading,
    error,
    swrKey,
  } = useGetTodoId({ param: { id: id ?? '' } }, { swr: { enabled: !!id } })
  const { trigger: updateTodo, isMutating: isUpdating } = usePutTodoId()
  const { trigger: deleteTodo, isMutating: isDeleting } = useDeleteTodoId()

  const revalidate = useCallback(() => {
    if (swrKey) mutate(swrKey)
    mutate(getGetTodoKey({ query: {} }))
  }, [mutate, swrKey])

  const handleStartEdit = useCallback(() => {
    if (!todo) return
    setEditContent(todo.content)
    setIsEditing(true)
  }, [todo])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    setEditContent('')
  }, [])

  const handleSaveEdit = useCallback(async () => {
    if (!id) return
    const trimmed = editContent.trim()
    if (!trimmed) return
    await updateTodo({ param: { id }, json: { content: trimmed } })
    setIsEditing(false)
    revalidate()
  }, [id, editContent, updateTodo, revalidate])

  const handleToggleCompleted = useCallback(async () => {
    if (!(id && todo)) return
    await updateTodo({
      param: { id },
      json: { completed: todo.completed === 0 ? 1 : 0 },
    })
    revalidate()
  }, [id, todo, updateTodo, revalidate])

  const handleDelete = useCallback(async () => {
    if (!id) return
    await deleteTodo({ param: { id } })
    mutate(getGetTodoKey({ query: {} }))
    navigate('/todos')
  }, [id, deleteTodo, mutate, navigate])

  if (isLoading) {
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
            <p className='text-red-500 text-center'>Todo not found</p>
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
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold text-gray-800'>Todo Details</h1>
            <div className='flex gap-2'>
              {!isEditing && (
                <button
                  type='button'
                  onClick={handleStartEdit}
                  className='px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors'
                >
                  Edit
                </button>
              )}
              <button
                type='button'
                onClick={handleDelete}
                disabled={isDeleting}
                className='px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50'
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          <div className='space-y-6'>
            <div>
              <span className='block text-sm font-medium text-gray-500 mb-2'>ID</span>
              <p className='text-gray-700 font-mono text-sm bg-gray-50 p-3 rounded-lg break-all'>
                {todo.id}
              </p>
            </div>

            <div>
              <span className='block text-sm font-medium text-gray-500 mb-2'>Content</span>
              {isEditing ? (
                <div className='space-y-3'>
                  <input
                    ref={editInputRef}
                    type='text'
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow'
                    maxLength={140}
                  />
                  <div className='flex gap-2'>
                    <button
                      type='button'
                      onClick={handleSaveEdit}
                      disabled={isUpdating || !editContent.trim()}
                      className='px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50'
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type='button'
                      onClick={handleCancelEdit}
                      disabled={isUpdating}
                      className='px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-medium rounded-lg transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className='text-gray-800 text-lg'>{todo.content}</p>
              )}
            </div>

            <div>
              <span className='block text-sm font-medium text-gray-500 mb-2'>Status</span>
              <button
                type='button'
                onClick={handleToggleCompleted}
                disabled={isUpdating}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors hover:opacity-80 disabled:opacity-50 ${
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
                <span className='ml-2 text-xs opacity-60'>(click to toggle)</span>
              </button>
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
