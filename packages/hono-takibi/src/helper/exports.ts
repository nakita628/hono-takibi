import path from 'node:path'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'
import { core } from './core.js'

/**
 * Generates TypeScript export files for OpenAPI components in split mode.
 *
 * Creates individual TypeScript files for each component with proper exports.
 * SwaggerParser.bundle() resolves all $ref references before this function
 * is called, so no $ref handling is needed here.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B["Get component keys"]
 *   B --> C["Generate index.ts"]
 *   C --> D["For each component"]
 *   D --> E["Generate JSON export"]
 *   E --> F["Write to file"]
 *   F --> G{More components?}
 *   G -->|Yes| D
 *   G -->|No| H(["Return result"])
 * ```
 *
 * @param value - Object containing component definitions
 * @param suffix - Component type suffix (e.g., 'Example', 'Schema')
 * @param output - Output directory path
 * @returns Result object with success/error status
 */
export async function makeExports(
  value: { readonly [k: string]: unknown },
  suffix:
    | 'Schema'
    | 'Parameter'
    | 'SecurityScheme'
    | 'RequestBody'
    | 'Response'
    | 'Header'
    | 'Example'
    | 'Link'
    | 'Callback',
  output: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const keys = Object.keys(value)
  const outDir = output.replace(/\.ts$/, '')

  // sort abc
  const indexCode = `${keys
    .sort()
    .map((v) => `export * from './${lowerFirst(v)}.ts'`)
    .join('\n')}\n`

  const results = await Promise.all([
    ...keys.map((key) => {
      const v = value[key]
      const name = toIdentifierPascalCase(ensureSuffix(key, suffix))
      const body = `export const ${name} = ${JSON.stringify(v ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      return core(body, path.dirname(filePath), filePath)
    }),
    core(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
  ])

  const firstError = results.find((r) => !r.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

  return {
    ok: true,
    value: `Generated ${suffix} code written to ${outDir}/*.ts (index.ts included)`,
  }
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/exports.ts
if (import.meta.vitest) {
  const { describe, it, expect, beforeEach, afterEach } = import.meta.vitest
  const fs = await import('node:fs')

  describe('makeExports', () => {
    const testDir = 'test-exports'

    beforeEach(() => {
      fs.mkdirSync(testDir, { recursive: true })
    })

    afterEach(() => {
      fs.rmSync(testDir, { recursive: true, force: true })
    })

    it('should generate Schema exports', async () => {
      const result = await makeExports(
        {
          User: { type: 'object', properties: { id: { type: 'integer' } } },
          Post: { type: 'object', properties: { title: { type: 'string' } } },
        },
        'Schema',
        `${testDir}/schemas`,
      )

      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(
          'Generated Schema code written to test-exports/schemas/*.ts (index.ts included)',
        )
      }

      expect(fs.existsSync(`${testDir}/schemas/user.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/schemas/post.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/schemas/index.ts`)).toBe(true)

      const indexContent = fs.readFileSync(`${testDir}/schemas/index.ts`, 'utf-8')
      expect(indexContent).toBe(`export * from './post.ts'
export * from './user.ts'
`)
    })

    it('should generate Example exports', async () => {
      const result = await makeExports(
        {
          UserExample: { value: { id: 1, name: 'John' } },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/userExample.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/index.ts`)).toBe(true)
    })

    it('should generate Link exports', async () => {
      const result = await makeExports(
        {
          GetUserById: { operationId: 'getUserById' },
        },
        'Link',
        `${testDir}/links`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/links/getUserById.ts`)).toBe(true)
    })

    it('should generate Callback exports', async () => {
      const result = await makeExports(
        {
          OnEvent: { '{$request.body#/callbackUrl}': { post: {} } },
        },
        'Callback',
        `${testDir}/callbacks`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/callbacks/onEvent.ts`)).toBe(true)
    })

    it('should handle empty value object', async () => {
      const result = await makeExports({}, 'Schema', `${testDir}/empty`)

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/empty/index.ts`)).toBe(true)

      const indexContent = fs.readFileSync(`${testDir}/empty/index.ts`, 'utf-8')
      expect(indexContent).toBe('')
    })

    it('should sort exports alphabetically in index file', async () => {
      const result = await makeExports(
        {
          Zebra: {},
          Apple: {},
          Mango: {},
        },
        'Schema',
        `${testDir}/sorted`,
      )

      expect(result.ok).toBe(true)

      const indexContent = fs.readFileSync(`${testDir}/sorted/index.ts`, 'utf-8')
      expect(indexContent).toBe(`export * from './apple.ts'
export * from './mango.ts'
export * from './zebra.ts'
`)
    })

    it('should strip .ts extension from output path', async () => {
      const result = await makeExports({ Test: {} }, 'Schema', `${testDir}/schemas.ts`)

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/schemas/test.ts`)).toBe(true)
    })
  })
}
