import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { core } from './core.js'

describe('core', () => {
  beforeEach(() => {
    fs.mkdirSync('test', { recursive: true })
  })
  afterEach(() => {
    fs.rmSync('test', { recursive: true, force: true })
  })

  it('should generate core code', async () => {
    const result = await core('console.log("Hello, world!")', 'test', 'test/test.ts')
    expect(result).toStrictEqual({ ok: true, value: undefined })
  })
})
