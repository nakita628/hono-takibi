import { describe, expect, it } from 'vitest'
import { makeRef } from './openapi.js'

// Test run
// pnpm vitest run ./src/helper/openapi.test.ts

describe('openapi helper', () => {
  describe('makeRef', () => {
    it.concurrent(`makeRef('#/components/schemas/Test') -> 'TestSchema'`, () => {
      expect(makeRef('#/components/schemas/Test')).toBe('TestSchema')
    })
    it.concurrent(`makeRef('#/components/parameters/Test') -> 'TestParamsSchema'`, () => {
      expect(makeRef('#/components/parameters/Test')).toBe('TestParamsSchema')
    })
    it.concurrent(`makeRef('#/components/headers/Test') -> 'TestHeaderSchema'`, () => {
      expect(makeRef('#/components/headers/Test')).toBe('TestHeaderSchema')
    })
  })
})
