import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/users.yaml',
  'vue-query': {
    output: '../../__generated__/vue-query/hooks.ts',
    import: '../../hosts/users-client',
  },
})
