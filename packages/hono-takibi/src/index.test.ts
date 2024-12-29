import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { main } from '.'
import { petStoreZodOpenAPIHonoCode } from './data/expected/pet-store-openapi'

describe('Hono Takibi', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(__dirname, '..')
  const input = path.join(projectRoot, 'example/pet-store.yaml')
  const output = path.join(projectRoot, 'routes/petstore-index.ts')

  beforeEach(() => {
    // 1. create test directory
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    // 2. create directory if it does not exist
    if (!fs.existsSync(`${projectRoot}/routes`)) {
      fs.mkdirSync(`${projectRoot}/routes`, { recursive: true })
    }
    // 3. set as CLI argument
    process.argv = ['/usr/local/bin/node', `/${projectRoot}/dist/index.js`, input, '-o', output]
  })

  afterEach(() => {
    // 1. reset Mock
    vi.restoreAllMocks()
    // 2. remove output file if it exists
    if (fs.existsSync(output)) {
      fs.rmSync(output, { recursive: true })
    }
  })

  // test the normal system
  it.concurrent('Hono Takibi CLI', async () => {
    await main(true)
    expect(fs.existsSync(output)).toBe(true)
    const result = fs.readFileSync(output, { encoding: 'utf-8' })
    const expected = petStoreZodOpenAPIHonoCode
    expect(result).toEqual(expected)
  })

  // test failed yaml
  it.concurrent('failed yaml', async () => {
    // 1. set a failed yaml file
    const failedYaml = path.join(projectRoot, 'example/failed.yaml')
    // 2. set as CLI argument
    process.argv[2] = failedYaml
    // 3. spy on console.error
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(e.message).toBe(
        `Cannot destructure property 'schemas' of 'components' as it is undefined.`,
      )
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })

  // test for missing arguments
  it('should handle missing arguments', async () => {
    process.argv = ['/usr/local/bin/node', 'test']
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(e.message).toBe('Expected a file path, URL, or object. Got undefined')
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })

  // testing for error systems
  it.concurrent('should handle invalid input file path', async () => {
    // 1. set a nonexistent file path
    const nonExistentFile = path.join(projectRoot, 'test.yaml')
    // 2. set as CLI argument
    process.argv[2] = nonExistentFile
    // 3. spy on console.error
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })
})
