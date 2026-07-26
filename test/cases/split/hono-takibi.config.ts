import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/split.yaml',
  routes: { output: '../../__generated__/split/routes', split: true },
  webhooks: { output: '../../__generated__/split/webhooks', split: true },
  components: {
    schemas: { output: '../../__generated__/split/schemas', split: true, exportTypes: true },
    parameters: { output: '../../__generated__/split/parameters', split: true, exportTypes: true },
    securitySchemes: { output: '../../__generated__/split/securitySchemes', split: true },
    requestBodies: { output: '../../__generated__/split/requestBodies', split: true },
    responses: { output: '../../__generated__/split/responses', split: true },
    headers: { output: '../../__generated__/split/headers', split: true, exportTypes: true },
    examples: { output: '../../__generated__/split/examples', split: true },
    links: { output: '../../__generated__/split/links', split: true },
    callbacks: { output: '../../__generated__/split/callbacks', split: true },
    pathItems: { output: '../../__generated__/split/pathItems', split: true },
  },
})
