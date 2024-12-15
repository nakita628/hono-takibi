import { describe, expect, it } from 'vitest'
import { resolveSchemaOrder } from './resolve-schema-order'

describe('resolveSchemaOrder', () => {
  it('should handle a schema with no dependencies', () => {
    const dependencies = new Map<string, Set<string>>([['User', new Set()]])
    const visited = new Set<string>()
    const ordered: string[] = []

    resolveSchemaOrder('User', dependencies, visited, ordered)

    expect(ordered).toEqual(['User'])
    expect(visited.has('User')).toBe(true)
  })

  it('should handle simple dependencies', () => {
    const dependencies = new Map<string, Set<string>>([
      ['User', new Set(['Address'])],
      ['Address', new Set()],
    ])
    const visited = new Set<string>()
    const ordered: string[] = []

    resolveSchemaOrder('User', dependencies, visited, ordered)

    expect(ordered).toEqual(['Address', 'User'])
    expect(visited.has('User')).toBe(true)
    expect(visited.has('Address')).toBe(true)
  })

  it('should handle multiple levels of dependencies', () => {
    const dependencies = new Map<string, Set<string>>([
      ['User', new Set(['Address'])],
      ['Address', new Set(['Country'])],
      ['Country', new Set()],
    ])
    const visited = new Set<string>()
    const ordered: string[] = []

    resolveSchemaOrder('User', dependencies, visited, ordered)

    expect(ordered).toEqual(['Country', 'Address', 'User'])
  })

  it('should handle circular dependencies', () => {
    const dependencies = new Map<string, Set<string>>([
      ['User', new Set(['Address'])],
      ['Address', new Set(['User'])],
    ])
    const visited = new Set<string>()
    const ordered: string[] = []

    resolveSchemaOrder('User', dependencies, visited, ordered)

    // Circular dependency should not cause infinite loop
    // First visited schema will be added last
    expect(ordered.length).toBe(2)
    expect(visited.size).toBe(2)
  })

  it('should handle multiple independent schemas', () => {
    const dependencies = new Map<string, Set<string>>([
      ['User', new Set(['Profile'])],
      ['Order', new Set(['Product'])],
      ['Profile', new Set()],
      ['Product', new Set()],
    ])
    const visited = new Set<string>()
    const ordered: string[] = []

    resolveSchemaOrder('User', dependencies, visited, ordered)
    resolveSchemaOrder('Order', dependencies, visited, ordered)

    expect(ordered).toContain('Profile')
    expect(ordered).toContain('User')
    expect(ordered).toContain('Product')
    expect(ordered).toContain('Order')
    expect(ordered.indexOf('Profile')).toBeLessThan(ordered.indexOf('User'))
    expect(ordered.indexOf('Product')).toBeLessThan(ordered.indexOf('Order'))
  })
})
