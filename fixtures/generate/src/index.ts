import { exec } from 'node:child_process'
import type { Dirent } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { core } from 'hono-takibi/core'
import { rpc } from 'hono-takibi/rpc'

// import { honoSWRHooks } from '../../../packages/hono-takibi/src/generator/swr/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function getOpenAPIFiles(): Promise<
  | {
      ok: true
      value: (`${string}.yaml` | `${string}.json` | `${string}.tsp`)[]
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    const dir = join(__dirname, '../openapi')
    const dirents = await readdir(dir, { withFileTypes: true })
    const result = dirents
      .filter(
        (d): d is Dirent & { name: `${string}.yaml` | `${string}.json` | `${string}.tsp` } =>
          d.isFile() &&
          (d.name.endsWith('.yaml') || d.name.endsWith('.json') || d.name.endsWith('.tsp')),
      )
      .map((d) => d.name)
    return {
      ok: true,
      value: result,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

async function honoTakibi(i: string) {
  const file = i.replace(/\.(yaml|json|tsp)$/i, '')
  const command = `hono-takibi openapi/${i} -o routes/${file}.ts`
  exec(command, (error, stdout) => {
    if (error) {
      console.error(`Error executing command: ${error}`)
      return
    }
    console.log(stdout)
  })
}

async function HonoTakibis() {
  const result = await getOpenAPIFiles()
  if (!result.ok) {
    console.error(`Error getting OpenAPI files: ${result.error}`)
    return
  }
  await Promise.all([...result.value.map(honoTakibi)])
}

async function honoRpcs() {
  const result = await getOpenAPIFiles()
  if (!result.ok) {
    console.error(`Error getting OpenAPI files: ${result.error}`)
    return
  }

  const isYamlOrJsonOrTsp = (
    i: string,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')

  const targets = result.value.filter(isYamlOrJsonOrTsp)

  await Promise.all(
    targets.map((name) => {
      console.log(`[START] Generating RPC for ${name}`)
      const file = name.replace(/\.(yaml|json|tsp)$/i, '')
      return core(
        `openapi/${name}`,
        `rpcs/${file}.ts`,
        "import { client } from '../index.ts'",
        'Generated RPC code written to',
        rpc,
      )
    }),
  )
}

// async function honoSwrs() {
//   const openapiFiles = await getOpenAPIFiles()
//   if (openapiFiles) {
//     for (const openapiFile of openapiFiles) {
//       const file = openapiFile.replace('.yaml', '').replace('.json', '').replace('.tsp', '')
//       const isYamlOrJsonOrTsp = (
//         i: string,
//       ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
//         i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
//       if (isYamlOrJsonOrTsp(openapiFile)) {
//         await core(
//           `openapi/${openapiFile}`,
//           `swrs/${file}.ts`,
//           "import { client } from '../index.ts'",
//           'Generated RPC code written to',
//           honoSWRHooks,
//         )
//       }
//     }
//   }
// }

await HonoTakibis()
await honoRpcs()
// honoSwrs()
