/**
 * Core file generation helper.
 *
 * Provides the foundational file writing functionality used throughout
 * the code generation process.
 *
 * ```mermaid
 * flowchart LR
 *   A["code"] --> B["fmt()"]
 *   B --> C["mkdir()"]
 *   C --> D["writeFile()"]
 *   D --> E["Result"]
 * ```
 *
 * @module helper/core
 */
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'

/**
 * Formats and writes code to a file.
 *
 * Combines code formatting, directory creation, and file writing
 * into a single atomic operation with proper error handling.
 *
 * ```mermaid
 * flowchart TD
 *   A["core(code, dir, output)"] --> B["fmt(code) + mkdir(dir)"]
 *   B --> C{"Both ok?"}
 *   C -->|No| D["Return error"]
 *   C -->|Yes| E["writeFile(output, formatted)"]
 *   E --> F{"Write ok?"}
 *   F -->|No| G["Return error"]
 *   F -->|Yes| H["Return success"]
 * ```
 *
 * @param code - Raw TypeScript code to format and write
 * @param dir - Directory path to create if not exists
 * @param output - Output file path
 * @returns Promise resolving to success or error result
 *
 * @example
 * ```ts
 * const result = await core(
 *   'const x = 1',
 *   'src/generated',
 *   'src/generated/output.ts'
 * )
 * if (result.ok) {
 *   // File written successfully
 * }
 * ```
 */
export async function core(
  code: string,
  dir: string,
  output: string,
): Promise<
  | {
      readonly ok: true
      readonly value: undefined
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const [fmtResult, mkdirResult] = await Promise.all([fmt(code), mkdir(dir)])
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(output, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }
  return { ok: true, value: undefined }
}
