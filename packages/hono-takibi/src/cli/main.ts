// Subpath imports: the package index re-exports NodeRedis, NodeSocket and the rest, which
// pull `redis` and `ws` into every run. The two modules used here load in a third of the time.
import * as NodeRuntime from '@effect/platform-node/NodeRuntime'
import * as NodeServices from '@effect/platform-node/NodeServices'
import { Effect } from 'effect'

import { honoTakibi } from './index.js'

/** Runs the command line: the one place an Effect of this package meets the runtime. */
export function run() {
  NodeRuntime.runMain(honoTakibi().pipe(Effect.provide(NodeServices.layer)))
}
