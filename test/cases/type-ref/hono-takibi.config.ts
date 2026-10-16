import { defineConfig } from 'hono-takibi'

// Component schemas referred to from several operations, from each other and from
// themselves: the declaration file names each one once, and `types/type-ref.ts` reads the
// routes back through `hc` to check that what the client sees is the schema.
export default defineConfig({
  input: '../../specs/type-ref.yaml',
  type: {
    output: '../../__generated__/type-ref/type.ts',
  },
})
