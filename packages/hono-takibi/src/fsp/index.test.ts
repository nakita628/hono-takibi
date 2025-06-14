import { describe, expect, it } from 'vitest'

// Test run
// pnpm vitest run ./src/fsp/index.test.ts

import { mkdir, readdir, writeFile } from '.'

describe('fsp barrel file exports', () => {
  it('should export mkdir', () => {
    expect(typeof mkdir).toBe('function')
  })
  it('should export readdir', () => {
    expect(typeof readdir).toBe('function')
  })
  it('should export writeFile', () => {
    expect(typeof writeFile).toBe('function')
  })
})
