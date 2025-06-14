import { describe, it, expect } from 'vitest'
import { isYamlOrJson } from './index'

// Test run
// pnpm vitest run ./src/cli/validator/is-yaml-or-json.test.ts

describe('isYamlOrJson', () => {
  it('should return true for .yaml files', () => {
    expect(isYamlOrJson('api.yaml')).toBe(true)
  })

  it('should return true for .json files', () => {
    expect(isYamlOrJson('data.json')).toBe(true)
  })

  it('should return false for .yml files', () => {
    expect(isYamlOrJson('config.yml')).toBe(false)
  })

  it('should return false for .ts files', () => {
    expect(isYamlOrJson('index.ts')).toBe(false)
  })

  it('should return false for strings without extension', () => {
    expect(isYamlOrJson('filename')).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(isYamlOrJson('')).toBe(false)
  })

  it('should return true case-sensitively (only lowercase)', () => {
    expect(isYamlOrJson('file.YAML')).toBe(false)
    expect(isYamlOrJson('file.JSON')).toBe(false)
  })
})
