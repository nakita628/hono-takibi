import { spawn } from 'node:child_process'
import { getOpenAPIFiles, printFailures, type Result, WORKERS } from './common'

const runReadonlyRoute = (file: string): Promise<Result> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = []
    const child = spawn(
      'hono-takibi',
      [
        `openapi/${file}`,
        '-o',
        `readonly-routes/${file.replace(/\.(yaml|json|tsp)$/i, '.ts')}`,
        '--readonly',
      ],
      {
        stdio: ['ignore', 'ignore', 'pipe'],
        shell: false,
      },
    )
    child.stderr.on('data', (chunk: Buffer) => chunks.push(chunk))
    child.on('close', (code) => {
      resolve(
        code === 0
          ? { file, success: true }
          : { file, success: false, stderr: Buffer.concat(chunks).toString() },
      )
    })
  })

async function main() {
  const files = await getOpenAPIFiles()
  const queue = [...files]
  const results: Result[] = []

  console.log('Generating readonly routes...')
  await Promise.all(
    Array.from({ length: Math.min(WORKERS, files.length) }, async () => {
      while (queue.length > 0) {
        const file = queue.pop()
        if (file) results.push(await runReadonlyRoute(file))
      }
    }),
  )

  const failures = results.filter((r): r is Extract<Result, { success: false }> => !r.success)
  printFailures(failures, results.length, 'readonly route files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} readonly routes generated successfully`)
}

main()
