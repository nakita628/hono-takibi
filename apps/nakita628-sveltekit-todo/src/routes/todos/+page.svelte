<script lang="ts">
  import { useQueryClient } from '@tanstack/svelte-query'
  import type { Todo } from '$lib'
  import {
    createDeleteApiTodoId,
    createGetApiTodo,
    createPostApiTodo,
    createPutApiTodoId,
    getGetApiTodoQueryKey,
  } from '$lib/../hooks/svelte-query'

  let newContent = $state('')
  const queryClient = useQueryClient()

  const query = createGetApiTodo({ query: {} })
  const createTodo = createPostApiTodo()
  const updateTodo = createPutApiTodoId()
  const deleteTodo = createDeleteApiTodoId()

  const todos = $derived<Todo[]>(Array.isArray($query.data) ? $query.data : [])

  async function handleAddTodo() {
    if (!newContent.trim()) return
    await $createTodo.mutateAsync({ json: { content: newContent } })
    newContent = ''
    queryClient.invalidateQueries({ queryKey: getGetApiTodoQueryKey({ query: {} }) })
  }

  async function handleToggleTodo(id: string, completed: number) {
    await $updateTodo.mutateAsync({ param: { id }, json: { completed: completed === 0 ? 1 : 0 } })
    queryClient.invalidateQueries({ queryKey: getGetApiTodoQueryKey({ query: {} }) })
  }

  async function handleRemoveTodo(id: string) {
    await $deleteTodo.mutateAsync({ param: { id } })
    queryClient.invalidateQueries({ queryKey: getGetApiTodoQueryKey({ query: {} }) })
  }
</script>

<div class="py-8 px-4">
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">All Todos</h1>

      <div class="flex gap-2 mb-6">
        <input
          type="text"
          bind:value={newContent}
          onkeydown={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Add a new task..."
          class="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          maxlength="140"
        />
        <button
          type="button"
          onclick={handleAddTodo}
          class="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          disabled={!newContent.trim()}
        >
          Add
        </button>
      </div>

      {#if $query.isLoading}
        <div class="text-center py-12">
          <p class="text-gray-400 text-lg">Loading...</p>
        </div>
      {:else if todos.length === 0}
        <div class="text-center py-12">
          <p class="text-gray-400 text-lg">No todos yet</p>
        </div>
      {:else}
        <ul class="space-y-2">
          {#each todos as todo (todo.id)}
            <li class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors group">
              <input
                type="checkbox"
                checked={todo.completed === 1}
                onchange={() => handleToggleTodo(todo.id, todo.completed)}
                class="w-5 h-5 text-green-500 rounded focus:ring-green-500 cursor-pointer accent-green-500"
              />
              <span class="flex-1 {todo.completed === 1 ? 'line-through text-gray-400' : 'text-gray-800'}">
                {todo.content}
              </span>
              <button
                type="button"
                onclick={() => handleRemoveTodo(todo.id)}
                class="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1"
              >
                Delete
              </button>
            </li>
          {/each}
        </ul>
      {/if}

      <div class="mt-6 pt-4 border-t border-gray-100">
        <p class="text-gray-400 text-sm text-center">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
        </p>
      </div>
    </div>
  </div>
</div>
