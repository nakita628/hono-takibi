import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { makeExports } from './exports.js'

// Test run
// pnpm vitest run ./src/helper/exports.test.ts

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
      expect(result.value).toContain('Generated Schema code written to')
    }

    expect(fs.existsSync(`${testDir}/schemas/user.ts`)).toBe(true)
    expect(fs.existsSync(`${testDir}/schemas/post.ts`)).toBe(true)
    expect(fs.existsSync(`${testDir}/schemas/index.ts`)).toBe(true)

    const indexContent = fs.readFileSync(`${testDir}/schemas/index.ts`, 'utf-8')
    expect(indexContent).toContain("export * from './post.ts'")
    expect(indexContent).toContain("export * from './user.ts'")
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
    const lines = indexContent.trim().split('\n')
    expect(lines[0]).toContain('apple')
    expect(lines[1]).toContain('mango')
    expect(lines[2]).toContain('zebra')
  })

  it('should strip .ts extension from output path', async () => {
    const result = await makeExports({ Test: {} }, 'Schema', `${testDir}/schemas.ts`)

    expect(result.ok).toBe(true)
    expect(fs.existsSync(`${testDir}/schemas/test.ts`)).toBe(true)
  })
})
