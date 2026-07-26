import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  'solid-query': {
    output: '../../__generated__/solid-query/hooks.ts',
    import: '../../hosts/users-client',
  },
})
