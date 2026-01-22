import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Todo } from '@/api/routes'
import { deleteApiTodoId, getApiTodo, postApiTodo, putApiTodoId } from '@/rpc'

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newContent, setNewContent] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchTodos = useCallback(async () => {
    const res = await getApiTodo({ query: {} })
    if (res.status === 200) {
      const data = await res.json()
      setTodos(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleAddTodo = useCallback(async () => {
    if (!newContent.trim()) return
    await postApiTodo({ json: { content: newContent } })
    setNewContent('')
    fetchTodos()
  }, [newContent, fetchTodos])

  const handleToggleTodo = useCallback(
    async (id: string, completed: number) => {
      await putApiTodoId({
        param: { id },
        json: { completed: completed === 0 ? 1 : 0 },
      })
      fetchTodos()
    },
    [fetchTodos],
  )

  const handleRemoveTodo = useCallback(
    async (id: string) => {
      await deleteApiTodoId({ param: { id } })
      fetchTodos()
    },
    [fetchTodos],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddTodo()
      }
    },
    [handleAddTodo],
  )

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center'>
        <div className='text-gray-600 text-lg'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-6'>
          <Link
            to='/'
            className='inline-flex items-center text-orange-600 hover:text-orange-700 font-medium'
          >
            <span className='mr-1'>←</span> Back to Home
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6'>All Todos</h1>

          <div className='flex gap-2 mb-6'>
            <input
              type='text'
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Add a new task...'
              className='flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow'
              maxLength={140}
            />
            <button
              type='button'
              onClick={handleAddTodo}
              className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50'
              disabled={!newContent.trim()}
            >
              Add
            </button>
          </div>

          {todos.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-400 text-lg'>No todos yet</p>
              <p className='text-gray-400 text-sm mt-1'>Add your first task above</p>
            </div>
          ) : (
            <ul className='space-y-2'>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group'
                >
                  <input
                    type='checkbox'
                    checked={todo.completed === 1}
                    onChange={() => handleToggleTodo(todo.id, todo.completed)}
                    className='w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer accent-orange-500'
                  />
                  <Link
                    to={`/todos/${todo.id}`}
                    className={`flex-1 ${
                      todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'
                    } hover:text-orange-600 transition-colors`}
                  >
                    {todo.content}
                  </Link>
                  <button
                    type='button'
                    onClick={() => handleRemoveTodo(todo.id)}
                    className='text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1'
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className='mt-6 pt-4 border-t border-gray-100'>
            <p className='text-gray-400 text-sm text-center'>
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
