import { defineConfig } from 'hono-takibi'

// Split outputs across two packages: the schemas are a package of their own, everything
// else is in the server's. Files in the server import the schemas by their package and one
// another relatively; the schemas import nothing of the server. The two package.json files
// come from seed/, so each directory is a package when the generator runs.
export default defineConfig({
  input: '../../specs/split.yaml',
  routes: { output: '../../__generated__/split-package/server/src/routes', split: true },
  webhooks: { output: '../../__generated__/split-package/server/src/webhooks', split: true },
  components: {
    schemas: {
      output: '../../__generated__/split-package/schemas',
      split: true,
      exportTypes: true,
      package: '@fixtures/split-package-schemas',
    },
    parameters: { output: '../../__generated__/split-package/server/src/parameters', split: true },
    securitySchemes: {
      output: '../../__generated__/split-package/server/src/securitySchemes',
      split: true,
    },
    requestBodies: {
      output: '../../__generated__/split-package/server/src/requestBodies',
      split: true,
    },
    responses: { output: '../../__generated__/split-package/server/src/responses', split: true },
    headers: { output: '../../__generated__/split-package/server/src/headers', split: true },
    examples: { output: '../../__generated__/split-package/server/src/examples', split: true },
    links: { output: '../../__generated__/split-package/server/src/links', split: true },
    callbacks: { output: '../../__generated__/split-package/server/src/callbacks', split: true },
    pathItems: { output: '../../__generated__/split-package/server/src/pathItems', split: true },
  },
})
