// // import { defineConfig } from 'hono-takibi/config'

// // export default defineConfig({
// //   input: 'openapi.yaml',
// //   'zod-openapi': {
// //     // output: 'src/routes/index.ts',
// //     routes: {
// //       output: 'src/routes/index.ts',
// //     },
// //     components: {
// //       schemas: {
// //         output: 'src/schemas',
// //         split: true,
// //         exportTypes: true,
// //       },
// //       parameters: {
// //         output: 'src/parameters',
// //         split: true,
// //         exportTypes: true,
// //       },
// //       securitySchemes: {
// //         output: 'src/securitySchemes',
// //         split: true,
// //       },
// //       requestBodies: {
// //         output: 'src/requestBodies',
// //         split: true,
// //       },
// //       responses: {
// //         output: 'src/responses',
// //         split: true,
// //       },
// //       headers: {
// //         output: 'src/headers',
// //         exportTypes: true,
// //         split: true,
// //       },
// //       examples: {
// //         output: 'src/examples',
// //         split: true,
// //       },
// //       links: {
// //         output: 'src/links',
// //         split: true,
// //       },
// //       callbacks: {
// //         output: 'src/callbacks',
// //         split: true,
// //       },
// //     },
// //   },
// // })

import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    routes: {
      output: 'src/routes/index.ts',
    },
    components: {
      schemas: {
        output: 'src/schemas',
        split: true,
        exportTypes: true,
      },
      parameters: {
        output: 'src/parameters',
        split: true,
        exportTypes: true,
      },
      securitySchemes: {
        output: 'src/securitySchemes',
        split: true,
      },
      requestBodies: {
        output: 'src/requestBodies',
        split: true,
      },
      responses: {
        output: 'src/responses',
        split: true,
      },
      headers: {
        output: 'src/headers',
        exportTypes: true,
        split: true,
      },
      examples: {
        output: 'src/examples',
        split: true,
      },
      links: {
        output: 'src/links',
        split: true,
      },
      callbacks: {
        output: 'src/callbacks',
        split: true,
      },
    },
  },
})

// import { defineConfig } from 'hono-takibi/config'

// export default defineConfig({
//   input: 'test.yaml',
//   'zod-openapi': {
//     output: 'src/routes/index.ts',
//   },
// })
