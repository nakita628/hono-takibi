export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      schemas: { output: 'src/schemas', split: true, import: '@/schemas' },
      parameters: { output: 'src/parameters', split: true, import: '@/parameters' },
    },
  },
}