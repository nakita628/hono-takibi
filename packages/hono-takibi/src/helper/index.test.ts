import { describe, expect, it } from 'vitest'
import * as helper from './index.js'

describe('helper barrel file exports', () => {
  it('should export ast', () => {
    expect(typeof helper.ast).toBe('function')
  })
  it('should export wrap', () => {
    expect(typeof helper.wrap).toBe('function')
  })
})
