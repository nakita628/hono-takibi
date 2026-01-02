import { lowerFirst } from '../utils/index.js'

export function barell(value: { [k: string]: unknown }): string {
  return `${Object.keys(value)
    .sort()
    .map((k) => `export * from './${lowerFirst(k)}'`)
    .join('\n')}\n`
}
