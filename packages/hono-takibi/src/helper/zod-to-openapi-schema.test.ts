import { describe, expect, it } from 'vitest'
import { zodToOpenAPISchema } from './zod-to-openapi-schema'

// Test run
// pnpm vitest run ./src/helper/zod-to-openapi-schema.test.ts

describe('zodToOpenAPISchema', () => {
  // #1: exportSchema=true, exportType=true
  it.concurrent('zodToOpenAPISchema --export-schema true --export-type true', () => {
    const result = zodToOpenAPISchema('Test', 'z.object({test:z.string()})', true, true)
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #2: exportSchema=true, exportType=false
  it.concurrent('zodToOpenAPISchema --export-schema true --export-type false', () => {
    const result = zodToOpenAPISchema('Test', 'z.object({test:z.string()})', true, false)
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
  // #3: exportSchema=false, exportType=true
  it.concurrent('zodToOpenAPISchema --export-schema false --export-type true', () => {
    const result = zodToOpenAPISchema('Test', 'z.object({test:z.string()})', false, true)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // #4: exportSchema=false, exportType=false
  it.concurrent('zodToOpenAPISchema --export-schema false --export-type false', () => {
    const result = zodToOpenAPISchema('Test', 'z.object({test:z.string()})', false, false)
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`
    expect(result).toBe(expected)
  })
})
