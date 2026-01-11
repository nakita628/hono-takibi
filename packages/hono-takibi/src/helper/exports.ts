import fs from 'node:fs'
import path from 'node:path'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'
import { core } from './core.js'

/**
 * Extracts ref name from OpenAPI $ref string.
 */
const extractRefName = (ref: string): string | undefined => ref.split('/').at(-1)

/**
 * Checks if a value has a $ref property.
 */
const hasRef = (v: unknown): v is { readonly $ref: string } =>
  typeof v === 'object' && v !== null && '$ref' in v && typeof v.$ref === 'string'

/**
 * Checks if a value is an examples $ref.
 */
const isExamplesRef = (v: unknown): v is { readonly $ref: string } =>
  hasRef(v) && v.$ref.startsWith('#/components/examples/')

/**
 * Serializes a value to code string, converting $ref objects to variable references.
 */
const stringifyWithRefs = (obj: unknown, refs: Set<string>, suffix: string): string => {
  if (obj === null) return 'null'
  if (typeof obj === 'string') return JSON.stringify(obj)
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
  if (Array.isArray(obj)) {
    return `[${obj.map((item) => stringifyWithRefs(item, refs, suffix)).join(',')}]`
  }
  if (typeof obj !== 'object') return JSON.stringify(obj)

  // Handle $ref to examples - output as variable reference
  if (isExamplesRef(obj)) {
    const refName = extractRefName(obj.$ref)
    if (refName) {
      refs.add(refName)
      return toIdentifierPascalCase(ensureSuffix(refName, suffix))
    }
  }

  // Serialize object properties
  const entries = Object.entries(obj).map(
    ([key, val]) => `${JSON.stringify(key)}:${stringifyWithRefs(val, refs, suffix)}`,
  )
  return `{${entries.join(',')}}`
}

/**
 * Generates TypeScript code for an example with proper imports.
 */
const generateExampleCode = (name: string, value: unknown, suffix: string): string => {
  const refs = new Set<string>()
  const code = stringifyWithRefs(value ?? {}, refs, suffix)

  const imports = [...refs]
    .sort()
    .map((refName) => {
      const varName = toIdentifierPascalCase(ensureSuffix(refName, suffix))
      return `import { ${varName} } from './${lowerFirst(refName)}.ts'`
    })
    .join('\n')

  return imports
    ? `${imports}\n\nexport const ${name} = ${code}\n`
    : `export const ${name} = ${code}\n`
}

