import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'main.tsp',
  output: 'src/routes/index.ts',
  exportSchemas: true,
  template: {
    test: true,
  },
})
