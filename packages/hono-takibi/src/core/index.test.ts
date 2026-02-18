import { describe, expect, it } from 'vitest'
import * as core from './index.js'

describe('core barrel exports', () => {
  it('should export makeQueryHooks', () => {
    expect(typeof core.makeQueryHooks).toBe('function')
  })

  it('should export component functions', () => {
    expect(typeof core.callbacks).toBe('function')
    expect(typeof core.examples).toBe('function')
    expect(typeof core.headers).toBe('function')
    expect(typeof core.links).toBe('function')
    expect(typeof core.mediaTypes).toBe('function')
    expect(typeof core.parameters).toBe('function')
    expect(typeof core.pathItems).toBe('function')
    expect(typeof core.requestBodies).toBe('function')
    expect(typeof core.responses).toBe('function')
    expect(typeof core.schemas).toBe('function')
    expect(typeof core.securitySchemes).toBe('function')
  })

  it('should export generation functions', () => {
    expect(typeof core.docs).toBe('function')
    expect(typeof core.mock).toBe('function')
    expect(typeof core.route).toBe('function')
    expect(typeof core.rpc).toBe('function')
    expect(typeof core.svelteQuery).toBe('function')
    expect(typeof core.swr).toBe('function')
    expect(typeof core.takibi).toBe('function')
    expect(typeof core.tanstackQuery).toBe('function')
    expect(typeof core.template).toBe('function')
    expect(typeof core.test).toBe('function')
    expect(typeof core.type).toBe('function')
    expect(typeof core.vueQuery).toBe('function')
    expect(typeof core.webhooks).toBe('function')
  })
})
