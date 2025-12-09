import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi'
import { type } from './type'

// Test run
// pnpm vitest run ./src/core/type.test.ts

const openapi: OpenAPI = {
  openapi: '3.0.0',
  info: {
    title: 'Test API',
    version: '1.0.0',
  },
  components: {
    schemas: {
      Test: {
        type: 'object',
        required: ['test'],
        properties: {
          test: {
            type: 'string',
          },
        },
      },
    },
  },
  paths: {
    '/test': {
      post: {
        summary: 'Test endpoint',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Test',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful test',
          },
        },
      },
    },
  },
}

describe('type', () => {
  it('should return ok when successful', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-type-'))
    try {
      const input = path.join(dir, 'openapi.json') as
        | `${string}.yaml`
        | `${string}.json`
        | `${string}.tsp`
      const out = path.join(dir, 'index.ts') as `${string}.ts`
      fs.writeFileSync(input, JSON.stringify(openapi), 'utf-8')
      const result = await type(input, out)
      expect(result.ok).toBe(true)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
