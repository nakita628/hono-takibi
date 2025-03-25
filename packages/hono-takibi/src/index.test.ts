import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import { petStoreOpenAPIExpected } from '../data/expected/pet-store-openapi'

describe('Hono Takibi', () => {
  beforeAll(() => {
    if (!fs.existsSync('route')) {
      fs.mkdirSync('route', { recursive: true })
    }
  })

  afterAll(() => {
    if (fs.existsSync('route/pet-store.ts')) {
      fs.unlinkSync('route/pet-store.ts')
    }
    if (fs.existsSync('route') && fs.readdirSync('route').length === 0) {
      fs.rmdirSync('route')
    }
  })

  // test failed yaml
  it('failed yaml', async () => {
    // 1. set a failed yaml file
    const failedYaml = path.join('openapi/failed.yaml')
    try {
      // CLI
      execSync(`node ${path.resolve('dist/index.js')} ${failedYaml} -o route/failed.ts`, {
        stdio: 'pipe',
      })
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toMatch(
          new RegExp(
            [
              'Error parsing .+/packages/hono-takibi/openapi/failed\\.yaml: bad indentation of a mapping entry \\(15:5\\)',
              '',
              ' 12 \\|           type: string',
              ' 13 \\|       required:',
              ' 14 \\|         - message',
              ' 15 \\|     Post:',
              '----------\\^',
              ' 16 \\|       type: object',
              ' 17 \\|       properties:',
            ].join('\n'),
          ),
        )
      }
    }
  })

  // test CLI error
  it('CLI error', async () => {
    const openapiYaml = path.join('openapi/pet-store.yaml')
    try {
      // CLI
      execSync(`node ${path.resolve('dist/index.js')} ${openapiYaml} route/pet-store.ts`, {
        stdio: 'pipe',
      })
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  // test the normal system
  it('Hono Takibi CLI pet-store.yaml', async () => {
    const openapiYaml = path.join('openapi/pet-store.yaml')
    // CLI
    execSync(`node ${path.resolve('dist/index.js')} ${openapiYaml} -o route/pet-store.ts`, {
      stdio: 'pipe',
    })
    const result = fs.readFileSync('route/pet-store.ts', { encoding: 'utf-8' })
    const expected = petStoreOpenAPIExpected

    expect(result).toBe(expected)
  })

  // test CLI error
  it('Hono Takibi CLI --naming-case-type faild', async () => {
    const openapiYaml = path.join('openapi/abcde.yaml')
    // CLI
    try {
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiYaml} -o route/abcde.ts --naming-case-type faild`,
        {
          stdio: 'pipe',
        },
      )
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toMatch(
        /Command failed: node .+\/dist\/index\.js.+--naming-case-type faild/,
      )
    }
  })

  it('Hono Takibi CLI --naming-case-type faild', async () => {
    const openapiYaml = path.join('openapi/abcde.yaml')
    // CLI
    try {
      execSync(
        `node ${path.resolve('dist/index.js')} ${openapiYaml} -o route/abcde.ts --naming-case-type camelCase`,
        {
          stdio: 'pipe',
        },
      )
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      expect(e.message).toMatch(
        /Command failed: node .+\/dist\/index\.js.+--naming-case-type camelCase/,
      )
    }
  })
})
