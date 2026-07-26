import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/users.yaml',
  rpc: {
    output: '../../__generated__/rpc/rpc.ts',
    import: '../../hosts/users-client',
    parseResponse: true,
  },
})
