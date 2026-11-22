import * as NodeServices from '@effect/platform-node/NodeServices'
import { Effect } from 'effect'

import { parseConfig } from '../config/index.js'
import { FormatOptions } from '../format/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import {
  cleanSplitOutputs,
  documentWarnings,
  makeJob,
  openAPI3,
  packageRoots,
} from '../shared/index.js'

/**
 * Runs a config as the CLI runs `hono-takibi.config.ts`, for a program that generates code
 * itself: the config is checked as a config file's default export is, the document read, and
 * every output written. Paths are taken from the working directory, as in a config file.
 * Answers the lines the CLI would print; rejects with the message the CLI would print.
 *
 * @example
 * ```ts
 * import { generate } from 'hono-takibi/generate'
 *
 * await generate({ input: 'openapi.yaml', output: './src/index.ts', template: { define: true } })
 * ```
 */
export function generate(config: unknown) {
  return Effect.gen(function* () {
    const parsed = yield* parseConfig(config)
    const document = yield* parseOpenAPI(parsed.input)
    const openAPI = yield* openAPI3(document, parsed.input)
    const jobs = makeJob(openAPI, parsed, yield* packageRoots(openAPI, parsed))
    yield* cleanSplitOutputs(jobs.filter((job) => job.split).map((job) => job.output))
    const messages = yield* Effect.forEach(jobs, (job) => job.run(job.output), {
      concurrency: 'unbounded',
    }).pipe(Effect.provideService(FormatOptions, parsed.format ?? {}))
    return [...messages, ...documentWarnings(document)]
      .filter((message) => message !== '')
      .join('\n')
  }).pipe(
    Effect.mapError((error) => new Error(error.message)),
    Effect.provide(NodeServices.layer),
    Effect.runPromise,
  )
}
