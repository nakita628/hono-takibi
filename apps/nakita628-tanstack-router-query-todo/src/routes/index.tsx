import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { memo, useCallback, useState } from 'react'
import type { Todo } from '@/api/routes'
import {
  getGetTodoQueryKey,
  getGetTodoQueryOptions,
  getPostTodoMutationOptions,
  getPutTodoIdMutationOptions,
  getDeleteTodoIdMutationOptions,
} from '@/hooks/query'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 0,
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ context: { queryClient }, deps: { page } }) =>
    queryClient.ensureQueryData(getGetTodoQueryOptions({ query: { offset: page * 10 } })),
  component: HomePage,
  pendingComponent: () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
      <div className="text-gray-600 text-lg">Loading...</div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Failed to load todos</h1>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  ),
})

const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo
  onToggle: (id: string, completed: number) => void
  onDelete: (id: string) => void
}) {
  const handleToggle = useCallback(() => {
    onToggle(todo.id, todo.completed)
  }, [todo.id, todo.completed, onToggle])

  const handleDelete = useCallback(() => {
    onDelete(todo.id)
  }, [todo.id, onDelete])

  return (
    <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group">
      <input
        type="checkbox"
        checked={todo.completed === 1}
        onChange={handleToggle}
        className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer accent-orange-500"
      />
      <Link
        to="/$id"
        params={{ id: todo.id }}
        className={`flex-1 ${
          todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'
        } hover:text-orange-600 transition-colors`}
      >
        {todo.content}
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1"
      >
        Delete
      </button>
    </li>
  )
})

function HomePage() {
  const [newContent, setNewContent] = useState('')
  const { page } = useSearch({ from: '/' })
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()

  const offset = page * 10
  const { data: todos } = useSuspenseQuery(
    getGetTodoQueryOptions({ query: { offset } }),
  )
  const hasMore = todos.length === 10

  const invalidateTodos = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: getGetTodoQueryKey({ query: { offset } }),
    })
  }, [queryClient, offset])

  const createMutation = useMutation({
    ...getPostTodoMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getGetTodoQueryKey({ query: { offset: 0 } }),
      })
      navigate({ to: '/', search: { page: 0 } })
    },
  })

  const updateMutation = useMutation({
    ...getPutTodoIdMutationOptions(),
    onSuccess: invalidateTodos,
  })

  const deleteMutation = useMutation({
    ...getDeleteTodoIdMutationOptions(),
    onSuccess: invalidateTodos,
  })

  const handleAddTodo = useCallback(async () => {
    const trimmed = newContent.trim()
    if (!trimmed) return
    await createMutation.mutateAsync({ json: { content: trimmed } })
    setNewContent('')
  }, [newContent, createMutation])

  const handleToggleTodo = useCallback(
    async (id: string, completed: number) => {
      await updateMutation.mutateAsync({
        param: { id },
        json: { completed: completed === 0 ? 1 : 0 },
      })
    },
    [updateMutation],
  )

  const handleRemoveTodo = useCallback(
    async (id: string) => {
      await deleteMutation.mutateAsync({ param: { id } })
    },
    [deleteMutation],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      handleAddTodo()
    },
    [handleAddTodo],
  )

  const handlePrevPage = useCallback(() => {
    navigate({ to: '/', search: { page: Math.max(0, page - 1) } })
  }, [navigate, page])

  const handleNextPage = useCallback(() => {
    navigate({ to: '/', search: { page: page + 1 } })
  }, [navigate, page])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Hono + TanStack</h1>
          <p className="text-gray-600">Todo App with TanStack Router & Query + Drizzle</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              maxLength={140}
            />
            <button
              type="button"
              onClick={handleAddTodo}
              disabled={!newContent.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              Add
            </button>
          </div>

          {todos.length === 0 && page === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No todos yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first task above</p>
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleRemoveTodo}
                  />
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={page === 0}
                  className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-500 text-sm">Page {page + 1}</span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
