// src/config/index.test.ts
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { config } from './index'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('config()', () => {
  const origCwd = process.cwd()

  beforeEach(() => {
    vi.resetModules()
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'hono-takibi-config-ts-'))
    process.chdir(tmpdir)
  })

  afterEach(() => {
    const cwd = process.cwd()
    process.chdir(origCwd)
    fs.rmSync(cwd, { recursive: true, force: true })
  })

  it('passes: legacy top-level output mode', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts',
    exportType: true,
    exportSchema: true
  },
  rpc: {
    output: 'rpc/index.ts',
    import: '../client'
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          output: 'routes/index.ts',
          exportType: true,
          exportSchema: true,
        },
        rpc: {
          output: 'rpc/index.ts',
          import: '../client',
        },
      },
    })
  })

  it('fails: config file missing', async () => {
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Config not found:/)
    }
  })

  it('fails: schema only (route missing)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas/index.ts' }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toBe(
        "Invalid config: 'zod-openapi.schema' and 'zod-openapi.route' must be defined together (both or neither).",
      )
    }
  })

  it('fails: route only (schema missing)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    route: { output: 'routes/index.ts', import: '../schemas' }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toBe(
        "Invalid config: 'zod-openapi.schema' and 'zod-openapi.route' must be defined together (both or neither).",
      )
    }
  })

  it("fails: schema+route present but top-level output also set (do NOT set 'zod-openapi.output')", async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts', // NG
    schema: { output: 'schemas/index.ts' },
    route:  { output: 'routes/index.ts', import: '../schemas' }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/do NOT set 'zod-openapi\.output'/)
    }
  })

  it('fails: schema non-split but output is directory-like (missing .ts)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {  
    schema: { output: 'schemas' }, // NG
    route:  { output: 'routes/index.ts', import: '../schemas' }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(
        /Invalid schema output path for non-split mode \(must be \.ts file\): schemas/,
      )
    }
  })

  it('fails: schema split=true but output ends with .ts', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas.ts', split: true }, // NG
    route:  { output: 'routes/index.ts', import: '../schemas' }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(
        /Invalid schema output path for split mode \(must be a directory, not \.ts\): schemas\.ts/,
      )
    }
  })

  it('fails: route split=true but output ends with .ts', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas/index.ts' },
    route:  { output: 'routes/all.ts', import: '@packages/schemas', split: true } // NG
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(
        /Invalid route output path for split mode \(must be a directory, not \.ts\): routes\/all\.ts/,
      )
    }
  })

  it('fails: route non-split but output is not .ts', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas/index.ts' },
    route:  { output: 'routes', import: '@packages/schemas' } // NG
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(
        /Invalid route output path for non-split mode \(must be \.ts file\): routes/,
      )
    }
  })

  it('fails: route.import must be string (with schema to bypass XOR)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas/index.ts' },
    route:  { output: 'routes/all.ts', import: 123 } // NG
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid route import format for zod-openapi: 123/)
    }
  })

  it('fails: legacy mode but zod-openapi.output is missing', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    exportType: true
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid output format for zod-openapi:/)
    }
  })

  it('fails: zod-openapi boolean flags must be boolean', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts',
    exportSchema: 1         // NG
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid exportSchema format for zod-openapi: 1/)
    }
  })

  it('fails: rpc.output missing', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  
  rpc: { import: '../client' }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid output format for rpc:/)
    }
  })

  it('fails: rpc.import must be string', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': { output: 'routes/index.ts' },
  rpc: {
    output: 'rpc/index.ts',
    import: true // NG
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid import format for rpc: true/)
    }
  })

  it('fails: input must end with .yaml/.json/.tsp', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yml', // NG
  'zod-openapi': { output: 'routes/index.ts' }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid input:/)
    }
  })

  it('passes: schema and route together (no top-level output)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas.ts' },
    route:  { output: 'routes/index.ts', import: '@packages/schemas' }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          schema: { output: 'schemas.ts' },
          route: { output: 'routes/index.ts', import: '@packages/schemas' },
        },
      },
    })
  })
})
