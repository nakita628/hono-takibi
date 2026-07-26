import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/users.yaml',
  output: '../../__generated__/path-alias/src/routes.ts',
  template: {
    routeHandler: true,
    pathAlias: '@/',
  },
})
