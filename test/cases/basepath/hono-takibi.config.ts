import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/petstore.yaml',
  basePath: '/api/v3',
  output: '../../__generated__/basepath/routes.ts',
  mock: {
    output: '../../__generated__/basepath/mock.ts',
  },
})
