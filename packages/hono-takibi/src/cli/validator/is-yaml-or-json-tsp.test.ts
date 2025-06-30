import { describe, it, expect } from 'vitest'
import { isYamlOrJsonOrTsp } from './index'

// Test run
// pnpm vitest run ./src/cli/validator/is-yaml-or-json-tsp.test.ts

describe('isYamlOrJsonOrTsp', () => {
  it('should return true for .yaml files', () => {
    expect(isYamlOrJsonOrTsp('api.yaml')).toBe(true)
  })
  it('should return true for .json files', () => {
    expect(isYamlOrJsonOrTsp('data.json')).toBe(true)
  })
  it('should return false for .yml files', () => {
    expect(isYamlOrJsonOrTsp('config.yml')).toBe(false)
  })
  it('should return false for .ts files', () => {
    expect(isYamlOrJsonOrTsp('index.ts')).toBe(false)
  })
  it('should return false for strings without extension', () => {
    expect(isYamlOrJsonOrTsp('filename')).toBe(false)
  })
  it('should return false for empty string', () => {
    expect(isYamlOrJsonOrTsp('')).toBe(false)
  })
  it('should return true case-sensitively (only lowercase)', () => {
    expect(isYamlOrJsonOrTsp('file.YAML')).toBe(false)
    expect(isYamlOrJsonOrTsp('file.JSON')).toBe(false)
  })
  it('should return true for .tsp files', () => {
    expect(isYamlOrJsonOrTsp('schema.tsp')).toBe(true)
  })
  it('should return false for .txt files', () => {
    expect(isYamlOrJsonOrTsp('document.txt')).toBe(false)
  })
})
