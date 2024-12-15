import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { main } from '.'

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
    const content = fs.readFileSync(output, { encoding: 'utf-8' })
    // TODO: test the content
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
    } catch (error) {
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })
})
