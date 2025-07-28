// import { exec } from 'node:child_process'
// import { readdir } from 'node:fs/promises'
// import { dirname, join } from 'node:path'
// import { fileURLToPath } from 'node:url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// async function getOpenAPIFiles() {
//   try {
//     const dir = join(__dirname, 'openapi')
//     const dirents = await readdir(dir, { withFileTypes: true })
//     return dirents.map((dirent) => dirent.name)
//   } catch (error) {
//     console.error(error)
//   }
// }

// async function honoTakibiNormal(openapiFile: string) {
//   const file = openapiFile.replace('.yaml', '').replace('.json', '').replace('.tsp', '')
//   const command = `hono-takibi openapi/${openapiFile} -o routes/${file}.ts`
//   exec(command, (error, stdout) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`)
//       return
//     }
//     console.log(stdout)
//   })
// }

// async function HonoTakibis() {
//   const openapiFiles = await getOpenAPIFiles()
//   if (!openapiFiles) {
//     console.error('No openapi files found')
//     return
//   }
//   await Promise.all([...openapiFiles.map(honoTakibiNormal)])
// }

// HonoTakibis()

import { z } from '@hono/zod-openapi'

const valid = z.int().positive().safeParse(0) // { success: true }
if (valid.success) {
  console.log('Valid number:', valid.data)
} else {
  console.error('Validation failed:', valid.error)
}
