import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import type { Todo } from '@/api/routes'
import { deleteTodoId, getTodo, postTodo } from '@/rpc'

function App() {
  const [content, setContent] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTodos = useCallback(async () => {
    const res = await getTodo({ query: {} })
    if (res.status === 200) {
      const data = await res.json()
      setTodos(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const res = await postTodo({ json: { content } })
    if (res.ok) {
      setContent('')
      fetchTodos()
    }
  }

  const handleRemoveTodo = async (id: string) => {
    await deleteTodoId({ param: { id } })
    fetchTodos()
  }

  const recentTodos = useMemo(() => todos.slice(0, 5), [todos])

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-gray-800 mb-2'>
            <span className='text-orange-500'>Hono</span> Todo
          </h1>
          <p className='text-gray-600'>Fast and lightweight task management</p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6 mb-6'>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-2'>
              <input
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='What needs to be done?'
                className='flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow'
                maxLength={140}
              />
              <button
                type='submit'
                className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={!content.trim()}
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>Recent Todos</h2>
            <Link to='/todos' className='text-orange-500 hover:text-orange-600 font-medium text-sm'>
              View All
            </Link>
          </div>

          {loading ? (
            <div className='text-center py-8'>
              <div className='text-gray-400'>Loading...</div>
            </div>
          ) : todos.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-400'>No todos yet</p>
              <p className='text-gray-400 text-sm mt-1'>Add your first task above</p>
            </div>
          ) : (
            <ul className='space-y-2'>
              {recentTodos.map((todo) => (
                <li
                  key={todo.id}
                  className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group'
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      todo.completed === 1 ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                  />
                  <Link
                    to={`/todos/${todo.id}`}
                    className={`flex-1 ${
                      todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-700'
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

          {todos.length > 5 ? (
            <div className='mt-4 pt-4 border-t border-gray-100 text-center'>
              <Link
                to='/todos'
                className='text-orange-500 hover:text-orange-600 font-medium text-sm'
              >
                + {todos.length - 5} more todos
              </Link>
            </div>
          ) : null}
        </div>

        <div className='mt-6 text-center text-gray-400 text-sm'>Powered by Hono</div>
      </div>
    </div>
  )
}

export default App
