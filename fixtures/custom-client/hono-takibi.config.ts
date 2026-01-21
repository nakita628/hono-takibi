import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes.ts',
  },
  rpc: {
    output: 'rpc.ts',
    import: './client',
    client: 'authClient',
  },
  type: {
    output: 'types.ts',
  },
})
