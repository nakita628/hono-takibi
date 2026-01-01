import { describe, expect, it } from 'vitest'
import { sortByDependencies, sortSchemaBlocks } from './sort-by-dependencies.js'

describe('sortByDependencies', () => {
  it('should sort declarations by dependencies', () => {
    const code = `const BSchema = z.object({ a: ASchema })
const ASchema = z.string()`

    const result = sortByDependencies(code)

    expect(result).toBe(`const ASchema = z.string()

const BSchema = z.object({ a: ASchema })`)
  })

  it('should handle multiple levels of dependencies', () => {
    const code = `const CSchema = z.object({ b: BSchema })
const ASchema = z.string()
const BSchema = z.object({ a: ASchema })`

    const result = sortByDependencies(code)

    expect(result).toBe(`const ASchema = z.string()

const BSchema = z.object({ a: ASchema })

const CSchema = z.object({ b: BSchema })`)
  })

  it('should handle self-referencing schemas', () => {
    const code = 'const NodeSchema = z.lazy(() => z.object({ child: NodeSchema }))'

    const result = sortByDependencies(code)

    expect(result).toBe('const NodeSchema = z.lazy(() => z.object({ child: NodeSchema }))')
  })

  it('should handle circular dependencies', () => {
    const code = `const ASchema = z.object({ b: BSchema })
const BSchema = z.object({ a: ASchema })`

    const result = sortByDependencies(code)

    expect(result).toContain('ASchema')
    expect(result).toContain('BSchema')
  })

  it('should handle empty code', () => {
    const code = ''
    const result = sortByDependencies(code)
    expect(result).toBe('')
  })

  it('should handle code without declarations', () => {
    const code = '// just a comment'
    const result = sortByDependencies(code)
    expect(result).toBe('// just a comment')
  })

  it('should handle export declarations', () => {
    const code = `export const BSchema = z.object({ a: ASchema }).openapi('B')
export const ASchema = z.string().openapi('A')`

    const result = sortByDependencies(code)

    expect(result).toBe(`export const ASchema = z.string().openapi('A')

export const BSchema = z.object({ a: ASchema }).openapi('B')`)
  })
})

describe('sortSchemaBlocks', () => {
  it('should sort blocks by dependencies', () => {
    const blocks = [
      { name: 'BSchema', code: "const BSchema = z.object({ a: ASchema }).openapi('B')" },
      { name: 'ASchema', code: "const ASchema = z.string().openapi('A')" },
    ]

    const result = sortSchemaBlocks(blocks)

    expect(result.map((b) => b.name)).toEqual(['ASchema', 'BSchema'])
  })

  it('should handle blocks with type definitions', () => {
    const blocks = [
      {
        name: 'BSchema',
        code: `type BType = { a: string }
const BSchema = z.object({ a: ASchema }).openapi('B')
type B = z.infer<typeof BSchema>`,
      },
      { name: 'ASchema', code: "const ASchema = z.string().openapi('A')" },
    ]

    const result = sortSchemaBlocks(blocks)

    expect(result.map((b) => b.name)).toEqual(['ASchema', 'BSchema'])
  })

  it('should handle multiple levels of dependencies', () => {
    const blocks = [
      { name: 'CSchema', code: 'const CSchema = z.object({ b: BSchema })' },
      { name: 'ASchema', code: 'const ASchema = z.string()' },
      { name: 'BSchema', code: 'const BSchema = z.object({ a: ASchema })' },
    ]

    const result = sortSchemaBlocks(blocks)

    expect(result.map((b) => b.name)).toEqual(['ASchema', 'BSchema', 'CSchema'])
  })

  it('should handle circular dependencies', () => {
    const blocks = [
      { name: 'ASchema', code: 'const ASchema = z.object({ b: BSchema })' },
      { name: 'BSchema', code: 'const BSchema = z.object({ a: ASchema })' },
    ]

    const result = sortSchemaBlocks(blocks)

    expect(result).toHaveLength(2)
    expect(result.map((b) => b.name)).toContain('ASchema')
    expect(result.map((b) => b.name)).toContain('BSchema')
  })

  it('should handle empty blocks', () => {
    const blocks: { name: string; code: string }[] = []
    const result = sortSchemaBlocks(blocks)
    expect(result).toEqual([])
  })
})
