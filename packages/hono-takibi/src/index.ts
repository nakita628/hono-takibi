#!/usr/bin/env node
import * as module from 'node:module'

// The modules a run loads are compiled once and their bytecode kept (Node 22.1+), in Node's
// own cache directory unless `NODE_COMPILE_CACHE` names one: every later run starts faster.
// It is turned on before anything else is loaded, so the program is imported here rather
// than statically: a static import is evaluated before this module's own body.
if ('enableCompileCache' in module) module.enableCompileCache()

const { run } = await import('./cli/main.js')
run()
