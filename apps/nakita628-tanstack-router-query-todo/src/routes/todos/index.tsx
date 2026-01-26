import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { Todo } from '@/api/routes'
import {
  getGetTodoQueryKey,
  getGetTodoQueryOptions,
  getPostTodoMutationOptions,
  getPutTodoIdMutationOptions,
  getDeleteTodoIdMutationOptions,
} from '@/hooks/query'

export const Route = createFileRoute('/todos/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getGetTodoQueryOptions({ query: {} })),
  component: TodosPage,
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
        <a
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  ),
})

/** TodoItem - メモ化されたリストアイテムコンポーネント */
const TodoItem = memo(function TodoItem({
  todo,
  isEditing,
  editContent,
  isUpdatePending,
  isDeletePending,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditContentChange,
  onEditKeyDown,
}: {
  todo: Todo
  isEditing: boolean
  editContent: string
  isUpdatePending: boolean
  isDeletePending: boolean
  onToggle: (id: string, completed: number) => void
  onDelete: (id: string) => void
  onStartEdit: (todo: Todo) => void
  onSaveEdit: (id: string) => void
  onCancelEdit: () => void
  onEditContentChange: (value: string) => void
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: string) => void
}) {
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
    }
  }, [isEditing])

  const handleToggle = useCallback(() => {
    onToggle(todo.id, todo.completed)
  }, [todo.id, todo.completed, onToggle])

  const handleDelete = useCallback(() => {
    onDelete(todo.id)
  }, [todo.id, onDelete])

  const handleStartEdit = useCallback(() => {
    onStartEdit(todo)
  }, [todo, onStartEdit])

  const handleSaveEdit = useCallback(() => {
    onSaveEdit(todo.id)
  }, [todo.id, onSaveEdit])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      onEditKeyDown(e, todo.id)
    },
    [todo.id, onEditKeyDown],
  )

  return (
    <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group">
      <input
        type="checkbox"
        checked={todo.completed === 1}
        onChange={handleToggle}
        className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer accent-orange-500"
      />
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            ref={editInputRef}
            type="text"
            value={editContent}
            onChange={(e) => onEditContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-orange-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            maxLength={140}
          />
          <button
            type="button"
            onClick={handleSaveEdit}
            disabled={!editContent.trim() || isUpdatePending}
            className="text-green-600 hover:text-green-700 font-medium px-2"
          >
            {isUpdatePending ? '...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-gray-500 hover:text-gray-700 font-medium px-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            onDoubleClick={handleStartEdit}
            className={`flex-1 cursor-pointer ${
              todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
            title="Double-click to edit"
          >
            {todo.content}
          </span>
          <Link
            to="/todos/$id"
            params={{ id: todo.id }}
            className="text-orange-400 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeletePending}
            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1"
          >
            Delete
          </button>
        </>
      )}
    </li>
  )
})

function TodosPage() {
  const [newContent, setNewContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const queryClient = useQueryClient()

  const { data } = useSuspenseQuery(getGetTodoQueryOptions({ query: {} }))
  const todos: Todo[] = Array.isArray(data) ? data : []

  const invalidateTodos = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: getGetTodoQueryKey({ query: {} }) })
  }, [queryClient])

  const createMutation = useMutation({
    ...getPostTodoMutationOptions(),
    onSuccess: invalidateTodos,
  })

  const updateMutation = useMutation({
    ...getPutTodoIdMutationOptions(),
    onSuccess: () => {
      invalidateTodos()
      setEditingId(null)
    },
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

  const handleStartEdit = useCallback((todo: Todo) => {
    setEditingId(todo.id)
    setEditContent(todo.content)
  }, [])

  const handleSaveEdit = useCallback(
    async (id: string) => {
      const trimmed = editContent.trim()
      if (!trimmed) return
      await updateMutation.mutateAsync({
        param: { id },
        json: { content: trimmed },
      })
    },
    [editContent, updateMutation],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingId(null)
    setEditContent('')
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      handleAddTodo()
    },
    [handleAddTodo],
  )

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
      if (e.key === 'Enter') {
        handleSaveEdit(id)
      } else if (e.key === 'Escape') {
        handleCancelEdit()
      }
    },
    [handleSaveEdit, handleCancelEdit],
  )

  const handleEditContentChange = useCallback((value: string) => {
    setEditContent(value)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <span className="mr-1">←</span> Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Todos</h1>

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
              disabled={!newContent.trim() || createMutation.isPending}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {createMutation.isPending ? 'Adding...' : 'Add'}
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No todos yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first task above</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  editContent={editContent}
                  isUpdatePending={updateMutation.isPending}
                  isDeletePending={deleteMutation.isPending}
                  onToggle={handleToggleTodo}
                  onDelete={handleRemoveTodo}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  onEditContentChange={handleEditContentChange}
                  onEditKeyDown={handleEditKeyDown}
                />
              ))}
            </ul>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-gray-400 text-sm text-center">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
