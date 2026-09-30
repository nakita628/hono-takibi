#!/usr/bin/env node
import { NodeRuntime, NodeServices } from '@effect/platform-node'
import { Effect } from 'effect'

import { honoTakibi } from './cli/index.js'

NodeRuntime.runMain(honoTakibi().pipe(Effect.provide(NodeServices.layer)))
