import { type FormatConfig, format } from 'oxfmt'

const defaultConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: false,
}

let currentConfig = defaultConfig

export function setFormatOptions(config: FormatConfig) {
  currentConfig = { ...defaultConfig, ...config }
}

// oxfmt formats deeply-nested expressions (e.g. ~25-level allOf/intersection
// chains) in super-linear time and can effectively hang. Bound it: on timeout
// emit the already-valid, unformatted generated code instead of blocking.
const formatTimeoutMs = (() => {
  const raw = process.env.OXFMT_TIMEOUT_MS
  if (raw === undefined) return 5000
  const n = Number(raw)
  return Number.isFinite(n) && n >= 0 ? n : 5000
})()

export async function fmt(input: string, timeoutMs: number = formatTimeoutMs) {
  const timedOut = Symbol('timedOut')
  const result = await Promise.race([
    format('<stdin>.ts', input, currentConfig),
    new Promise<typeof timedOut>((resolve) => setTimeout(() => resolve(timedOut), timeoutMs)),
  ])
  if (result === timedOut) {
    console.warn(
      `format skipped: oxfmt exceeded ${timeoutMs}ms (schema nesting too deep); emitted unformatted output. Flatten allOf/intersection chains or run a formatter manually.`,
    )
    return { ok: true, value: input } as const
  }
  const { code, errors } = result
  if (errors.length > 0) {
    return {
      ok: false,
      error: errors.map((e) => e.message).join('\n'),
    } as const
  }
  return { ok: true, value: code } as const
}
