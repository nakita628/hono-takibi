import { describe, expect, it } from 'vitest'
import { examples } from './examples.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/examples.test.ts

describe('examples', () => {
  it('examples exportExamples false', () => {
    const result = examples(
      {
        examples: {
          B: {
            value: {
              B: 'https://example.com/B',
              C: {
                B: 'https://example.com/C',
                A: {
                  B: 'https://example.com/A',
                  A: 'A',
                },
              },
            },
          },
          C: {
            value: {
              B: 'https://example.com/C',
              A: {
                B: 'https://example.com/A',
                A: 'A',
              },
            },
          },
          A: {
            value: {
              B: 'https://example.com/A',
              A: 'A',
            },
          },
        },
      },
      false,
    )

    const expected = `const BExample = {"value":{"B":"https://example.com/B","C":{"B":"https://example.com/C","A":{"B":"https://example.com/A","A":"A"}}}}

const CExample = {"value":{"B":"https://example.com/C","A":{"B":"https://example.com/A","A":"A"}}}

const AExample = {"value":{"B":"https://example.com/A","A":"A"}}`

    expect(result).toBe(expected)
  })

  it('examples exportExamples true', () => {
    const result = examples(
      {
        examples: {
          B: {
            value: {
              B: 'https://example.com/B',
              C: {
                B: 'https://example.com/C',
                A: {
                  B: 'https://example.com/A',
                  A: 'A',
                },
              },
            },
          },
          C: {
            value: {
              B: 'https://example.com/C',
              A: {
                B: 'https://example.com/A',
                A: 'A',
              },
            },
          },
          A: {
            value: {
              B: 'https://example.com/A',
              A: 'A',
            },
          },
        },
      },
      true,
    )

    const expected = `export const BExample = {"value":{"B":"https://example.com/B","C":{"B":"https://example.com/C","A":{"B":"https://example.com/A","A":"A"}}}}

export const CExample = {"value":{"B":"https://example.com/C","A":{"B":"https://example.com/A","A":"A"}}}

export const AExample = {"value":{"B":"https://example.com/A","A":"A"}}`
    expect(result).toBe(expected)
  })
})
