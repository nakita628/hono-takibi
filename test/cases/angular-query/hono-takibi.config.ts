import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  'angular-query': {
    output: '../../__generated__/angular-query/hooks.ts',
    import: '../../hosts/users-client',
  },
})
