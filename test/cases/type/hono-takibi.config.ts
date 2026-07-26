import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/type.tsp',
  type: {
    readonly: true,
    output: '../../__generated__/type/type.ts',
  },
})
