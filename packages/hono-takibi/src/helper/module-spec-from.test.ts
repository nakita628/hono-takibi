import { describe, expect, it } from 'vitest'
import { moduleSpecFrom } from './module-spec-from'

describe('moduleSpecFrom', () => {
  it.concurrent('returns relative path from file to output', () => {
    const result = moduleSpecFrom('/src/routes/index.ts', { output: '/src/schemas/index.ts' })
    expect(result).toBe('../schemas/index')
  })

  it.concurrent('returns relative path without .ts extension', () => {
    const result = moduleSpecFrom('/src/routes/user.ts', { output: '/src/schemas/user.ts' })
    expect(result).toBe('../schemas/user')
  })

  it.concurrent('returns ./index for split directory in same directory', () => {
    const result = moduleSpecFrom('/src/routes/index.ts', { output: '/src/routes', split: true })
    expect(result).toBe('./index')
  })

  it.concurrent('returns relative path to directory for split mode', () => {
    const result = moduleSpecFrom('/src/routes/index.ts', { output: '/src/schemas', split: true })
    expect(result).toBe('../schemas')
  })

  it.concurrent('ensures dot-relative prefix', () => {
    const result = moduleSpecFrom('/src/index.ts', { output: '/src/schemas.ts' })
    expect(result).toBe('./schemas')
  })

  it.concurrent('handles nested paths', () => {
    const result = moduleSpecFrom('/src/api/v1/routes/users.ts', {
      output: '/src/shared/schemas/index.ts',
    })
    expect(result).toBe('../../../shared/schemas/index')
  })
})
