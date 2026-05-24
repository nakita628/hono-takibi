import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { pathItemsCode } from '../../generator/zod-openapi-hono/openapi/components/pathItems.js'
import type { Components } from '../../openapi/index.js'
import { pathItems } from './pathItems.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('pathItems', () => {
  it('returns error when pathItemsConfig is undefined', async () => {
    const result = await pathItems({}, undefined)
    expect(result).toStrictEqual({ ok: false, error: 'pathItems.output is required' })
  })

  it('returns error when pathItemsConfig.output is missing', async () => {
    const result = await pathItems({}, {} as { output: string })
    expect(result).toStrictEqual({ ok: false, error: 'pathItems.output is required' })
  })

  it('returns error when no pathItems in components', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
    const output = path.join(tmpDir, 'pathItems.ts')
    const result = await pathItems({}, { output })
    expect(result).toStrictEqual({ ok: false, error: 'No pathItems found' })
  })

  it('returns success message when pathItems is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
    const output = path.join(tmpDir, 'pathItems.ts')
    const result = await pathItems({ pathItems: {} }, { output })
    expect(result).toStrictEqual({ ok: true, value: 'No pathItems found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output },
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated pathItems code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('writes single file with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output },
        undefined,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated pathItems code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
            PostOperations: {
              post: {
                responses: {
                  '201': {
                    description: 'Created',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { title: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output, split: true },
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated PathItem code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'userOperationsPathItem.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'postOperationsPathItem.ts'))).toBe(true)

      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf-8')
      expect(indexContent.length > 0).toBe(true)

      const userContent = fs.readFileSync(path.join(output, 'userOperationsPathItem.ts'), 'utf-8')
      expect(userContent.length > 0).toBe(true)
    })

    it('writes single file in split mode with .ts suffix in output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems.ts')
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output, split: true },
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated PathItem code written to ${outDir}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(outDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(outDir, 'userOperationsPathItem.ts'))).toBe(true)
    })

    it('writes split files with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output, split: true },
        undefined,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated PathItem code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'userOperationsPathItem.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('writes split files with componentsConfig', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems')
      const schemasOutput = path.join(tmpDir, 'schemas.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: {
                responses: {
                  '200': {
                    description: 'OK',
                    content: {
                      'application/json': {
                        schema: { type: 'object', properties: { id: { type: 'string' } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        { output, split: true },
        { schemas: { output: schemasOutput } },
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated PathItem code written to ${output}/*.ts (index.ts included)`,
      })
    })
  })

  describe('pathItemsSrc returns empty', () => {
    it('returns no pathItems found when pathItems contain only $ref entries', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const output = path.join(tmpDir, 'pathItems.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: { $ref: '#/components/pathItems/SharedOps' },
          },
        },
        { output },
      )
      expect(result).toStrictEqual({ ok: true, value: 'No pathItems found' })
    })
  })

  describe('emit error propagation', () => {
    it('propagates emit failure in non-split mode when output path is unwritable', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const blockingFile = path.join(tmpDir, 'block')
      fs.writeFileSync(blockingFile, 'x')
      const output = path.join(blockingFile, 'pathItems.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: { responses: { '200': { description: 'OK' } } },
            },
          },
        },
        { output },
      )
      expect(result).toStrictEqual({
        ok: false,
        error: `EEXIST: file already exists, mkdir '${blockingFile}'`,
      })
    })

    it('propagates emit failure in split mode when output parent is a regular file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-'))
      const blockingFile = path.join(tmpDir, 'block')
      fs.writeFileSync(blockingFile, 'x')
      const output = path.join(blockingFile, 'pathItems.ts')
      const result = await pathItems(
        {
          pathItems: {
            UserOperations: {
              get: { responses: { '200': { description: 'OK' } } },
            },
            AdminOperations: {
              get: { responses: { '200': { description: 'OK' } } },
            },
          },
        },
        { output, split: true },
      )
      expect(result.ok).toBe(false)
    })
  })

  describe('caller ≡ generator contract', () => {
    const components: Components = {
      pathItems: {
        UserOps: { get: { responses: { '200': { description: 'OK' } } } },
        AdminOps: { post: { responses: { '201': { description: 'Created' } } } },
      },
    }

    it('non-split: caller emit contains same const names as generator output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-contract-'))
      const output = path.join(tmpDir, 'pathItems.ts')
      const result = await pathItems(components, { output })
      expect(result.ok).toBe(true)
      const emitted = fs.readFileSync(output, 'utf-8')
      const generated = pathItemsCode(components, true)
      const emittedNames = new Set(
        [...emitted.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)PathItem/g)].map(
          (m) => m[1],
        ),
      )
      const generatedNames = new Set(
        [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)PathItem/g)].map(
          (m) => m[1],
        ),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })

    it('split: union of per-file const names equals generator output const names', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-contract-'))
      const output = path.join(tmpDir, 'pathItems')
      const result = await pathItems(components, { output, split: true })
      expect(result.ok).toBe(true)
      const files = fs.readdirSync(output).filter((f) => f !== 'index.ts')
      const emittedNames = new Set<string>()
      for (const f of files) {
        const src = fs.readFileSync(path.join(output, f), 'utf-8')
        for (const m of src.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)PathItem/g)) {
          if (m[1] !== undefined) emittedNames.add(m[1])
        }
      }
      const generated = pathItemsCode(components, true)
      const generatedNames = new Set(
        [...generated.matchAll(/(?:export\s+)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)PathItem/g)].map(
          (m) => m[1],
        ),
      )
      expect(emittedNames).toStrictEqual(generatedNames)
    })

    it('split: barrel index lists every per-file module', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-contract-'))
      const output = path.join(tmpDir, 'pathItems')
      await pathItems(components, { output, split: true })
      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf-8')
      expect(indexContent).toBe(
        "export * from './adminOpsPathItem'\nexport * from './userOpsPathItem'\n",
      )
    })

    it('split: emits only inline entries when $ref-only entries are mixed in', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-pathItems-contract-'))
      const output = path.join(tmpDir, 'pathItems')
      const mixed: Components = {
        pathItems: {
          Inline: { get: { responses: { '200': { description: 'OK' } } } },
          RefOnly: { $ref: '#/components/pathItems/Shared' },
        },
      }
      await pathItems(mixed, { output, split: true })
      const files = fs
        .readdirSync(output)
        .filter((f) => f !== 'index.ts')
        .sort()
      expect(files).toStrictEqual(['inlinePathItem.ts'])
      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf-8')
      expect(indexContent).toBe("export * from './inlinePathItem'\n")
    })
  })
})
