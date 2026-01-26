import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  getGetTodoIdQueryKey,
  getGetTodoIdQueryOptions,
  getGetTodoQueryKey,
  getPutTodoIdMutationOptions,
  getDeleteTodoIdMutationOptions,
} from '@/hooks/query'

export const Route = createFileRoute('/todos/$id')({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(getGetTodoIdQueryOptions({ param: { id } })),
  component: TodoDetailPage,
})

function TodoDetailPage() {
  const { id } = Route.useParams()
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()
  const { data: todo } = useSuspenseQuery(getGetTodoIdQueryOptions({ param: { id } }))

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
    }
  }, [isEditing])

  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: getGetTodoQueryKey({ query: {} }) })
    queryClient.invalidateQueries({ queryKey: getGetTodoIdQueryKey({ param: { id } }) })
  }, [queryClient, id])

  const updateMutation = useMutation({
    ...getPutTodoIdMutationOptions(),
    onSuccess: () => {
      invalidateQueries()
      setIsEditing(false)
    },
  })

  const deleteMutation = useMutation({
    ...getDeleteTodoIdMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getGetTodoQueryKey({ query: {} }) })
      navigate({ to: '/todos' })
    },
  })

  const handleEdit = useCallback(() => {
    if (!todo || 'message' in todo) return
    setEditContent(todo.content)
    setIsEditing(true)
  }, [todo])

  const handleSave = useCallback(async () => {
    const trimmed = editContent.trim()
    if (!trimmed) return
    await updateMutation.mutateAsync({
      param: { id },
      json: { content: trimmed },
    })
  }, [id, editContent, updateMutation])

  const handleToggle = useCallback(async () => {
    if (!todo || 'message' in todo) return
    await updateMutation.mutateAsync({
      param: { id },
      json: { completed: todo.completed === 0 ? 1 : 0 },
    })
  }, [id, todo, updateMutation])

  const handleDelete = useCallback(async () => {
    await deleteMutation.mutateAsync({ param: { id } })
  }, [id, deleteMutation])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSave()
      } else if (e.key === 'Escape') {
        setIsEditing(false)
      }
    },
    [handleSave],
  )

  if (!todo || 'message' in todo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo Not Found</h1>
          <Link
            to="/todos"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Todos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            to="/todos"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <span className="mr-1">←</span> Back to Todos
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={handleToggle}
              disabled={updateMutation.isPending}
              className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                todo.completed === 1 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {todo.completed === 1 && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <div className="flex-1">
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 text-xl font-bold border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    maxLength={140}
                  />
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!editContent.trim() || updateMutation.isPending}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {updateMutation.isPending ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1
                    className={`text-2xl font-bold ${
                      todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {todo.content}
                  </h1>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  {todo.completed === 1 ? 'Completed' : 'Pending'}
                </p>
                <p>
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(todo.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated:</span>{' '}
                  {new Date(todo.updatedAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">ID:</span>{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">{todo.id}</code>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
