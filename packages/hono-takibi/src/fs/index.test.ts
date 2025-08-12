import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { readFileSync } from './index.js'

// Test run
// pnpm vitest run ./src/fs/index.test.ts

describe('fs', () => {
  describe('readFileSync', () => {
    const testFilePath = path.join(process.cwd(), 'test-file.txt')
    const nonExistentPath = path.join(process.cwd(), 'no-such-file.txt')

    beforeEach(() => {
      fs.writeFileSync(testFilePath, 'hello world', 'utf-8')
    })

    afterEach(() => {
      fs.unlinkSync(testFilePath)
    })

    it('should return Ok when reading an existing file', () => {
      const result = readFileSync(testFilePath)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe('hello world')
      }
    })

    it('should return Err when reading a non-existent file', () => {
      const result = readFileSync(nonExistentPath)
      expect(result.ok).toBe(false)
    })
  })
})
