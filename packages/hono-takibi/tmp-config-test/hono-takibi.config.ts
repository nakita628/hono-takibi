export default {
  input: 'openapi.json',
  routes: { output: 'src/routes', split: true },
  components: {
    examples: { output: 'src/examples', split: true, import: '@/examples' },
  },
}