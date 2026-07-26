import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/type.tsp',
  type: {
    readonly: true,
    output: '../../__generated__/type/type.ts',
  },
})
