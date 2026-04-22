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

export async function fmt(input: string) {
  const { code, errors } = await format('<stdin>.ts', input, currentConfig)
  if (errors.length > 0) {
    return {
      ok: false,
      error: errors.map((e) => e.message).join('\n'),
    } as const
  }
  return { ok: true, value: code } as const
}
