import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/users.yaml',
  rpc: {
    output: '../../__generated__/custom-client/rpc.ts',
    import: '../../hosts/users-auth-client',
    client: 'authClient',
    parseResponse: true,
  },
})
