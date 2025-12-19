import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi/index.js'
import { route } from './route.js'

const openapi = {
  openapi: '3.0.0',
  info: { title: 'Import override test', version: '0.0.0' },
  paths: {
    '/pets': {
      post: {
        operationId: 'createPet',
        requestBody: { $ref: '#/components/requestBodies/PetCreateRequestBody' },
        responses: {
          '201': { $ref: '#/components/responses/PetCreatedResponse' },
        },
        callbacks: {
          petCreated: { $ref: '#/components/callbacks/PetCreatedCallback' },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
      PetCreate: {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' } },
      },
    },
    requestBodies: {
      PetCreateRequestBody: {
        description: 'Pet creation payload',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PetCreate' },
          },
        },
      },
    },
    responses: {
      PetCreatedResponse: {
        description: 'Created',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Pet' },
          },
        },
      },
    },
    callbacks: {
      PetCreatedCallback: {
        '{$request.body#/callbackUrl}': {
          post: {
            responses: {
              '200': { description: 'ok' },
            },
          },
        },
      },
    },
  },
} as OpenAPI

const isInputPath = (p: string): p is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
  p.endsWith('.yaml') || p.endsWith('.json') || p.endsWith('.tsp')

const toInputPath = (p: string): `${string}.yaml` | `${string}.json` | `${string}.tsp` => {
  if (!isInputPath(p)) throw new Error(`Invalid test input path: ${p}`)
  return p
}

describe('route import override', () => {
  it('prefers explicit module specifiers over relative paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-import-override'))
    try {
      const inputFile = path.join(dir, 'openapi.json')
      fs.writeFileSync(inputFile, JSON.stringify(openapi))
      const outFile = path.join(dir, 'routes.ts')

      const result = await route(
        toInputPath(inputFile),
        outFile,
        { output: path.join(dir, 'schemas'), split: true, import: '@pkg/schemas' },
        false,
        {
          useComponentRefs: true,
          imports: {
            requestBodies: {
              output: path.join(dir, 'requestBodies'),
              split: true,
              import: '@pkg/request-bodies',
            },
            responses: {
              output: path.join(dir, 'responses'),
              split: true,
              import: '@pkg/responses',
            },
            callbacks: {
              output: path.join(dir, 'callbacks'),
              split: true,
              import: '@pkg/callbacks',
            },
          },
        },
      )

      expect(result.ok).toBe(true)

      const code = fs.readFileSync(outFile, 'utf-8')
      expect(code).toContain("from '@pkg/request-bodies'")
      expect(code).toContain("from '@pkg/responses'")
      expect(code).toContain("from '@pkg/callbacks'")

      expect(code).not.toContain("from './requestBodies")
      expect(code).not.toContain("from './responses")
      expect(code).not.toContain("from './callbacks")
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
