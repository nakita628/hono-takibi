#!/usr/bin/env node
import { readFileSync } from 'node:fs'

// Deep imports, not the package barrel: the barrel eagerly pulls in the HTTP,
// SQL and cluster modules and costs ~300ms of CLI startup.
import * as NodeRuntime from '@effect/platform-node/NodeRuntime'
import * as NodeServices from '@effect/platform-node/NodeServices'
import { Effect } from 'effect'

import { run } from './cli/index.js'

/**
 * Version reported by `--version`.
 *
 * Both `src/index.ts` and the bundled `dist/cli.js` sit one directory below the
 * package manifest, so the same relative URL resolves in dev and after packing.
 */
function version(): string {
  try {
    const pkg: unknown = JSON.parse(
      readFileSync(new URL('../package.json', import.meta.url), 'utf-8'),
    )
    return typeof pkg === 'object' &&
      pkg !== null &&
      'version' in pkg &&
      typeof pkg.version === 'string'
      ? pkg.version
      : '0.0.0'
  } catch {
    return '0.0.0'
  }
}

NodeRuntime.runMain(run(process.argv.slice(2), version()).pipe(Effect.provide(NodeServices.layer)))
