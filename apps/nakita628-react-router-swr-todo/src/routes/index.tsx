import { memo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useSWRConfig } from 'swr'
import type { Todo } from '@/api/routes'
import { getGetTodoKey, useDeleteTodoId, useGetTodo, usePostTodo, usePutTodoId } from '@/hooks/swr'
import { formatDate } from '@/utils'

const rows = 10

const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo
  onToggle: (id: string, completed: number) => void
  onDelete: (id: string) => void
}) {
  return (
    <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group">
      <input
        type="checkbox"
        checked={todo.completed === 1}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer accent-orange-500"
      />
      <div className="flex-1 min-w-0">
        <Link
          to={`/${todo.id}`}
          className={`block truncate ${
            todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'
          } hover:text-orange-600 transition-colors`}
        >
          {todo.content}
        </Link>
        <span className="text-xs text-gray-400">{formatDate(todo.createdAt)}</span>
      </div>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1"
      >
        Delete
      </button>
    </li>
  )
})

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const { mutate } = useSWRConfig()

  const { data: todos = [], isLoading, error } = useGetTodo({ query: { page, rows } })
  const hasMore = todos.length === rows

  const { trigger: createTodo } = usePostTodo()
  const { trigger: updateTodo } = usePutTodoId()
  const { trigger: deleteTodo } = useDeleteTodoId()

  const revalidate = () => mutate(getGetTodoKey({ query: { page, rows } }))

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('content') as HTMLInputElement
    const trimmed = input.value.trim()
    if (!trimmed) return
    await createTodo({ json: { content: trimmed } })
    input.value = ''
    setSearchParams({ page: '1' })
    mutate(getGetTodoKey({ query: { page: 1, rows } }))
  }

  const handleToggle = async (id: string, completed: number) => {
    await updateTodo({ param: { id }, json: { completed: completed === 0 ? 1 : 0 } })
    revalidate()
  }

  const handleDelete = async (id: string) => {
    await deleteTodo({ param: { id } })
    revalidate()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Failed to load todos</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Hono + SWR</h1>
          <p className="text-gray-600">Todo App with React Router & Kysely</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              name="content"
              placeholder="Add a new task..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              maxLength={140}
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Add
            </button>
          </form>

          {todos.length === 0 && page === 1 ? (
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
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSearchParams({ page: String(Math.max(1, page - 1)) })}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-500 text-sm">Page {page}</span>
                <button
                  type="button"
                  onClick={() => setSearchParams({ page: String(page + 1) })}
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
