<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import '../app.css'

  let { children } = $props()
  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-3">
        <div class="flex gap-4">
          <a href="/" class="text-green-600 hover:text-green-800 font-medium">Home</a>
          <a href="/todos" class="text-green-600 hover:text-green-800 font-medium">Todos</a>
        </div>
      </div>
    </nav>
    {@render children()}
  </div>
</QueryClientProvider>
