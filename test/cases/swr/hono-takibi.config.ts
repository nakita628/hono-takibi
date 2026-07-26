import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  swr: {
    output: '../../__generated__/swr/hooks.ts',
    import: '../../hosts/users-client',
  },
})
