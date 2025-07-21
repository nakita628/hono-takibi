import { describe, it, expect } from 'vitest'
import { isYamlOrJsonOrTsp, isTs } from '.'

// Test run
// pnpm vitest run ./src/cli/validator/index.test.ts

describe('validator', () => {
  // isTs
  describe('isTs', () => {
    it('should return true for .ts files', () => {
      expect(isTs('index.ts')).toBe(true)
      expect(isTs('src/app.ts')).toBe(true)
    })

    it('should return false for .d.ts files', () => {
      expect(isTs('types.d.ts')).toBe(false)
      expect(isTs('src/types/global.d.ts')).toBe(false)
    })

    it('should return false for non-.ts files', () => {
      expect(isTs('style.css')).toBe(false)
      expect(isTs('main.js')).toBe(false)
    })

    it('should return false for uppercase .TS', () => {
      expect(isTs('index.TS')).toBe(false)
    })
  })
  // isYamlOrJsonOrTsp
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
})
