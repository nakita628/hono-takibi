import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import {
  getGetApiTodoQueryKey,
  useDeleteApiTodoId,
  useGetApiTodo,
  usePostApiTodo,
  usePutApiTodoId,
} from '@/hooks/tanstack-query'
import type { Todo } from '@/lib'

export const Route = createFileRoute('/todos')({
  component: TodosPage,
})

function TodosPage() {
  const [newContent, setNewContent] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading } = useGetApiTodo({ query: {} })
  const todos: Todo[] = Array.isArray(data) ? data : []

  const { mutateAsync: createTodo } = usePostApiTodo()
  const { mutateAsync: updateTodo } = usePutApiTodoId()
  const { mutateAsync: deleteTodo } = useDeleteApiTodoId()

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: getGetApiTodoQueryKey({ query: {} }) })
  }, [queryClient])

  const handleAddTodo = useCallback(async () => {
    if (!newContent.trim()) return
    await createTodo({ json: { content: newContent } })
    setNewContent('')
    invalidate()
  }, [newContent, createTodo, invalidate])

  const handleToggleTodo = useCallback(
    async (id: string, completed: number) => {
      await updateTodo({ param: { id }, json: { completed: completed === 0 ? 1 : 0 } })
      invalidate()
    },
    [updateTodo, invalidate],
  )

  const handleRemoveTodo = useCallback(
    async (id: string) => {
      await deleteTodo({ param: { id } })
      invalidate()
    },
    [deleteTodo, invalidate],
  )

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-gray-600 text-lg'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6'>All Todos</h1>

          <div className='flex gap-2 mb-6'>
            <input
              type='text'
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              placeholder='Add a new task...'
              className='flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              maxLength={140}
            />
            <button
              type='button'
              onClick={handleAddTodo}
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50'
              disabled={!newContent.trim()}
            >
              Add
            </button>
          </div>

          {todos.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-400 text-lg'>No todos yet</p>
            </div>
          ) : (
            <ul className='space-y-2'>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group'
                >
                  <input
                    type='checkbox'
                    checked={todo.completed === 1}
                    onChange={() => handleToggleTodo(todo.id, todo.completed)}
                    className='w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer accent-blue-500'
                  />
                  <span
                    className={`flex-1 ${todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'}`}
                  >
                    {todo.content}
                  </span>
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
