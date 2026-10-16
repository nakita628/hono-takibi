import { defineConfig } from 'hono-takibi'

// The same document as `type-ref`, with `readonly`: `DeepReadonly` is applied over named
// schema types that refer to each other and to themselves, which tsc has to accept.
export default defineConfig({
  input: '../../specs/type-ref.yaml',
  type: {
    readonly: true,
    output: '../../__generated__/type-ref-readonly/type.ts',
  },
})
