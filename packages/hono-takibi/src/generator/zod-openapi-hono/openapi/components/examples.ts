import { makeConst } from '../../../../helper/code.js'
import { makeRef } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'

// Example type that can be either inline value or $ref reference
type ExampleOrRef = {
  readonly $ref?: string
  readonly summary?: string
  readonly description?: string
  readonly dataValue?: unknown
  readonly serializedValue?: string
  readonly externalValue?: string
  readonly value?: unknown
}

/**
 * Generates TypeScript code for OpenAPI example components.
 *
 * Handles both inline examples and $ref references to other examples.
 * When an example references another example via $ref, it generates
 * a variable reference instead of duplicating the value.
 *
 * @param components - OpenAPI components object
 * @param exportExamples - Whether to export the example constants
 * @returns Generated TypeScript code string
 */
export function examplesCode(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  // Cast to allow $ref property (OpenAPI spec allows references in examples)
  const examplesWithRef = examples as { readonly [k: string]: ExampleOrRef }

  // Sort examples to ensure referenced examples are defined first
  const exampleNames = Object.keys(examplesWithRef)
  const sortedNames = sortExamplesByDependency(examplesWithRef, exampleNames)

  return sortedNames
    .map((k) => {
      const example = examplesWithRef[k]
      // Handle $ref to another example
      if (example.$ref) {
        return `${makeConst(exportExamples, k, 'Example')}${makeRef(example.$ref)}`
      }
      return `${makeConst(exportExamples, k, 'Example')}${JSON.stringify(example)}`
    })
    .join('\n\n')
}

/**
 * Sorts example names so that referenced examples come before referencing ones.
 * Uses topological sort to handle dependency order.
 */
function sortExamplesByDependency(
  examples: { readonly [k: string]: ExampleOrRef },
  names: readonly string[],
): readonly string[] {
  const deps = new Map<string, readonly string[]>()

  for (const name of names) {
    const example = examples[name]
    if (example.$ref?.startsWith('#/components/examples/')) {
      const refName = example.$ref.split('/').at(-1)
      if (refName && names.includes(refName)) {
        deps.set(name, [refName])
      } else {
        deps.set(name, [])
      }
    } else {
      deps.set(name, [])
    }
  }

  // Topological sort
  const sorted: string[] = []
  const visited = new Set<string>()
  const visiting = new Set<string>()

  const visit = (name: string): void => {
    if (visited.has(name)) return
    if (visiting.has(name)) return // Circular dependency, skip
    visiting.add(name)
    for (const dep of deps.get(name) ?? []) {
      visit(dep)
    }
    visiting.delete(name)
    visited.add(name)
    sorted.push(name)
  }

  for (const name of names) {
    visit(name)
  }

  return sorted
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

    it('should generate example with $ref to another example', () => {
      const components: Components = {
        examples: {
          BaseExample: {
            dataValue: { id: 1, name: 'Base' },
            serializedValue: '{"id":1,"name":"Base"}',
            value: { id: 1, name: 'Base' },
          },
          AliasExample: {
            $ref: '#/components/examples/BaseExample',
          },
          // biome-ignore lint/suspicious/noExplicitAny: test data with $ref
        } as any,
      }
      const result = examplesCode(components, true)
      // BaseExample should come first (dependency order)
      expect(result).toContain('export const BaseExample=')
      expect(result).toContain('export const AliasExample=BaseExample')
      expect(result.indexOf('BaseExample=')).toBeLessThan(result.indexOf('AliasExample='))
    })

    it('should handle multiple $ref examples with correct dependency order', () => {
      const components: Components = {
        examples: {
          // Defined in reverse order to test sorting
          ThirdExample: {
            $ref: '#/components/examples/SecondExample',
          },
          SecondExample: {
            $ref: '#/components/examples/FirstExample',
          },
          FirstExample: {
            dataValue: { data: 'first' },
            serializedValue: '{"data":"first"}',
            value: { data: 'first' },
          },
          // biome-ignore lint/suspicious/noExplicitAny: test data with $ref
        } as any,
      }
      const result = examplesCode(components, true)
      const lines = result.split('\n\n')
      // First → Second → Third order
      expect(lines[0]).toContain('FirstExample')
      expect(lines[1]).toContain('SecondExample')
      expect(lines[2]).toContain('ThirdExample')
    })

    it('should handle mixed inline and $ref examples', () => {
      const components: Components = {
        examples: {
          RefExample: {
            $ref: '#/components/examples/InlineExample',
          },
          InlineExample: {
            dataValue: 'inline',
            serializedValue: '"inline"',
            value: 'inline',
          },
          AnotherInline: {
            dataValue: 'another',
            serializedValue: '"another"',
            value: 'another',
          },
          // biome-ignore lint/suspicious/noExplicitAny: test data with $ref
        } as any,
      }
      const result = examplesCode(components, true)
      // InlineExample should come before RefExample
      expect(result).toContain('export const InlineExample=')
      expect(result).toContain('export const RefExample=InlineExample')
      expect(result.indexOf('InlineExample=')).toBeLessThan(result.indexOf('RefExample='))
    })
  })
}
