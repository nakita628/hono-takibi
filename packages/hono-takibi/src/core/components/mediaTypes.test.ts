import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

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
    const result = await mediaTypes(undefined, output, false)
    expect(result).toStrictEqual({ ok: false, error: 'No mediaTypes found' })
  })

  it('returns success message when mediaTypes is empty', async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
    const output = path.join(tmpDir, 'mediaTypes.ts')
    const result = await mediaTypes({}, output, false)
    expect(result).toStrictEqual({ ok: true, value: 'No mediaTypes found' })
  })

  describe('non-split mode', () => {
    it('writes single file and returns success', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })
  })

  describe('non-split mode', () => {
    it('writes single file with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })

    it('writes single file with $ref entry', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
        {
          AliasMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
      const content = fs.readFileSync(output, 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('writes single file with unknown structure fallback', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
        {
          UnknownMedia: { someUnknownKey: 'value' } as never,
        },
        output,
        false,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })

    it('writes single file with multiple entries', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated mediaTypes code written to ${output}`,
      })
      expect(fs.existsSync(output)).toBe(true)
    })
  })

  describe('split mode', () => {
    it('writes individual files and barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'jsonMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'xmlMedia.ts'))).toBe(true)
    })

    it('writes split files with readonly flag', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'jsonMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('handles $ref references in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          AliasMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'aliasMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)

      const content = fs.readFileSync(path.join(output, 'aliasMedia.ts'), 'utf-8')
      expect(content.length > 0).toBe(true)
    })

    it('handles unknown structure fallback in split mode', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          UnknownMedia: { someUnknownKey: 'value' } as never,
        },
        output,
        true,
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      expect(fs.existsSync(path.join(output, 'unknownMedia.ts'))).toBe(true)
      expect(fs.existsSync(path.join(output, 'index.ts'))).toBe(true)
    })

    it('writes split files with .ts suffix in output', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes.ts')
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${outDir}/*.ts (index.ts included)`,
      })
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
      const result = await mediaTypes(
        {
          JsonUser: { schema: { $ref: '#/components/schemas/User' } },
        },
        output,
        true,
        false,
        { schemas: { output: path.join(tmpDir, 'schemas'), split: true } },
      )
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(path.join(output, 'jsonUser.ts'), 'utf-8')
      expect(content.includes('UserSchema')).toBe(true)
      // Must include an actual `import { UserSchema } from ...` line — not
      // just the body reference.
      const importLine = content
        .split('\n')
        .find((l) => l.startsWith('import') && l.includes('UserSchema'))
      expect(importLine).toBeDefined()
    })

    it('uses path-alias `import` field when forwarding schema reference', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
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
            import: '~/components/schemas',
          },
        },
      )
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(path.join(output, 'jsonUser.ts'), 'utf-8')
      // Alias must be honored verbatim — no relative-path fallback.
      expect(content.includes("from '~/components/schemas'")).toBe(true)
    })

    it('does not emit an unused `z` import when only a $ref is present', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
        {
          JsonUser: { schema: { $ref: '#/components/schemas/User' } },
        },
        output,
        true,
        false,
        { schemas: { output: path.join(tmpDir, 'schemas'), split: true } },
      )
      expect(result.ok).toBe(true)
      const content = fs.readFileSync(path.join(output, 'jsonUser.ts'), 'utf-8')
      // The body has no `z.` usage; an unused `import { z } from '@hono/zod-openapi'`
      // would be dead weight that breaks `noUnusedImports` lints.
      expect(content.includes("import { z } from '@hono/zod-openapi'")).toBe(false)
    })

    it('generates sorted barrel file', async () => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-mediaTypes-'))
      const output = path.join(tmpDir, 'mediaTypes')
      const result = await mediaTypes(
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
      )
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated MediaType code written to ${output}/*.ts (index.ts included)`,
      })
      const indexContent = fs.readFileSync(path.join(output, 'index.ts'), 'utf-8')
      const lines = indexContent.trim().split('\n')
      expect(lines.length).toBe(2)
      expect(lines[0]).toBe("export * from './alphaMedia.ts'")
      expect(lines[1]).toBe("export * from './zooMedia.ts'")
    })
  })
})

describe('outDir derivation (path.join + path.basename pattern)', () => {
  it('strips .ts suffix from a nested path', () => {
    const output = 'src/foo.ts'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('src/foo')
  })

  it('returns the path unchanged when no .ts suffix is present', () => {
    const output = 'src/foo'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('src/foo')
  })

  it('removes leading ./ via path.join normalization', () => {
    const output = './foo.ts'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('foo')
  })

  it('collapses consecutive slashes', () => {
    const output = 'src//foo.ts'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('src/foo')
  })

  it('preserves absolute paths', () => {
    const output = '/abs/foo.ts'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('/abs/foo')
  })

  it('handles a bare filename with .ts', () => {
    const output = 'foo.ts'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('foo')
  })

  it('only strips .ts when it appears at the end', () => {
    const output = 'src/foo.ts.bak'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('src/foo.ts.bak')
  })

  it('does not strip a non-matching extension like .tsx', () => {
    const output = 'src/foo.tsx'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('src/foo.tsx')
  })

  it('ignores a trailing slash and strips .ts from the basename', () => {
    const output = 'src/foo.ts/'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('src/foo')
  })

  it('returns "." for an empty input string', () => {
    const output = ''
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('.')
  })

  it('returns "." when the entire input equals ".ts" (basename returns empty)', () => {
    const output = '.ts'
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    expect(outDir).toBe('.')
  })
})
