import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { components } from './output.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('components', () => {
  it('returns success message when openAPI has no components', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-components-'))
    const output = path.join(tmpDir, 'components.ts')
    const openAPI = {
      openapi: '3.0.0',
      info: { title: 't', version: '1' },
      paths: {},
    } as unknown as OpenAPI
    const result = await components(openAPI, output)
    expect(result).toStrictEqual({ ok: true, value: 'No components found' })
  })

  it('writes all components into a single file', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-components-'))
    const output = path.join(tmpDir, 'components.ts')
    const openAPI = {
      openapi: '3.0.0',
      info: { title: 't', version: '1' },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: { id: { type: 'string' }, name: { type: 'string' } },
            required: ['id', 'name'],
          },
        },
      },
      paths: {},
    } as unknown as OpenAPI
    const result = await components(openAPI, output)
    expect(result).toStrictEqual({
      ok: true,
      value: `Generated components code written to ${output}`,
    })
    const content = fs.readFileSync(output, 'utf-8')
    expect(content).toBe(`import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')
`)
  })
})
