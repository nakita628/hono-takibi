import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  'svelte-query': {
    output: '../../__generated__/svelte-query/hooks.ts',
    import: '../../hosts/users-client',
  },
})
