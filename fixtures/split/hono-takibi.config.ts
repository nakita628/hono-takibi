// import { defineConfig } from 'hono-takibi/config'

// export default defineConfig({
//   input: 'openapi.yaml',
//   'zod-openapi': {
//     // output: 'src/routes/index.ts',
//     exportType: false,
//     exportSchema: false,
//     routes: {
//       output: 'src/routes',
//       split: true,
//     },
//     components: {
//       schemas: {
//         output: 'src/schemas',
//         exportType: true,
//         split: true,
//       },
//       parameters: {
//         output: 'src/parameters',
//         exportType: true,
//         split: true,
//       },
//       securitySchemes: {
//         output: 'src/securitySchemes',
//         split: true,
//       },
//       requestBodies: {
//         output: 'src/requestBodies',
//         split: true,
//       },
//       responses: {
//         output: 'src/responses',
//         split: true,
//       },
//       headers: {
//         output: 'src/headers',
//         exportType: true,
//         split: true,
//       },
//       examples: {
//         output: 'src/examples',
//         split: true,
//       },
//       links: {
//         output: 'src/links',
//         split: true,
//       },
//       callbacks: {
//         output: 'src/callbacks',
//         split: true,
//       },
//     },
//   },
// })


// import { defineConfig } from 'hono-takibi/config'

// export default defineConfig({
//   input: 'openapi.yaml',
//   'zod-openapi': {
//     // output: 'src/routes/index.ts',
//     exportType: false,
//     exportSchema: false,
//     routes: {
//       output: 'src/routes/index.ts',
//     },
//     components: {
//       schemas: {
//         output: 'src/schemas/index.ts',
//         exportType: true,
//       },
//       parameters: {
//         output: 'src/parameters/index.ts',
//         exportType: true,
//       },
//       securitySchemes: {
//         output: 'src/securitySchemes/index.ts',
//       },
//       requestBodies: {
//         output: 'src/requestBodies/index.ts',
//       },
//       responses: {
//         output: 'src/responses/index.ts',
//       },
//       headers: {
//         output: 'src/headers/index.ts',
//         exportType: true,
//       },
//       examples: {
//         output: 'src/examples/index.ts',
//       },
//       links: {
//         output: 'src/links/index.ts',
//       },
//       callbacks: {
//         output: 'src/callbacks/index.ts',
//       },
//     },
//   },
// })


import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'src/routes/index.ts',
  },
})