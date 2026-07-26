import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/split-alias.yaml',
  routes: { output: '../../__generated__/split-alias/src/routes', split: true },
  components: {
    schemas: {
      output: '../../__generated__/split-alias/src/components/schemas',
      split: true,
      exportTypes: true,
      import: '~/components/schemas',
    },
    parameters: {
      output: '../../__generated__/split-alias/src/components/parameters',
      split: true,
      exportTypes: true,
      import: '@/components/parameters',
    },
    headers: {
      output: '../../__generated__/split-alias/src/components/headers',
      split: true,
      exportTypes: true,
      import: '~/components/headers',
    },
    securitySchemes: {
      output: '../../__generated__/split-alias/src/components/securitySchemes',
      split: true,
      import: '@/components/securitySchemes',
    },
    requestBodies: {
      output: '../../__generated__/split-alias/src/components/requestBodies',
      split: true,
      import: '~/components/requestBodies',
    },
    responses: {
      output: '../../__generated__/split-alias/src/components/responses',
      split: true,
      import: '@/components/responses',
    },
    examples: {
      output: '../../__generated__/split-alias/src/components/examples',
      split: true,
      import: '~/components/examples',
    },
    links: {
      output: '../../__generated__/split-alias/src/components/links',
      split: true,
      import: '@/components/links',
    },
    callbacks: {
      output: '../../__generated__/split-alias/src/components/callbacks',
      split: true,
      import: '~/components/callbacks',
    },
    pathItems: {
      output: '../../__generated__/split-alias/src/components/pathItems',
      split: true,
      import: '@/components/pathItems',
    },
    mediaTypes: {
      output: '../../__generated__/split-alias/src/components/mediaTypes',
      split: true,
      import: '~/components/mediaTypes',
    },
  },
})
