import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  'preact-query': {
    output: '../../__generated__/preact-query/hooks.ts',
    import: '../../hosts/users-client',
  },
})
