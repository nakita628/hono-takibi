import { makeConst } from '../../../../helper/code.js'
import type { Components } from '../../../../openapi/index.js'

export function examplesCode(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  return Object.keys(examples)
    .map((k) => {
      return `${makeConst(exportExamples, k, 'Example')}${JSON.stringify(examples[k])}`
    })
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/examples.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('examplesCode', () => {
    it('should return empty string when no examples', () => {
      const components: Components = {}
      expect(examplesCode(components, true)).toBe('')
    })

    it('should generate example with export', () => {
      const components: Components = {
        examples: {
          UserExample: {
            summary: 'Example user',
            dataValue: { id: 1, name: 'John' },
            serializedValue: '{"id":1,"name":"John"}',
            value: { id: 1, name: 'John' },
          },
        },
      }
      const result = examplesCode(components, true)
      expect(result).toBe(
        `export const UserExample={"summary":"Example user","dataValue":{"id":1,"name":"John"},"serializedValue":"{\\"id\\":1,\\"name\\":\\"John\\"}","value":{"id":1,"name":"John"}}`,
      )
    })

    it('should generate example without export', () => {
      const components: Components = {
        examples: {
          SimpleExample: {
            dataValue: 'test',
            serializedValue: '"test"',
            value: 'test',
          },
        },
      }
      const result = examplesCode(components, false)
      expect(result).toBe(
        `const SimpleExample={"dataValue":"test","serializedValue":"\\"test\\"","value":"test"}`,
      )
    })
  })
}
