import { makeConst, sortExamplesByDependency } from '../../../../helper/code.js'
import { makeRef } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI example components.
 *
 * Handles both inline examples and $ref references to other examples.
 * When an example references another example via $ref, it generates
 * a variable reference instead of duplicating the value.
 *
 * ## Complete Example: $ref with Sibling Properties
 *
 * ### Step 1: Input OpenAPI (YAML)
 *
 * ```yaml
 * openapi: 3.1.0
 * info:
 *   title: Ref siblings demo
 *   version: 1.0.0
 *
 * components:
 *   examples:
 *     UserMinimal:
 *       summary: Minimal user
 *       value:
 *         id: "01J1K9N3E6R6ZK7Z6B0Q9Q3H3J"
 *         name: "Jane Doe"
 *
 *     # $ref with summary/description siblings (Reference Object)
 *     UserMinimalForEmployees:
 *       $ref: "#/components/examples/UserMinimal"
 *       summary: Employee element example
 *       description: Used in Company.employees
 * ```
 *
 * ### Step 2: After SwaggerParser.bundle()
 *
 * bundle() preserves BOTH `$ref` AND sibling properties:
 *
 * ```json
 * {
 *   "UserMinimal": {
 *     "summary": "Minimal user",
 *     "value": {
 *       "id": "01J1K9N3E6R6ZK7Z6B0Q9Q3H3J",
 *       "name": "Jane Doe"
 *     }
 *   },
 *   "UserMinimalForEmployees": {
 *     "$ref": "#/components/examples/UserMinimal",
 *     "summary": "Employee element example",
 *     "description": "Used in Company.employees"
 *   }
 * }
 * ```
 *
 * ### Step 3: hono-takibi Generated TypeScript
 *
 * ```ts
 * // UserMinimal - inline example (no $ref)
 * export const UserMinimalExample = {"summary":"Minimal user","value":{"id":"01J1K9N3E6R6ZK7Z6B0Q9Q3H3J","name":"Jane Doe"}}
 *
 * // UserMinimalForEmployees - $ref with sibling properties
 * // NOTE: summary ("Employee element example") and description are IGNORED
 * // Only the $ref is resolved to a variable reference
 * export const UserMinimalForEmployeesExample = UserMinimalExample
 * ```
 *
 * ## Why Siblings Are Ignored
 *
 * **Key difference between OpenAPI versions:**
 * - OpenAPI 3.0: `$ref` must be the ONLY property; siblings should be ignored
 * - OpenAPI 3.1: Siblings (`summary`, `description`) are allowed alongside `$ref`
 *
 * **hono-takibi behavior:**
 * For clean code generation and backward compatibility, hono-takibi intentionally
 * ignores sibling properties when `$ref` is present.
 *
 * This design decision ensures:
 * 1. Compatibility with both OpenAPI 3.0 and 3.1
 * 2. Clean, minimal generated code without duplication
 * 3. Type safety through direct variable references
 *
 * ## $ref Resolution Behavior
 *
 * **Important:** `$ref` is only resolved at the top level of an example object.
 * If `$ref` appears inside the `value` property (e.g., `employees: [{ $ref: '...' }]`),
 * it will NOT be resolved - it will be serialized as a literal JSON object.
 * This is correct behavior per OpenAPI specification - the spec only supports
 * `$ref` to reference entire example objects, not nested values within `value`.
 *
 * ## Custom Extensions (x-*) Behavior
 *
 * Custom extensions like `x-extends` are NOT processed by @apidevtools/swagger-parser
 * bundle() and are treated as opaque data. For example:
 *
 * ```yaml
 * UserMinimalWithMeta:
 *   x-extends:
 *     $ref: "#/components/examples/UserMinimal"
 *   value:
 *     meta: { createdAt: "2026-01-04T00:00:00Z" }
 * ```
 *
 * Will generate:
 * ```ts
 * export const UserMinimalWithMetaExample = {
 *   "x-extends": { "$ref": "#/components/examples/UserMinimal" },
 *   "value": { "meta": { "createdAt": "2026-01-04T00:00:00Z" } }
 * }
 * ```
 *
 * The `x-extends.$ref` is NOT resolved because:
 * 1. Custom extensions (x-*) are implementation-specific per OpenAPI spec
 * 2. bundle() only resolves standard OpenAPI $ref locations
 * 3. The entire structure is serialized as-is via JSON.stringify()
 *
 * **For schema inheritance, use standard OpenAPI `allOf` instead of custom extensions.**
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B{Has examples?}
 *   B -->|No| C["Return ''"]
 *   B -->|Yes| D["Sort by dependency"]
 *   D --> E["For each example"]
 *   E --> F{Has $ref?}
 *   F -->|Yes| G["Generate: const X = RefName (siblings ignored)"]
 *   F -->|No| H["Generate: const X = JSON"]
 *   G --> I["Join with newlines"]
 *   H --> I
 *   I --> J(["Return code"])
 * ```
 *
 * @see https://swagger.io/docs/specification/v3_0/adding-examples/
 * @see https://spec.openapis.org/oas/v3.1.0#reference-object (OpenAPI 3.1 $ref behavior)
 *
 * @param components - OpenAPI components object
 * @param exportExamples - Whether to export the example constants
 * @returns Generated TypeScript code string
 */
export function examplesCode(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  // ===========================================================================
  // Type guard for $ref property (OpenAPI spec allows references in examples)
  // ===========================================================================
  //
  // GENERATOR PERSPECTIVE: $ref + sibling properties の共存時の展開
  //
  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ INPUT: OpenAPI YAML                                                     │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │ components:                                                             │
  // │   examples:                                                             │
  // │     UserMinimal:                                                        │
  // │       summary: Minimal user                                             │
  // │       value:                                                            │
  // │         id: "01J1K9N3E6R6ZK7Z6B0Q9Q3H3J"                                │
  // │         name: "Jane Doe"                                                │
  // │                                                                         │
  // │     UserMinimalForEmployees:                                            │
  // │       $ref: "#/components/examples/UserMinimal"  ← $ref                 │
  // │       summary: Employee element example          ← sibling property     │
  // │       description: Used in Company.employees     ← sibling property     │
  // └─────────────────────────────────────────────────────────────────────────┘
  //                                    ↓
  //                        SwaggerParser.bundle()
  //                                    ↓
  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ AFTER bundle(): JavaScript Object (this function receives)              │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │ examples = {                                                            │
  // │   "UserMinimal": {                                                      │
  // │     "summary": "Minimal user",                                          │
  // │     "value": { "id": "01J1K9N3E6R6ZK7Z6B0Q9Q3H3J", "name": "Jane Doe" } │
  // │   },                                                                    │
  // │   "UserMinimalForEmployees": {                                          │
  // │     "$ref": "#/components/examples/UserMinimal",  ← preserved           │
  // │     "summary": "Employee element example",        ← preserved           │
  // │     "description": "Used in Company.employees"    ← preserved           │
  // │   }                                                                     │
  // │ }                                                                       │
  // │                                                                         │
  // │ NOTE: bundle() preserves BOTH $ref AND sibling properties               │
  // └─────────────────────────────────────────────────────────────────────────┘
  //                                    ↓
  //                    examplesCode() generates TypeScript
  //                                    ↓
  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │ OUTPUT: Generated TypeScript                                            │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │ // UserMinimal - inline (no $ref) → JSON.stringify()                    │
  // │ export const UserMinimalExample = {                                     │
  // │   "summary": "Minimal user",                                            │
  // │   "value": { "id": "01J1K9N3E6R6ZK7Z6B0Q9Q3H3J", "name": "Jane Doe" }   │
  // │ }                                                                       │
  // │                                                                         │
  // │ // UserMinimalForEmployees - $ref exists → variable reference           │
  // │ // ⚠️ IGNORED: summary="Employee element example"                       │
  // │ // ⚠️ IGNORED: description="Used in Company.employees"                  │
  // │ export const UserMinimalForEmployeesExample = UserMinimalExample        │
  // └─────────────────────────────────────────────────────────────────────────┘
  //
  // WHY siblings are ignored:
  //   - OpenAPI 3.0: $ref must be the only property (siblings should be ignored)
  //   - OpenAPI 3.1: allows siblings, but for clean code generation we use only $ref
  //   - Result: direct variable reference without property spreading
  //
  // ===========================================================================
  const hasRef = (v: unknown): v is { readonly $ref: string } =>
    typeof v === 'object' && v !== null && '$ref' in v && typeof v.$ref === 'string'

  // Sort examples to ensure referenced examples are defined first
  // e.g., UserMinimal must be defined before UserMinimalForEmployees
  const exampleNames = Object.keys(examples)
  const sortedNames = sortExamplesByDependency(examples, exampleNames)

  return sortedNames
    .map((k) => {
      const example = examples[k]

      // ===========================================================================
      // Handle $ref to another example
      // ===========================================================================
      //
      // GENERATOR PERSPECTIVE: $ref resolution
      //
      // When bundle() returns an object with $ref (regardless of siblings):
      //   example = { $ref: "#/components/examples/UserMinimal",
      //               summary: "...", description: "..." }
      //
      // This code path is taken:
      //   1. hasRef(example) returns true (because $ref exists)
      //   2. makeRef("#/components/examples/UserMinimal") returns "UserMinimalExample"
      //   3. Final output: "export const UserMinimalForEmployeesExample = UserMinimalExample"
      //
      // Sibling properties (summary, description) are NOT accessed or used.
      // This is intentional for:
      //   - OpenAPI 3.0 compatibility (siblings should be ignored per spec)
      //   - Clean code generation (no object spread or property merging)
      //   - Type safety (direct variable reference)
      //
      // ===========================================================================
      if (hasRef(example)) {
        return `${makeConst(exportExamples, k, 'Example')}${makeRef(example.$ref)}`
      }

      // ===========================================================================
      // Handle inline example (no $ref)
      // ===========================================================================
      //
      // GENERATOR PERSPECTIVE: Inline serialization
      //
      // When bundle() returns an object without $ref:
      //   example = { summary: "Minimal user",
      //               value: { id: "01J1K9N3E6R6ZK7Z6B0Q9Q3H3J", name: "Jane Doe" } }
      //
      // This code path is taken:
      //   1. hasRef(example) returns false
      //   2. JSON.stringify(example) serializes the entire object
      //   3. Final output: "export const UserMinimalExample = {"summary":"...","value":{...}}"
      //
      // ===========================================================================
      return `${makeConst(exportExamples, k, 'Example')}${JSON.stringify(example)}`
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
      // BaseExample should come first (dependency order)
      expect(result).toContain('export const BaseExample=')
      expect(result).toContain('export const AliasExample=BaseExample')
      expect(result.indexOf('BaseExample=')).toBeLessThan(result.indexOf('AliasExample='))
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
      const lines = result.split('\n\n')
      // First → Second → Third order
      expect(lines[0]).toContain('FirstExample')
      expect(lines[1]).toContain('SecondExample')
      expect(lines[2]).toContain('ThirdExample')
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
      // InlineExample should come before RefExample
      expect(result).toContain('export const InlineExample=')
      expect(result).toContain('export const RefExample=InlineExample')
      expect(result.indexOf('InlineExample=')).toBeLessThan(result.indexOf('RefExample='))
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
      // Verify $ref is resolved to variable reference
      expect(result).toContain('export const UserMinimalForEmployeesExample=UserMinimalExample')
      // Verify siblings are NOT included in output
      expect(result).not.toContain('summary')
      expect(result).not.toContain('description')
    })
  })
}
