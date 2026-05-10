import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

const FORMAT_STRING: { readonly [k: string]: string } = {
  email: 'email()',
  uuid: 'uuid()',
  uuidv4: 'uuidv4()',
  uuidv6: 'uuidv6()',
  uuidv7: 'uuidv7()',
  url: 'url()',
  uri: 'url()',
  emoji: 'emoji()',
  base64: 'base64()',
  base64url: 'base64url()',
  hex: 'hex()',
  jwt: 'jwt()',
  nanoid: 'nanoid()',
  cuid: 'cuid()',
  cuid2: 'cuid2()',
  ulid: 'ulid()',
  ipv4: 'ipv4()',
  ipv6: 'ipv6()',
  mac: 'mac()',
  cidrv4: 'cidrv4()',
  cidrv6: 'cidrv6()',
  date: 'iso.date()',
  time: 'iso.time()',
  'date-time': 'iso.datetime()',
  duration: 'iso.duration()',
  binary: 'file()',
  e164: 'e164()',
  guid: 'guid()',
  httpUrl: 'httpUrl()',
  hostname: 'hostname()',
  toLowerCase: 'toLowerCase()',
  toUpperCase: 'toUpperCase()',
  trim: 'trim()',
}

const TRANSFORM_FORMATS = new Set(['toLowerCase', 'toUpperCase', 'trim'])
const DATE_FORMATS = new Set(['date', 'date-time'])

const EMAIL_PATTERN_PRESET: { readonly [k: string]: string } = {
  html5: 'html5Email',
  rfc5322: 'rfc5322Email',
  unicode: 'unicodeEmail',
}

/**
 * Returns the inner `error:"..."` (or `error:(issue)=>...`) string without
 * surrounding braces, so it can be merged into a format options object.
 */
function errorInner(message: string): string {
  return error(message).slice(1, -1)
}

/**
 * Builds format-specific option entries (excluding `error`) for Zod v4 format
 * constructors like `z.email({ pattern })`, `z.iso.datetime({ precision })`.
 * Returns an empty array when no options apply.
 */
function buildFormatOptions(schema: Schema): readonly string[] {
  const opts: string[] = []
  switch (schema.format) {
    case 'email': {
      // x-emailRegex wins over x-emailPattern when both are set.
      const regex = schema['x-emailRegex']
      const preset = schema['x-emailPattern']
      if (regex) {
        opts.push(`pattern:/${regex}/`)
      } else if (preset && EMAIL_PATTERN_PRESET[preset]) {
        opts.push(`pattern:z.regexes.${EMAIL_PATTERN_PRESET[preset]}`)
      }
      break
    }
    case 'uuid': {
      const v = schema['x-uuidVersion']
      if (v) opts.push(`version:${JSON.stringify(v)}`)
      break
    }
    case 'url':
    case 'uri': {
      const proto = schema['x-urlProtocol']
      const host = schema['x-urlHostname']
      const norm = schema['x-urlNormalize']
      if (proto) opts.push(`protocol:/${proto}/`)
      if (host) opts.push(`hostname:/${host}/`)
      if (norm === true) opts.push('normalize:true')
      break
    }
    case 'date-time': {
      const p = schema['x-isoPrecision']
      const offset = schema['x-isoOffset']
      const local = schema['x-isoLocal']
      if (p !== undefined) opts.push(`precision:${p}`)
      if (offset === true) opts.push('offset:true')
      if (local === true) opts.push('local:true')
      break
    }
    case 'time': {
      const p = schema['x-isoPrecision']
      if (p !== undefined) opts.push(`precision:${p}`)
      break
    }
    case 'mac': {
      const d = schema['x-macDelimiter']
      if (d) opts.push(`delimiter:${JSON.stringify(d)}`)
      break
    }
    case 'jwt': {
      const alg = schema['x-jwtAlg']
      if (alg) opts.push(`alg:${JSON.stringify(alg)}`)
      break
    }
  }
  return opts
}

