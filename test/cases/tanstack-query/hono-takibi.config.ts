import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  'tanstack-query': {
    output: '../../__generated__/tanstack-query/query.ts',
    import: '../../hosts/users-client',
  },
})
