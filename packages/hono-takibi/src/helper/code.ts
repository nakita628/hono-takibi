import path from 'node:path'
import { ensureSuffix, renderNamedImport, toIdentifierPascalCase } from '../utils/index.js'

/**
 * Builds a relative module specifier from `fromFile` to a configured output.
 */
export function makeModuleSpec(
  fromFile: string,
  target: { readonly output: string | `${string}.ts`; readonly split?: boolean },
): string {
  const fromDir = path.dirname(fromFile)
  const entry = target.split ? path.join(target.output) : target.output
  const rel = path.relative(fromDir, entry).replace(/\\/g, '/')
  const stripped = rel.endsWith('.ts') ? rel.slice(0, -3) : rel
  const noIndex = stripped.endsWith('/index') ? stripped.slice(0, -6) : stripped
  return noIndex === '' ? '.' : noIndex.startsWith('.') ? noIndex : `./${noIndex}`
}

export function makeConst(exportVariable: boolean, text: string, suffix: string): string {
  const prefix = exportVariable ? 'export const ' : 'const '
  return `${prefix}${toIdentifierPascalCase(ensureSuffix(text, suffix))}=`
}

/**
 * Generates a string of export const statements for the given value.
 */
export function makeExportConst(value: { readonly [k: string]: unknown }, suffix: string): string {
  return Object.keys(value)
    .map(
      (key) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(key, suffix))}=${JSON.stringify(value[key])}`,
    )
    .join('\n\n')
}

/**
 * Universal import generator.
 *
 * Automatically detects whether createRoute is needed by checking code content.
 * @param split - Whether in split mode (affects fallback path: '..' for split, '.' for single file)
 */
export function makeImports(
  code: string,
  fromFile: string,
  components:
    | {
        readonly [k: string]: {
          readonly output: string | `${string}.ts`
          readonly split?: boolean
          readonly import?: string
        }
      }
    | undefined,
  split = false,
): string {
  // Regex patterns for each OpenAPI component type (ordered per OpenAPI spec)
  // https://swagger.io/docs/specification/v3_0/components/
  // Using negative lookbehind to exclude ParamsSchema and HeaderSchema from Schema matches
  const IMPORT_PATTERNS: ReadonlyArray<{ readonly pattern: RegExp; readonly key: string }> = [
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*(?<!Params)(?<!Header)Schema)\b/g, key: 'schemas' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*ParamsSchema)\b/g, key: 'parameters' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*SecurityScheme)\b/g, key: 'securitySchemes' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*RequestBody)\b/g, key: 'requestBodies' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Response)\b/g, key: 'responses' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*HeaderSchema)\b/g, key: 'headers' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Example)\b/g, key: 'examples' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Link)\b/g, key: 'links' },
    { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Callback)\b/g, key: 'callbacks' },
  ]

  const prefix = split ? '..' : '.'
  const resolvePath = (key: string): string => {
    const target = components?.[key]
    return target?.import ?? (target ? makeModuleSpec(fromFile, target) : `${prefix}/${key}`)
  }

  // Find locally defined exports to exclude from imports
  const defined = new Set(
    Array.from(
      code.matchAll(/export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/g),
      (m) => m[1] ?? '',
    ).filter(Boolean),
  )

  // Build hono import - auto-detect createRoute usage
  const needsZ = code.includes('z.')
  const needsCreateRoute = code.includes('createRoute(')
  const honoLine = needsCreateRoute
    ? `import{createRoute${needsZ ? ',z' : ''}}from'@hono/zod-openapi'`
    : needsZ
      ? `import{z}from'@hono/zod-openapi'`
      : ''

  // Build component imports in OpenAPI order using regex patterns
  const imports = IMPORT_PATTERNS.map(({ pattern, key }) => {
    const tokens = Array.from(new Set(Array.from(code.matchAll(pattern), (m) => m[1] ?? '')))
      .filter((t) => t && !defined.has(t))
      .sort()
    return tokens.length > 0 ? renderNamedImport(tokens, resolvePath(key)) : ''
  }).filter(Boolean)

  return [honoLine, ...imports, '\n', code, ''].filter(Boolean).join('\n')
}

/**
 * Sorts example names so that referenced examples come before referencing ones.
 * Uses topological sort to handle dependency order.
 *
 * ## Why This Function Is Required
 *
 * When generating TypeScript code for OpenAPI examples with `$ref` references,
 * the referenced example must be defined BEFORE the referencing example.
 * Without this sorting, the generated code would have undefined variable errors.
 *
 * @example
 * ```yaml
 * # OpenAPI input
 * components:
 *   examples:
 *     AliasExample:
 *       $ref: "#/components/examples/BaseExample"
 *     BaseExample:
 *       value: { id: 1 }
 * ```
 *
 * ```ts
 * // Generated TypeScript (correct order after sorting)
 * export const BaseExample = { value: { id: 1 } }   // Must come first
 * export const AliasExample = BaseExample           // References BaseExample
 * ```
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B["Build dependency map"]
 *   B --> C["Initialize visited/visiting sets"]
 *   C --> D["For each name: visit()"]
 *   D --> E{Already visited?}
 *   E -->|Yes| F["Skip"]
 *   E -->|No| G{Currently visiting?}
 *   G -->|Yes| H["Skip (circular)"]
 *   G -->|No| I["Mark as visiting"]
 *   I --> J["Visit dependencies first"]
 *   J --> K["Mark as visited"]
 *   K --> L["Push to sorted"]
 *   F --> M{More names?}
 *   H --> M
 *   L --> M
 *   M -->|Yes| D
 *   M -->|No| N(["Return sorted"])
 * ```
 *
 * @param examples - Object containing example definitions with optional $ref
 * @param names - Array of example names to sort
 * @returns Sorted array with dependencies before dependents
 */
