import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/users.yaml',
  'tanstack-query': {
    split: true,
    output: '../../__generated__/tanstack-query-split',
    import: '../../hosts/users-client',
  },
})
