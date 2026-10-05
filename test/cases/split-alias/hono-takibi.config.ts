import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/split-alias.yaml',
  // The directory of the app entry is `src`: every generated file in it imports the others
  // under the alias, `~/components/schemas` for `src/components/schemas`.
  pathAlias: '~/',
  routes: { output: '../../__generated__/split-alias/src/routes', split: true },
  components: {
    schemas: {
      output: '../../__generated__/split-alias/src/components/schemas',
      split: true,
      exportTypes: true,
    },
    parameters: {
      output: '../../__generated__/split-alias/src/components/parameters',
      split: true,
      exportTypes: true,
    },
    headers: {
      output: '../../__generated__/split-alias/src/components/headers',
      split: true,
      exportTypes: true,
    },
    securitySchemes: {
      output: '../../__generated__/split-alias/src/components/securitySchemes',
      split: true,
    },
    requestBodies: {
      output: '../../__generated__/split-alias/src/components/requestBodies',
      split: true,
    },
    responses: {
      output: '../../__generated__/split-alias/src/components/responses',
      split: true,
    },
    examples: {
      output: '../../__generated__/split-alias/src/components/examples',
      split: true,
    },
    links: {
      output: '../../__generated__/split-alias/src/components/links',
      split: true,
    },
    callbacks: {
      output: '../../__generated__/split-alias/src/components/callbacks',
      split: true,
    },
    pathItems: {
      output: '../../__generated__/split-alias/src/components/pathItems',
      split: true,
    },
    mediaTypes: {
      output: '../../__generated__/split-alias/src/components/mediaTypes',
      split: true,
    },
  },
})
