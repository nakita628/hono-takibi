import { spawn } from 'node:child_process'
import { getOpenAPIFiles, printFailures, WORKERS } from './common'

const runRoute = (
  file: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = []
    const child = spawn(
      'hono-takibi',
      [`openapi/${file}`, '-o', `routes/${file.replace(/\.(yaml|json|tsp)$/i, '.ts')}`],
      {
        stdio: ['ignore', 'ignore', 'pipe'],
        shell: false,
      },
    )
    child.stderr.on('data', (chunk: Buffer) => chunks.push(chunk))
    child.on('close', (code) => {
      resolve(
        code === 0
          ? { ok: true, value: file }
          : { ok: false, error: `${file}: ${Buffer.concat(chunks).toString()}` },
      )
    })
  })

async function main() {
  const files = await getOpenAPIFiles()
  const queue = [...files]
  const results: (
    | { readonly ok: true; readonly value: string }
    | { readonly ok: false; readonly error: string }
  )[] = []

  console.log('Generating routes...')
  await Promise.all(
    Array.from({ length: Math.min(WORKERS, files.length) }, async () => {
      while (queue.length > 0) {
        const file = queue.pop()
        if (file) results.push(await runRoute(file))
      }
    }),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)
  printFailures(failures, results.length, 'route files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} routes generated successfully`)
}

main()
