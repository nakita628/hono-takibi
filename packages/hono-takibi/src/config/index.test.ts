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
    import: "import { client } from '../index.ts'"
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
          import: "import { client } from '../index.ts'",
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

  it('fails: schema mode + top-level output together', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts', // NG
    schema: {
      output: 'schemas.ts'
    }
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

  it('fails: route mode + top-level output together', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts', // NG
    route: {
      output: 'routes/all.ts',
      import: "import { app } from './app.ts'"
    }
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

  it('passes: schema mode (non-split -> .ts) without top-level output', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: {
      output: 'schemas.ts',
      exportType: true
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          schema: {
            output: 'schemas.ts',
            exportType: true,
          },
        },
      },
    })
  })

  it('passes: schema mode (split -> dir) without top-level output', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: {
      output: 'schemas',
      split: true
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          schema: {
            output: 'schemas',
            split: true,
          },
        },
      },
    })
  })

  it('fails: schema non-split but output is directory-like (missing .ts)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {  
    schema: {
      output: 'schemas' // NG
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/non-split mode \(must be \.ts file\)/)
    }
  })

  it('fails: schema split=true but output ends with .ts', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: {
      output: 'schemas.ts', // NG
      split: true
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/split mode \(must be a directory, not \.ts\)/)
    }
  })

  it('passes: route mode (non-split -> .ts) without top-level output', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    route: {
      output: 'routes/all.ts',
      import: '@packages/schemas'
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          route: {
            output: 'routes/all.ts',
            import: '@packages/schemas',
          },
        },
      },
    })
  })

  it('passes: route mode (split -> dir) without top-level output', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    route: {
      output: 'routes',
      import: '@packages/schemas',
      split: true
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          route: {
            output: 'routes',
            import: '@packages/schemas',
            split: true,
          },
        },
      },
    })
  })

  it('fails: route split=true but output ends with .ts', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    route: {
      output: 'routes/all.ts', // NG
      import: '@packages/schemas',
      split: true
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/split mode \(must be a directory, not \.ts\)/)
    }
  })

  it('fails: route non-split but output is not .ts', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    route: {
      output: 'routes',
      import: '@packages/schemas'
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/non-split mode \(must be \.ts file\)/)
    }
  })

  // ===== 追加の否定系・境界テスト =====

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

  it('fails: rpc.output missing', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  rpc: {
    import: "import { client } from '../index.ts'"
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid output format for rpc:/)
    }
  })

  it('fails: zod-openapi boolean flags must be boolean', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts',
    exportType: 'yes',      // NG
    exportSchema: 1         // NG
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid export(Type|Schema) format/)
    }
  })

  it('fails: route.import must be string', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    route: {
      output: 'routes/all.ts',
      import: 123 // NG
    }
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Invalid route import format/)
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
      expect(result.error).toMatch(/Invalid input format/)
    }
  })

  it('fails: no default export', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = 'export const foo = {}'
    fs.writeFileSync(p, c, 'utf-8')
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Config must export default object/)
    }
  })

  it('passes: schema and route together (no top-level output)', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    schema: { output: 'schemas.ts' },
    route:  { output: 'routes/all.ts', import: '@packages/schemas' }
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
          route: { output: 'routes/all.ts', import: '@packages/schemas' },
        },
      },
    })
  })
})
