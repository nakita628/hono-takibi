import { describe, expect, it } from 'vitest'
import { makeModuleSpec } from './code.js'

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
