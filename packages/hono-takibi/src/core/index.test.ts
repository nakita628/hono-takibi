import { describe, expect, it } from 'vite-plus/test'

import * as core from './index.js'

describe('core barrel exports', () => {
  it.concurrent('exposes the exact expected export names', () => {
    expect(Object.keys(core).sort()).toStrictEqual([
      'callbacks',
      'docs',
      'examples',
      'headers',
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
      'svelteQuery',
      'swr',
      'takibi',
      'tanstackQuery',
      'template',
      'test',
      'type',
      'vueQuery',
      'webhooks',
    ])
  })
})
