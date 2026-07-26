import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/all-features.yaml',
  rpc: {
    output: '../../__generated__/all-features-parse-response/rpc.ts',
    import: '../all-features/client',
    parseResponse: true,
  },
})
