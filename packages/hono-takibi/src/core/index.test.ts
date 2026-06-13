import { describe, expect, it } from 'vite-plus/test'

import * as core from './index.js'

describe('core barrel exports', () => {
  it.concurrent('exposes the exact expected export names', () => {
    expect(Object.keys(core).sort()).toStrictEqual([
      'callbacks',
      'components',
      'defineTemplate',
      'docs',
      'examples',
      'headers',
      'hooks',
      'links',
      'mediaTypes',
      'mock',
      'parameters',
      'pathItems',
      'requestBodies',
      'responses',
      'route',
      'rpc',
      'schemas',
      'securitySchemes',
      'takibi',
      'template',
      'test',
      'type',
      'webhooks',
    ])
  })
})
