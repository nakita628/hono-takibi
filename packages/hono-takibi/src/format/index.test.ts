import { describe, test, expect } from 'vitest'
import { formatCode } from './index'

// Test run
// pnpm vitest run ./src/format/index.test.ts

describe('formatCode Test', () => {
  test('code format output', async ()=> {
    const result = await formatCode('const takibi="hono-takibi";')
    const expected = `const takibi = 'hono-takibi'
`
    expect(result).toBe(expected)
  })
})
