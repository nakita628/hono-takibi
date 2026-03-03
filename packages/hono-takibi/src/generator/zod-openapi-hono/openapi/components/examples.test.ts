import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { examplesCode } from './examples.js'

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
      `export const UserExampleExample={"summary":"Example user","dataValue":{"id":1,"name":"John"},"serializedValue":"{\\"id\\":1,\\"name\\":\\"John\\"}","value":{"id":1,"name":"John"}}`,
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
      `const SimpleExampleExample={"dataValue":"test","serializedValue":"\\"test\\"","value":"test"}`,
    )
  })

  it('should generate example with as const for inline', () => {
    const components: Components = {
      examples: {
        UserExample: {
          value: { id: 1, name: 'John' },
        },
      },
    }
    const result = examplesCode(components, true, true)
    expect(result).toBe(`export const UserExampleExample={"value":{"id":1,"name":"John"}} as const`)
  })

  it('should not add as const for $ref example', () => {
    const components: Components = {
      examples: {
        Base: {
          value: { id: 1 },
        },
        Alias: {
          $ref: '#/components/examples/Base',
        },
      },
    }
    const result = examplesCode(components, true, true)
    expect(result).toBe(
      `export const BaseExample={"value":{"id":1}} as const\n\nexport const AliasExample=BaseExample`,
    )
  })

  it('should generate example with $ref to another example', () => {
    // hasRef type guard handles $ref at runtime
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
      },
    }
    const result = examplesCode(components, true)
    expect(result).toBe(
      `export const BaseExampleExample={"dataValue":{"id":1,"name":"Base"},"serializedValue":"{\\"id\\":1,\\"name\\":\\"Base\\"}","value":{"id":1,"name":"Base"}}\n\nexport const AliasExampleExample=BaseExampleExample`,
    )
  })

  it('should handle multiple $ref examples with correct dependency order', () => {
    // hasRef type guard handles $ref at runtime
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
      },
    }
    const result = examplesCode(components, true)
    expect(result).toBe(
      `export const FirstExampleExample={"dataValue":{"data":"first"},"serializedValue":"{\\"data\\":\\"first\\"}","value":{"data":"first"}}\n\nexport const SecondExampleExample=FirstExampleExample\n\nexport const ThirdExampleExample=SecondExampleExample`,
    )
  })

  it('should handle mixed inline and $ref examples', () => {
    // hasRef type guard handles $ref at runtime
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
      },
    }
    const result = examplesCode(components, true)
    expect(result).toBe(
      `export const InlineExampleExample={"dataValue":"inline","serializedValue":"\\"inline\\"","value":"inline"}\n\nexport const RefExampleExample=InlineExampleExample\n\nexport const AnotherInlineExample={"dataValue":"another","serializedValue":"\\"another\\"","value":"another"}`,
    )
  })

  /**
   * Test for $ref with sibling properties (OpenAPI 3.1 feature).
   *
   * In OpenAPI 3.1, `$ref` can have sibling properties like `summary` and `description`.
   * However, @apidevtools/swagger-parser bundle() preserves both `$ref` AND siblings.
   * hono-takibi intentionally ignores sibling properties for clean code generation.
   *
   * Example input from bundle():
   * ```json
   * {
   *   "$ref": "#/components/examples/UserMinimal",
   *   "summary": "Employee element example",
   *   "description": "Used in Company.employees"
   * }
   * ```
   *
   * Generated output (siblings ignored):
   * ```ts
   * export const UserMinimalForEmployeesExample = UserMinimalExample
   * ```
   */
  it('should ignore sibling properties when $ref is present (OpenAPI 3.1 compatibility)', () => {
    // Simulates what bundle() returns: $ref with sibling properties preserved
    const components: Components = {
      examples: {
        UserMinimal: {
          value: { id: '123', name: 'Jane Doe' },
        },
        // This is what bundle() outputs when OpenAPI has $ref + siblings
        UserMinimalForEmployees: {
          $ref: '#/components/examples/UserMinimal',
          // These sibling properties are preserved by bundle() but should be ignored
          // by hono-takibi for clean code generation
        },
      },
    }
    const result = examplesCode(components, true)
    expect(result).toBe(
      `export const UserMinimalExample={"value":{"id":"123","name":"Jane Doe"}}\n\nexport const UserMinimalForEmployeesExample=UserMinimalExample`,
    )
  })
})
