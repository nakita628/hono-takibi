import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi/index.js'
import { route } from './route.js'

const openapi = {
  openapi: '3.0.0',
  info: { title: 'Route links import override test', version: '0.0.0' },
  paths: {
    '/pets/{petId}': {
      get: {
        operationId: 'getPet',
        responses: {
          '200': {
            description: 'OK',
            links: {
              UpdateThisPet: { $ref: '#/components/links/UpdatePet' },
            },
          },
        },
      },
    },
  },
  components: {
    links: {
      UpdatePet: {
        operationId: 'updatePetStatus',
        parameters: { petId: '$response.body#/id' },
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

describe('route links import override', () => {
  it('imports link constants from explicit module specifiers over relative paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-route-links-import-override'))
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
            links: {
              output: path.join(dir, 'links'),
              split: true,
              import: '@pkg/links',
            },
          },
        },
      )

      expect(result.ok).toBe(true)

      const code = fs.readFileSync(outFile, 'utf-8')
      expect(code).toContain("from '@pkg/links'")
      expect(code).toContain('UpdatePetLink')
      expect(code).not.toContain("from './links")
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