/**
 * Builds a Zod string schema from an OpenAPI string schema, applying format,
 * pattern, length constraints, vendor extensions for messages
 * (`x-error-message` / `x-pattern-message` / `x-size-message` /
 * `x-minimum-message` / `x-maximum-message`), P1 transform extensions
 * (`x-coerce`, `x-trim`, `x-toLowerCase`, `x-toUpperCase`, `x-normalize`),
 * and P1 format-option extensions (`x-emailPattern`, `x-uuidVersion`,
 * `x-urlHostname` / `x-urlProtocol` / `x-urlNormalize`, `x-isoPrecision` /
 * `x-isoOffset` / `x-isoLocal`, `x-macDelimiter`, `x-jwtAlg`,
 * `x-hashAlg` / `x-hashEnc`).
 *
 * Pre-validation transforms (`x-trim` / `x-toLowerCase` / `x-toUpperCase` /
 * `x-normalize`) wrap a validation format using
 * `z.string().<transforms>.pipe(z.<format>(...))` so user input is normalized
 * before validation runs. This makes canonical email normalization
 * (`{ format: email, x-trim: true, x-toLowerCase: true }`) work as expected.
 */
export function string(schema: Schema): string {
  const errorMessage = schema['x-error-message']
  const coerce = schema['x-coerce'] === true

  // Hash: z.hash(algo, { enc }) — special case, algo is a required positional arg.
  const hashBase = (() => {
    if (schema.format !== 'hash') return undefined
    const algo = schema['x-hashAlg']
    if (!algo) return errorMessage ? `z.string(${error(errorMessage)})` : 'z.string()'
    const enc = schema['x-hashEnc']
    const opts: string[] = []
    if (enc) opts.push(`enc:${JSON.stringify(enc)}`)
    if (errorMessage) opts.push(errorInner(errorMessage))
    const optsStr = opts.length > 0 ? `,{${opts.join(',')}}` : ''
    return `z.hash(${JSON.stringify(algo)}${optsStr})`
  })()

  // x-codec: "date" → bidirectional string ⇄ Date codec for date/date-time
  // formats. Output stays as ISO string for OpenAPI/JSON, internal TS type is
  // Date. Removes the need for `.toISOString()` calls in route handlers.
  // Parameter names match Zod's official docs (isoString / date).
  const codec = schema['x-codec']
  if (
    codec === 'date' &&
    schema.format &&
    DATE_FORMATS.has(schema.format) &&
    !coerce &&
    !hashBase
  ) {
    const isoFn = schema.format === 'date' ? 'z.iso.date()' : 'z.iso.datetime()'
    return `z.codec(${isoFn},z.date(),{decode:(isoString)=>new Date(isoString),encode:(date)=>date.toISOString()})`
  }

  const format = schema.format && FORMAT_STRING[schema.format]
  const isTransformFormat = !!(schema.format && TRANSFORM_FORMATS.has(schema.format))
  const isValidationFormat = !!(format && !isTransformFormat)
  // Transform extensions applied as pre-validation when paired with a
  // validation format (e.g. email, uuid). Otherwise they chain after the base.
  const trimX = schema['x-trim'] === true
  const lowerX = schema['x-toLowerCase'] === true
  const upperX = schema['x-toUpperCase'] === true
  const normalizeX = schema['x-normalize']
  const hasPreTransform = trimX || lowerX || upperX || !!normalizeX
  const usePipe = isValidationFormat && hasPreTransform && !coerce

  const buildValidationBase = (): string => {
    if (hashBase) return hashBase
    if (coerce && schema.format && DATE_FORMATS.has(schema.format)) {
      return errorMessage ? `z.coerce.date(${error(errorMessage)})` : 'z.coerce.date()'
    }
    if (!format) {
      if (coerce)
        return errorMessage ? `z.coerce.string(${error(errorMessage)})` : 'z.coerce.string()'
      return errorMessage ? `z.string(${error(errorMessage)})` : 'z.string()'
    }
    const fmtOpts = isValidationFormat ? buildFormatOptions(schema) : []
    const includeError = !!errorMessage && isValidationFormat
    const allOpts = includeError ? [...fmtOpts, errorInner(errorMessage ?? '')] : [...fmtOpts]
    if (allOpts.length > 0) {
      return `z.${format.replace(/\(\)$/, `({${allOpts.join(',')}})`)}`
    }
    return `z.${format}`
  }

  const baseHasTrim = schema.format === 'trim'
  const baseHasLower = schema.format === 'toLowerCase'
  const baseHasUpper = schema.format === 'toUpperCase'

  // Post-base transform chain (used when usePipe is false): the base already
  // owns the format, so just append .trim()/.toLowerCase() etc. on top.
  const postTrim = trimX && !baseHasTrim ? '.trim()' : ''
  const postLower = lowerX && !baseHasLower ? '.toLowerCase()' : ''
  const postUpper = upperX && !baseHasUpper ? '.toUpperCase()' : ''
  const postNormalize = normalizeX ? `.normalize("${normalizeX}")` : ''

  const base = usePipe
    ? `z.string()${postTrim}${postLower}${postUpper}${postNormalize}.pipe(${buildValidationBase()})`
    : buildValidationBase()
  // When piped, transforms live before `.pipe(...)`. Otherwise they trail the
  // validation chain (after .min/.max/.length).
  const endTrim = usePipe ? '' : postTrim
  const endLower = usePipe ? '' : postLower
  const endUpper = usePipe ? '' : postUpper
  const endNormalize = usePipe ? '' : postNormalize

  const patternMessage = schema['x-pattern-message']
  const hasUnicodeProperty = schema.pattern && /\\[pP]\{/.test(schema.pattern)
  const patternMsgPart = patternMessage ? `,${error(patternMessage)}` : ''
  const pattern = schema.pattern
    ? `.regex(/${schema.pattern.replace(/(?<!\\)\//g, '\\/')}/${hasUnicodeProperty ? 'u' : ''}${patternMsgPart})`
    : undefined
  const sizeMessage = schema['x-size-message']
  const sizeMsgPart = sizeMessage ? `,${error(sizeMessage)}` : ''
  const minimumMessage = schema['x-minimum-message']
  const minMsgPart = minimumMessage ? `,${error(minimumMessage)}` : ''
  const maximumMessage = schema['x-maximum-message']
  const maxMsgPart = maximumMessage ? `,${error(maximumMessage)}` : ''
  const isFixedLength =
    schema.minLength !== undefined &&
    schema.maxLength !== undefined &&
    schema.minLength === schema.maxLength
  // P2 string substring checks. Each carries the original plain string so the
  // round-trip to Zod preserves the user's literal (not a regex-escaped pattern).
  const includes =
    schema['x-includes'] !== undefined
      ? `.includes(${JSON.stringify(schema['x-includes'])})`
      : undefined
  const startsWith =
    schema['x-startsWith'] !== undefined
      ? `.startsWith(${JSON.stringify(schema['x-startsWith'])})`
      : undefined
  const endsWith =
    schema['x-endsWith'] !== undefined
      ? `.endsWith(${JSON.stringify(schema['x-endsWith'])})`
      : undefined
  return [
    base,
    pattern,
    isFixedLength ? `.length(${schema.minLength}${sizeMsgPart})` : undefined,
    !isFixedLength && schema.minLength !== undefined
      ? `.min(${schema.minLength}${minMsgPart})`
      : undefined,
    !isFixedLength && schema.maxLength !== undefined
      ? `.max(${schema.maxLength}${maxMsgPart})`
      : undefined,
    includes,
    startsWith,
    endsWith,
    endTrim || undefined,
    endLower || undefined,
    endUpper || undefined,
    endNormalize || undefined,
  ]
    .filter((v) => v !== undefined)
    .join('')
}
