import { describe, expect, it } from 'vitest'
import * as components from './index.js'

describe('components barrel export', () => {
  it('exports callbacks function', () => {
    expect(typeof components.callbacks).toBe('function')
  })

  it('exports examples function', () => {
    expect(typeof components.examples).toBe('function')
  })

  it('exports headers function', () => {
    expect(typeof components.headers).toBe('function')
  })

  it('exports links function', () => {
    expect(typeof components.links).toBe('function')
  })

  it('exports mediaTypes function', () => {
    expect(typeof components.mediaTypes).toBe('function')
  })

  it('exports parameters function', () => {
    expect(typeof components.parameters).toBe('function')
  })

  it('exports pathItems function', () => {
    expect(typeof components.pathItems).toBe('function')
  })

  it('exports requestBodies function', () => {
    expect(typeof components.requestBodies).toBe('function')
  })

  it('exports responses function', () => {
    expect(typeof components.responses).toBe('function')
  })

  it('exports schemas function', () => {
    expect(typeof components.schemas).toBe('function')
  })

  it('exports securitySchemes function', () => {
    expect(typeof components.securitySchemes).toBe('function')
  })

  it('exports exactly 11 functions', () => {
    const exportedKeys = Object.keys(components)
    expect(exportedKeys.length).toBe(11)
  })
})
