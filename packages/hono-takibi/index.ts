import { readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function getOpenAPIFiles() {
  try {
    const dir = join(__dirname, 'openapi')
    const dirents = await readdir(dir, { withFileTypes: true })
    return dirents.map((dirent) => dirent.name)
  } catch (error) {
    console.error(error)
  }
}

// hono-takibi
async function honoTakibi(openapiFile: string) {
  const file = openapiFile.replace('.yaml', '')
  const command = `hono-takibi openapi/${openapiFile} -o route/${file}.ts`
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
  for (const openapiFile of openapiFiles) {
    await honoTakibi(openapiFile)
  }
}

HonoTakibis()
