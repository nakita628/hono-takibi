import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { mediaTypes } from './mediaTypes.js'

let tmpDir: string

afterEach(() => {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
})

describe('mediaTypes', () => {
  it('returns error when mediaTypes is undefined', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
    const output = path.join(tmpDir, 'mediaTypes.ts')
    const result = await Effect.runPromise(
      Effect.flip(Effect.provide(mediaTypes(undefined, output, false), NodeFileSystem.layer)),
    )
    expect(result.message).toBe('No mediaTypes found')
  })

  it('returns success message when mediaTypes is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
    const output = path.join(tmpDir, 'mediaTypes.ts')
    const result = await Effect.runPromise(
      Effect.provide(mediaTypes({}, output, false), NodeFileSystem.layer),
    )
    expect(result).toBe('No mediaTypes found')
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
            },
            output,
            false,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated mediaTypes code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf8')
      expect(content.length).toBeGreaterThan(0)
    })
  })

  describe('non-split mode, readonly', () => {
    it('writes single file with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
            },
            output,
            false,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated mediaTypes code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
    })

    it('writes single file with $ref entry', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              AliasMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
            },
            output,
            false,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated mediaTypes code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf8')
      expect(content.length).toBeGreaterThan(0)
    })

    it('writes single file with unknown structure fallback', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              UnknownMedia: { someUnknownKey: 'value' } as never,
            },
            output,
            false,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated mediaTypes code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
    })

    it('writes single file with multiple entries', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
              XmlMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
            output,
            false,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated mediaTypes code written to ${output}`)
      expect(fs.existsSync(output)).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
              XmlMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
            output,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated MediaType code written to ${output}/*.ts (index.ts included)`)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'jsonMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'xmlMedia.ts'))).toBe(true)
    })

    it('writes split files with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
            },
            output,
            true,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated MediaType code written to ${output}/*.ts (index.ts included)`)
      expect(fs.existsSync(path.join(output, 'jsonMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('handles $ref references in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              AliasMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
            },
            output,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated MediaType code written to ${output}/*.ts (index.ts included)`)
      expect(fs.existsSync(path.join(output, 'aliasMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)

      const content = fs.readFileSync(path.join(output, 'aliasMedia.ts'), 'utf8')
      expect(content.length).toBeGreaterThan(0)
    })

    it('handles unknown structure fallback in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              UnknownMedia: { someUnknownKey: 'value' } as never,
            },
            output,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated MediaType code written to ${output}/*.ts (index.ts included)`)
      expect(fs.existsSync(path.join(output, 'unknownMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('writes split files with .ts suffix in output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonMedia: {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
            },
            output,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated MediaType code written to ${outDir}/*.ts (index.ts included)`)
      expect(fs.existsSync(path.join(outDir, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(outDir, 'jsonMedia.ts'))).toBe(true)
    })

    // -----------------------------------------------------------------
    // Regression: split mode previously bypassed makeImports entirely, so a
    // mediaType whose schema is `$ref: '#/components/schemas/User'` would
    // emit `export const JsonUserMediaTypeSchema = UserSchema` with NO
    // `import { UserSchema }` line. Below tests lock in the cross-component
    // import resolution and the path-alias forwarding from `components`
    // config.
    // -----------------------------------------------------------------
    it('imports referenced schema in split mode (relative path)', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonUser: { schema: { $ref: '#/components/schemas/User' } },
            },
            output,
            true,
            false,
            { schemas: { output: path.join(tmpDir, 'schemas'), split: true } },
          ),
          NodeFileSystem.layer,
        ),
      )
      const content = fs.readFileSync(path.join(output, 'jsonUser.ts'), 'utf8')
      // Must include an actual `import { UserSchema } from ...` line — not
      // just the body reference.
      expect(content).toBe(`import { UserSchema } from '../schemas'

export const JsonUserMediaTypeSchema = UserSchema
`)
    })

    it('uses path-alias `import` field when forwarding schema reference', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonUser: { schema: { $ref: '#/components/schemas/User' } },
            },
            output,
            true,
            false,
            {
              schemas: {
                output: path.join(tmpDir, 'schemas'),
                split: true,
                specifier: () => '~/components/schemas',
              },
            },
          ),
          NodeFileSystem.layer,
        ),
      )
      const content = fs.readFileSync(path.join(output, 'jsonUser.ts'), 'utf8')
      // Alias must be honored verbatim — no relative-path fallback.
      expect(content).toBe(`import { UserSchema } from '~/components/schemas'

export const JsonUserMediaTypeSchema = UserSchema
`)
    })

    it('does not emit an unused `z` import when only a $ref is present', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              JsonUser: { schema: { $ref: '#/components/schemas/User' } },
            },
            output,
            true,
            false,
            { schemas: { output: path.join(tmpDir, 'schemas'), split: true } },
          ),
          NodeFileSystem.layer,
        ),
      )
      const content = fs.readFileSync(path.join(output, 'jsonUser.ts'), 'utf8')
      // The body has no `z.` usage; an unused `import { z } from '@hono/zod-openapi'`
      // would be dead weight that breaks `noUnusedImports` lints.
      expect(content).toBe(`import { UserSchema } from '../schemas'

export const JsonUserMediaTypeSchema = UserSchema
`)
    })

    it('generates sorted barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              ZooMedia: {
                schema: { type: 'object', properties: { zoo: { type: 'boolean' } } },
              },
              AlphaMedia: {
                schema: { type: 'object', properties: { alpha: { type: 'string' } } },
              },
            },
            output,
            true,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated MediaType code written to ${output}/*.ts (index.ts included)`)
      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf8')
      const lines = indexContent.trim().split('\n')
      expect(lines).toHaveLength(2)
      expect(lines[0]).toBe("export * from './alphaMedia'")
      expect(lines[1]).toBe("export * from './zooMedia'")
    })
  })

  describe('single file (#607)', () => {
    it('imports the schema a media type names and declares an alias after its target', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      await Effect.runPromise(
        Effect.provide(
          mediaTypes(
            {
              AliasMedia: { $ref: '#/components/mediaTypes/JsonTag' },
              JsonTag: { schema: { $ref: '#/components/schemas/Tag' } },
            },
            output,
            false,
          ),
          NodeFileSystem.layer,
        ),
      )
      expect(fs.readFileSync(output, 'utf8')).toBe(
        "import { TagSchema } from './schemas'\n\nexport const JsonTagMediaTypeSchema = TagSchema\n\nexport const AliasMediaMediaTypeSchema = JsonTagMediaTypeSchema\n",
      )
    })
  })
})
