import { describe, expect, it } from 'vite-plus/test'

import * as components from './index.js'

describe('components barrel export', () => {
  it.concurrent('exposes the exact expected export names', () => {
    expect(Object.keys(components).sort()).toStrictEqual([
      'callbacks',
      'examples',
      'headers',
      'links',
      'mediaTypes',
      'parameters',
      'pathItems',
      'requestBodies',
      'responses',
      'schemas',
      'securitySchemes',
    ])
  })
})
