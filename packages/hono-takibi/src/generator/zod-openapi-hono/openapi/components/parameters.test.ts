import { describe, expect, it } from 'vitest'
import { parameters } from './parameters.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/parameters.test.ts

describe('parameters', () => {
  it('parameters exportSchema false exportType false', () => {
    const result = parameters(
      {
        parameters: {
          B: {
            name: 'B',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
          },
          C: {
            name: 'C',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
          A: {
            name: 'A',
            in: 'header',
            required: false,
            schema: {
              type: 'string',
            },
          },
        },
      },
      false,
      false,
    )
    const expected = `const BParamsSchema = z.string().optional().openapi({param:{in:"query",name:"B",required:false}})



const CParamsSchema = z.string().openapi({param:{in:"path",name:"C",required:true}})



const AParamsSchema = z.string().optional().openapi({param:{in:"header",name:"A",required:false}})

`

    expect(result).toBe(expected)
  })
})
