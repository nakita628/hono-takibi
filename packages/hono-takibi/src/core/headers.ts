import type { OpenAPI } from '../openapi/index.js'

/**
 * Generates `components.headers` as Zod schemas.
 *
 * - Emits `<HeaderName>HeaderSchema` consts.
 * - When `split=true`, writes one file per header (and an `index.ts`).
 */
export async function headers(
  openAPI: OpenAPI,
  _output: string | `${string}.ts`,
  _exportType: boolean,
  _split?: boolean,
): Promise<{ ok: true; value: string } | { ok: false; error: string }> {
  const headers = openAPI.components?.headers
  if (headers === undefined) return { ok: false, error: 'No headers found' }
  return { ok: false, error: 'Headers generation not yet implemented' }
}
