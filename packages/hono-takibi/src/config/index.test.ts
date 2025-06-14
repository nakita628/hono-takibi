import { describe, it, expect } from 'vitest'
import { getConfig, DEFAULT_CONFIG } from './index.js'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('_config', () => {
  it.concurrent('returns ok with DEFAULT_CONFIG when no file exists', () => {
    const result = getConfig()
    expect(result).toStrictEqual({ ok: true, value: DEFAULT_CONFIG })
  })
})