/**
 * Generates TypeScript export files for OpenAPI components in split mode.
 *
 * This function handles various OpenAPI component types and generates individual
 * TypeScript files with proper imports and exports.
 *
 * ## Example $ref with Sibling Properties (OpenAPI 3.1+)
 *
 * OpenAPI 3.1+ allows `$ref` with sibling properties like `summary` and `description`:
 *
 * ```yaml
 * components:
 *   examples:
 *     BaseUser:
 *       summary: "Base user example"
 *       value: { id: 1, name: "Base" }
 *     ExtendedUser:
 *       $ref: "#/components/examples/BaseUser"
 *       summary: "Extended user with custom summary"
 *       description: "This extends BaseUser"
 * ```
 *
 * This function generates:
 *
 * ```ts
 * // extendedUser.ts
 * import { BaseUserExample } from './baseUser.ts'
 *
 * export const ExtendedUserExample = {
 *   ...BaseUserExample,
 *   summary: 'Extended user with custom summary',
 *   description: 'This extends BaseUser',
 * }
 * ```
 *
 * ## Important: SwaggerParser.bundle() Behavior
 *
 * When using the CLI, SwaggerParser.bundle() resolves `$ref` references,
 * which causes sibling properties to be lost:
 *
 * **Before bundle (original YAML):**
 * ```yaml
 * ExtendedUser:
 *   $ref: "#/components/examples/BaseUser"
 *   summary: "Custom summary"  # sibling property
 * ```
 *
 * **After bundle (what this function receives via CLI):**
 * ```yaml
 * ExtendedUser:
 *   summary: "Base user example"  # BaseUser's value, custom summary is lost!
 *   value: { id: 1, name: "Base" }
 * ```
 *
 * | Usage | Sibling Properties |
 * |-------|-------------------|
 * | CLI (via SwaggerParser) | Lost during bundle |
 * | Direct `makeExports()` call | Preserved |
 *
 * The sibling properties feature is fully tested in unit tests where
 * `makeExports()` is called directly with unprocessed data.
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

      // Handle $ref for examples (and potentially other components)
      // OpenAPI 3.1+ allows $ref with sibling properties (summary, description)
      if (suffix === 'Example' && hasRef(v)) {
        const refName = extractRefName(v.$ref)
        if (refName) {
          const refVarName = toIdentifierPascalCase(ensureSuffix(refName, suffix))
          const refFileName = lowerFirst(refName)
          const importLine = `import { ${refVarName} } from './${refFileName}.ts'`

          // Check for sibling properties (summary, description) - OpenAPI 3.1+
          const obj = v as { $ref: string; summary?: string; description?: string }
          const hasSiblings = obj.summary !== undefined || obj.description !== undefined

          if (hasSiblings) {
            // Merge sibling properties with referenced example using spread
            const props = [
              `...${refVarName}`,
              obj.summary !== undefined ? `summary: ${JSON.stringify(obj.summary)}` : undefined,
              obj.description !== undefined
                ? `description: ${JSON.stringify(obj.description)}`
                : undefined,
            ]
              .filter((p) => p !== undefined)
              .join(', ')
            const body = `${importLine}\n\nexport const ${name} = { ${props} }\n`
            const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
            return core(body, path.dirname(filePath), filePath)
          }

          // Simple $ref without sibling properties
          const body = `${importLine}\n\nexport const ${name} = ${refVarName}\n`
          const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
          return core(body, path.dirname(filePath), filePath)
        }
      }

      // For examples, handle nested $ref inside values
      if (suffix === 'Example') {
        const body = generateExampleCode(name, v ?? {}, suffix)
        const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
        return core(body, path.dirname(filePath), filePath)
      }

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

    it('should handle Example with $ref to another example', async () => {
      const result = await makeExports(
        {
          BaseUser: { value: { id: 1, name: 'Base' } },
          AliasUser: { $ref: '#/components/examples/BaseUser' },
          ChainedUser: { $ref: '#/components/examples/AliasUser' },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/baseUser.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/aliasUser.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/chainedUser.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/index.ts`)).toBe(true)

      // BaseUser should be exported as object (formatted)
      const baseUserContent = fs.readFileSync(`${testDir}/examples/baseUser.ts`, 'utf-8')
      expect(
        baseUserContent,
      ).toBe(`export const BaseUserExample = { value: { id: 1, name: 'Base' } }
`)

      // AliasUser should import and re-export BaseUser
      const aliasUserContent = fs.readFileSync(`${testDir}/examples/aliasUser.ts`, 'utf-8')
      expect(aliasUserContent).toBe(`import { BaseUserExample } from './baseUser.ts'

export const AliasUserExample = BaseUserExample
`)

      // ChainedUser should import and re-export AliasUser
      const chainedUserContent = fs.readFileSync(`${testDir}/examples/chainedUser.ts`, 'utf-8')
      expect(chainedUserContent).toBe(`import { AliasUserExample } from './aliasUser.ts'

export const ChainedUserExample = AliasUserExample
`)
    })

    it('should handle Example with special Unicode characters', async () => {
      const result = await makeExports(
        {
          SpecialChar: {
            summary: 'Example with special characters',
            value: {
              message: 'Hello 世界! こんにちは 🌍',
              emoji: '🔥💯✨',
              japanese: '日本語テスト',
            },
          },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/specialChar.ts`)).toBe(true)

      const content = fs.readFileSync(`${testDir}/examples/specialChar.ts`, 'utf-8')
      expect(content).toBe(`export const SpecialCharExample = {
  summary: 'Example with special characters',
  value: { message: 'Hello 世界! こんにちは 🌍', emoji: '🔥💯✨', japanese: '日本語テスト' },
}
`)
    })

    it('should handle Example with nested $ref in array', async () => {
      const result = await makeExports(
        {
          UserMinimal: { value: { id: 1, name: 'User' } },
          Company: {
            value: {
              id: 'company-1',
              name: 'Inferno Inc.',
              employees: [{ $ref: '#/components/examples/UserMinimal' }],
            },
          },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/userMinimal.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/company.ts`)).toBe(true)

      const companyContent = fs.readFileSync(`${testDir}/examples/company.ts`, 'utf-8')
      expect(companyContent).toBe(`import { UserMinimalExample } from './userMinimal.ts'

export const CompanyExample = {
  value: { id: 'company-1', name: 'Inferno Inc.', employees: [UserMinimalExample] },
}
`)
    })

    it('should handle Example with nested $ref in object', async () => {
      const result = await makeExports(
        {
          UserMinimal: { value: { id: 1, name: 'User' } },
          Wrapper: {
            value: {
              user: { $ref: '#/components/examples/UserMinimal' },
            },
          },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)

      const wrapperContent = fs.readFileSync(`${testDir}/examples/wrapper.ts`, 'utf-8')
      expect(wrapperContent).toBe(`import { UserMinimalExample } from './userMinimal.ts'

export const WrapperExample = { value: { user: UserMinimalExample } }
`)
    })

    it('should handle Example with multiple nested $refs', async () => {
      const result = await makeExports(
        {
          UserMinimal: { value: { id: 1, name: 'User' } },
          UserFull: { value: { id: 2, name: 'Full User', email: 'user@example.com' } },
          Team: {
            value: {
              name: 'Team A',
              lead: { $ref: '#/components/examples/UserFull' },
              members: [
                { $ref: '#/components/examples/UserMinimal' },
                { $ref: '#/components/examples/UserFull' },
              ],
            },
          },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)

      const teamContent = fs.readFileSync(`${testDir}/examples/team.ts`, 'utf-8')
      expect(teamContent).toBe(`import { UserFullExample } from './userFull.ts'
import { UserMinimalExample } from './userMinimal.ts'

export const TeamExample = {
  value: { name: 'Team A', lead: UserFullExample, members: [UserMinimalExample, UserFullExample] },
}
`)
    })

    it('should handle Example with $ref and sibling properties (OpenAPI 3.1+)', async () => {
      const result = await makeExports(
        {
          BaseUser: { value: { id: 1, name: 'Base' } },
          ExtendedUser: {
            $ref: '#/components/examples/BaseUser',
            summary: 'Extended user with custom summary',
            description: 'This example extends BaseUser with additional metadata',
          },
          OnlySummary: {
            $ref: '#/components/examples/BaseUser',
            summary: 'Only summary override',
          },
          OnlyDescription: {
            $ref: '#/components/examples/BaseUser',
            description: 'Only description override',
          },
        },
        'Example',
        `${testDir}/examples`,
      )

      expect(result.ok).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/baseUser.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/extendedUser.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/onlySummary.ts`)).toBe(true)
      expect(fs.existsSync(`${testDir}/examples/onlyDescription.ts`)).toBe(true)

      // BaseUser should be exported as object
      const baseUserContent = fs.readFileSync(`${testDir}/examples/baseUser.ts`, 'utf-8')
      expect(
        baseUserContent,
      ).toBe(`export const BaseUserExample = { value: { id: 1, name: 'Base' } }
`)

      // ExtendedUser should import and spread with both sibling properties
      const extendedUserContent = fs.readFileSync(`${testDir}/examples/extendedUser.ts`, 'utf-8')
      expect(extendedUserContent).toBe(`import { BaseUserExample } from './baseUser.ts'

export const ExtendedUserExample = {
  ...BaseUserExample,
  summary: 'Extended user with custom summary',
  description: 'This example extends BaseUser with additional metadata',
}
`)

      // OnlySummary should import and spread with summary only
      const onlySummaryContent = fs.readFileSync(`${testDir}/examples/onlySummary.ts`, 'utf-8')
      expect(onlySummaryContent).toBe(`import { BaseUserExample } from './baseUser.ts'

export const OnlySummaryExample = { ...BaseUserExample, summary: 'Only summary override' }
`)

      // OnlyDescription should import and spread with description only
      const onlyDescriptionContent = fs.readFileSync(
        `${testDir}/examples/onlyDescription.ts`,
        'utf-8',
      )
      expect(onlyDescriptionContent).toBe(`import { BaseUserExample } from './baseUser.ts'

export const OnlyDescriptionExample = {
  ...BaseUserExample,
  description: 'Only description override',
}
`)
    })
  })
}
