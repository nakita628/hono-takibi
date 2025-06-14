#!/usr/bin/env node
import { honoTakibi } from './cli/index.js'

/**
 * CLI entry point for hono-takibi
 * Usage:
 * ```
 * hono-takibi <input-file> [-o output-file]
 * ```
 * @example
 * ```bash
 * # Global install
 * npm install -g hono-takibi
 * hono-takibi openapi.yaml -o routes.ts
 *
 * # NPX usage
 * npx hono-takibi openapi.yaml -o routes.ts
 * ```
 */

honoTakibi().then((result) => {
  if (result.ok) {
    console.log(result.value.message)
    process.exit(0)
  } else {
    console.error(result.error)
    process.exit(1)
  }
})
