#!/usr/bin/env node
import * as NodeRuntime from '@effect/platform-node/NodeRuntime'
import * as NodeServices from '@effect/platform-node/NodeServices'
import { Effect } from 'effect'

import { honoTakibi } from './cli/index.js'

NodeRuntime.runMain(
  honoTakibi(process.argv.slice(2), import.meta.url).pipe(Effect.provide(NodeServices.layer)),
)
