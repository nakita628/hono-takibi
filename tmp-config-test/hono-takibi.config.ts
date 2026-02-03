export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      securitySchemes: { output: 'src/security', split: true, import: '../security' },
    },
  },
}
