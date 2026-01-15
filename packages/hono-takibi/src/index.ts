#!/usr/bin/env node
import { honoTakibi } from './cli/index.js'

/**
 * CLI entry point for **hono-takibi**.
 *
 * Executes the CLI, prints the result, and sets the process exit code.
 *
 * ```mermaid
 * flowchart TD
 *   A["Start CLI"] --> B["honoTakibi()"]
 *   B --> C{"result.ok?"}
 *   C -->|Yes| D["console.log(result.value)"]
 *   D --> E["process.exit(0)"]
 *   C -->|No| F["console.error(result.error)"]
 *   F --> G["process.exit(1)"]
 * ```
 *
 * **Usage:**
 * ```
 * hono-takibi <input-file> [-o output-file]
 * ```
 *
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
    console.log(result.value)
    process.exit(0)
  } else {
    console.error(result.error)
    process.exit(1)
  }
})
