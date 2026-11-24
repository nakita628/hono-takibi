import { defineConfig } from 'hono-takibi'

// The routes and the declaration file of one document: `types/type-app.ts` builds an app
// from the routes and checks that the declaration file says of it what the app says.
export default defineConfig({
  input: '../../specs/type-app.yaml',
  output: '../../__generated__/type-app/routes.ts',
  type: {
    output: '../../__generated__/type-app/type.ts',
  },
})