export function sortExamplesByDependency(
  examples: { readonly [k: string]: { readonly $ref?: string; readonly [k: string]: unknown } },
  names: readonly string[],
): readonly string[] {
  const deps = new Map<string, readonly string[]>(
    names.map((name) => {
      const example = examples[name]
      if (example.$ref?.startsWith('#/components/examples/')) {
        const refName = example.$ref.split('/').at(-1)
        return [name, refName && names.includes(refName) ? [refName] : []]
      }
      return [name, []]
    }),
  )

  // Topological sort (functional style)
  const visit = (
    name: string,
    visited: ReadonlySet<string>,
    visiting: ReadonlySet<string>,
  ): readonly string[] => {
    if (visited.has(name) || visiting.has(name)) return []
    const newVisiting = new Set([...visiting, name])
    const depResults = (deps.get(name) ?? []).flatMap((dep) => visit(dep, visited, newVisiting))
    return [...depResults, name]
  }

  return names.reduce<{
    readonly sorted: readonly string[]
    readonly visited: ReadonlySet<string>
  }>(
    (acc, name) => {
      const result = visit(name, acc.visited, new Set())
      return {
        sorted: [...acc.sorted, ...result],
        visited: new Set([...acc.visited, ...result]),
      }
    },
    { sorted: [], visited: new Set() },
  ).sorted
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/code.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('makeModuleSpec', () => {
    it.concurrent('returns relative path from file to output (strips /index)', () => {
      const result = makeModuleSpec('/src/routes/index.ts', { output: '/src/schemas/index.ts' })
      expect(result).toBe('../schemas')
    })

    it.concurrent('returns relative path without .ts extension', () => {
      const result = makeModuleSpec('/src/routes/user.ts', { output: '/src/schemas/user.ts' })
      expect(result).toBe('../schemas/user')
    })

    it.concurrent('returns . for split directory in same directory', () => {
      const result = makeModuleSpec('/src/routes/index.ts', { output: '/src/routes', split: true })
      expect(result).toBe('.')
    })

    it.concurrent('returns relative path to directory for split mode', () => {
      const result = makeModuleSpec('/src/routes/index.ts', { output: '/src/schemas', split: true })
      expect(result).toBe('../schemas')
    })

    it.concurrent('ensures dot-relative prefix', () => {
      const result = makeModuleSpec('/src/index.ts', { output: '/src/schemas.ts' })
      expect(result).toBe('./schemas')
    })

    it.concurrent('handles nested paths (strips /index)', () => {
      const result = makeModuleSpec('/src/api/v1/routes/users.ts', {
        output: '/src/shared/schemas/index.ts',
      })
      expect(result).toBe('../../../shared/schemas')
    })
  })

  describe('sortExamplesByDependency', () => {
    it.concurrent('returns names in original order when no dependencies', () => {
      const result = sortExamplesByDependency(
        {
          A: { value: 'a' },
          B: { value: 'b' },
          C: { value: 'c' },
        },
        ['A', 'B', 'C'],
      )
      expect(result).toStrictEqual(['A', 'B', 'C'])
    })

    it.concurrent('sorts with single dependency', () => {
      const result = sortExamplesByDependency(
        {
          Alias: { $ref: '#/components/examples/Base' },
          Base: { value: 'base' },
        },
        ['Alias', 'Base'],
      )
      expect(result).toStrictEqual(['Base', 'Alias'])
    })

    it.concurrent('sorts with chain of dependencies', () => {
      const result = sortExamplesByDependency(
        {
          Third: { $ref: '#/components/examples/Second' },
          Second: { $ref: '#/components/examples/First' },
          First: { value: 'first' },
        },
        ['Third', 'Second', 'First'],
      )
      expect(result).toStrictEqual(['First', 'Second', 'Third'])
    })

    it.concurrent('handles circular dependencies gracefully', () => {
      const result = sortExamplesByDependency(
        {
          A: { $ref: '#/components/examples/B' },
          B: { $ref: '#/components/examples/A' },
        },
        ['A', 'B'],
      )
      // Should not hang, returns some order
      expect(result).toHaveLength(2)
    })

    it.concurrent('ignores refs to non-existent examples', () => {
      const result = sortExamplesByDependency(
        {
          A: { $ref: '#/components/examples/NotExist' },
          B: { value: 'b' },
        },
        ['A', 'B'],
      )
      expect(result).toStrictEqual(['A', 'B'])
    })

    it.concurrent('ignores non-example refs', () => {
      const result = sortExamplesByDependency(
        {
          A: { $ref: '#/components/schemas/User' },
          B: { value: 'b' },
        },
        ['A', 'B'],
      )
      expect(result).toStrictEqual(['A', 'B'])
    })

    it.concurrent('handles empty input', () => {
      const result = sortExamplesByDependency({}, [])
      expect(result).toStrictEqual([])
    })

    it.concurrent('handles mixed inline and ref examples', () => {
      const result = sortExamplesByDependency(
        {
          RefExample: { $ref: '#/components/examples/InlineExample' },
          InlineExample: { value: 'inline' },
          AnotherInline: { value: 'another' },
        },
        ['RefExample', 'InlineExample', 'AnotherInline'],
      )
      // InlineExample should come before RefExample
      expect(result.indexOf('InlineExample')).toBeLessThan(result.indexOf('RefExample'))
    })
  })
}
