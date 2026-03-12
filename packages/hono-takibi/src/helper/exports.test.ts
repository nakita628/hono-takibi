import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { makeExports } from './exports.js'

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

  it('should generate correct file content for Schema suffix', async () => {
    await makeExports(
      {
        User: { type: 'object', properties: { id: { type: 'integer' } } },
      },
      'Schema',
      `${testDir}/schemas`,
    )

    const content = fs.readFileSync(`${testDir}/schemas/user.ts`, 'utf-8')
    // File goes through Prettier formatting (core → fmt)
    expect(content).toBe(
      "export const UserSchema = { type: 'object', properties: { id: { type: 'integer' } } }\n",
    )
  })

  it('should generate correct file content for Example suffix', async () => {
    await makeExports(
      {
        Pet: { value: { name: 'Fido', type: 'dog' } },
      },
      'Example',
      `${testDir}/examples`,
    )

    const content = fs.readFileSync(`${testDir}/examples/pet.ts`, 'utf-8')
    expect(content).toBe(
      "export const PetExample = { value: { name: 'Fido', type: 'dog' } }\n",
    )
  })

  it('should generate correct file content with as const for readonly', async () => {
    await makeExports(
      {
        Config: { timeout: 3000, retries: 3 },
      },
      'Example',
      `${testDir}/examples`,
      true,
    )

    const content = fs.readFileSync(`${testDir}/examples/config.ts`, 'utf-8')
    expect(content).toBe('export const ConfigExample = { timeout: 3000, retries: 3 } as const\n')
  })

  it('should generate correct file content without as const when readonly is false', async () => {
    await makeExports(
      {
        Item: { id: 1 },
      },
      'Response',
      `${testDir}/responses`,
      false,
    )

    const content = fs.readFileSync(`${testDir}/responses/item.ts`, 'utf-8')
    expect(content).toBe('export const ItemResponse = { id: 1 }\n')
  })

  it('should generate correct result message for each suffix type', async () => {
    const suffixes = [
      'Parameter',
      'SecurityScheme',
      'RequestBody',
      'Response',
      'Header',
      'Link',
      'Callback',
      'PathItem',
      'Webhook',
    ] as const

    for (const suffix of suffixes) {
      const dir = `${testDir}/${suffix.toLowerCase()}`
      const result = await makeExports({ Test: {} }, suffix, dir)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(`Generated ${suffix} code written to ${dir}/*.ts (index.ts included)`)
      }
    }
  })

  it('should handle kebab-case key names correctly', async () => {
    await makeExports(
      {
        'user-profile': { name: 'test' },
      },
      'Schema',
      `${testDir}/schemas`,
    )

    expect(fs.existsSync(`${testDir}/schemas/user-profile.ts`)).toBe(true)
    const content = fs.readFileSync(`${testDir}/schemas/user-profile.ts`, 'utf-8')
    expect(content).toBe("export const UserProfileSchema = { name: 'test' }\n")
  })

  it('should handle null value in component object', async () => {
    await makeExports(
      {
        Empty: null as unknown as Record<string, unknown>,
      },
      'Schema',
      `${testDir}/schemas`,
    )

    const content = fs.readFileSync(`${testDir}/schemas/empty.ts`, 'utf-8')
    expect(content).toBe('export const EmptySchema = {}\n')
  })

  it('should generate correct index for multiple files with various suffixes', async () => {
    await makeExports(
      {
        Bearer: { type: 'http', scheme: 'bearer' },
        ApiKey: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
      },
      'SecurityScheme',
      `${testDir}/security`,
    )

    const indexContent = fs.readFileSync(`${testDir}/security/index.ts`, 'utf-8')
    expect(indexContent).toBe(`export * from './apiKey.ts'\nexport * from './bearer.ts'\n`)

    const bearerContent = fs.readFileSync(`${testDir}/security/bearer.ts`, 'utf-8')
    expect(bearerContent).toBe(
      "export const BearerSecurityScheme = { type: 'http', scheme: 'bearer' }\n",
    )

    const apiKeyContent = fs.readFileSync(`${testDir}/security/apiKey.ts`, 'utf-8')
    expect(apiKeyContent).toBe(
      "export const ApiKeySecurityScheme = { type: 'apiKey', name: 'X-API-Key', in: 'header' }\n",
    )
  })
})
