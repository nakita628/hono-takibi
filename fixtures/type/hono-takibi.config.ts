import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  type: {
    output: 'type.ts',
  }
})
