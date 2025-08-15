import { exec } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { core } from '../../../packages/hono-takibi/src/core/core.js'
import { honoRpc } from '../../../packages/hono-takibi/src/generator/rpc/index.js'
import { honoSWRHooks } from '../../../packages/hono-takibi/src/generator/swr/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function getOpenAPIFiles() {
  try {
    const dir = join(__dirname, '../openapi')
    const dirents = await readdir(dir, { withFileTypes: true })
    return dirents.map((dirent) => dirent.name)
  } catch (error) {
    console.error(error)
  }
}

async function honoTakibiNormal(openapiFile: string) {
  const file = openapiFile.replace('.yaml', '').replace('.json', '').replace('.tsp', '')
  const command = `hono-takibi openapi/${openapiFile} -o routes/${file}.ts`
  exec(command, (error, stdout) => {
    if (error) {
      console.error(`Error executing command: ${error}`)
      return
    }
    console.log(stdout)
  })
}

async function HonoTakibis() {
  const openapiFiles = await getOpenAPIFiles()
  if (!openapiFiles) {
    console.error('No openapi files found')
    return
  }
  await Promise.all([...openapiFiles.map(honoTakibiNormal)])
}

async function honoRpcs() {
  const openapiFiles = await getOpenAPIFiles()
  if (openapiFiles) {
    for (const openapiFile of openapiFiles) {
      const file = openapiFile.replace('.yaml', '').replace('.json', '').replace('.tsp', '')
      const isYamlOrJsonOrTsp = (
        i: string,
      ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
        i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
      if (isYamlOrJsonOrTsp(openapiFile)) {
        await core(
          `openapi/${openapiFile}`,
          `rpcs/${file}.ts`,
          "import { client } from '../index.ts'",
          'Generated RPC code written to',
          honoRpc,
        )
      }
    }
  }
}

async function honoSwrs() {
  const openapiFiles = await getOpenAPIFiles()
  if (openapiFiles) {
    for (const openapiFile of openapiFiles) {
      const file = openapiFile.replace('.yaml', '').replace('.json', '').replace('.tsp', '')
      const isYamlOrJsonOrTsp = (
        i: string,
      ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
        i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
      if (isYamlOrJsonOrTsp(openapiFile)) {
        await core(
          `openapi/${openapiFile}`,
          `swrs/${file}.ts`,
          "import { client } from '../index.ts'",
          'Generated RPC code written to',
          honoSWRHooks,
        )
      }
    }
  }
}

HonoTakibis()
honoRpcs()
honoSwrs()
