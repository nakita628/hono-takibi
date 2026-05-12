import type { Schema } from '../../../openapi/index.js'
import { baseError, error } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

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
 * `x-minLength-message` / `x-maxLength-message`), P1 transform extensions
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
  const requiredMessage = schema['x-required-message']
  const baseErrorArg = baseError(errorMessage, requiredMessage)
  const coerce = schema['x-coerce'] === true

  // Hash: z.hash(algo, { enc }) — special case, algo is a required positional arg.
  const hashBase = (() => {
    if (schema.format !== 'hash') return undefined
    const algo = schema['x-hashAlg']
    if (!algo) return baseErrorArg ? `z.string(${baseErrorArg})` : 'z.string()'
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

  // v2.6: contentEncoding + contentMediaType + contentSchema
  // Decodes the encoded payload, optionally JSON-parses it, then validates
  // against contentSchema. Generates: z.<base>().transform((s) => decoded).pipe(z.<contentSchema>())
  const enc = schema.contentEncoding
  const mediaType = schema.contentMediaType
  const contentSchema = schema.contentSchema
  if ((enc !== undefined || mediaType !== undefined || contentSchema !== undefined) && !hashBase) {
    const baseStr = (() => {
      if (enc === 'base64') return 'z.base64()'
      if (enc === 'base64url') return 'z.base64url()'
      // Other encodings (binary, 7bit, 8bit, quoted-printable) fall back to
      // a plain string with no decode step.
      return 'z.string()'
    })()
    const decodeStep = (() => {
      // Pure base64 → bytes (here: decoded UTF-8 string via atob)
      if (enc !== 'base64' && enc !== 'base64url') return ''
      // application/json (or json subtypes) → parse to value
      if (mediaType && /json/i.test(mediaType)) {
        return '.transform((b64)=>JSON.parse(typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8")))'
      }
      return '.transform((b64)=>typeof atob==="function"?atob(b64):Buffer.from(b64,"base64").toString("utf8"))'
    })()
    // contentSchema may be a $ref or inline schema; both branches recurse
    // through zodToOpenAPI which already handles refs via makeRef.
    const validateStep = contentSchema ? `.pipe(${zodToOpenAPI(contentSchema)})` : ''
    return `${baseStr}${decodeStep}${validateStep}`
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
  // For validation formats (e.g. `email`), transforms must wrap via `.pipe()`
  // so they apply before the format's own check. For plain `z.string()` chains
  // (no format), transforms are inserted before refinements in the method
  // chain order — see the return array below.
  const usePipe = isValidationFormat && hasPreTransform && !coerce

  const buildValidationBase = (): string => {
    if (hashBase) return hashBase
    if (coerce && schema.format && DATE_FORMATS.has(schema.format)) {
      return baseErrorArg ? `z.coerce.date(${baseErrorArg})` : 'z.coerce.date()'
    }
    if (!format) {
      if (coerce) return baseErrorArg ? `z.coerce.string(${baseErrorArg})` : 'z.coerce.string()'
      return baseErrorArg ? `z.string(${baseErrorArg})` : 'z.string()'
    }
    const fmtOpts = isValidationFormat ? buildFormatOptions(schema) : []
    const includeBaseError = !!baseErrorArg && isValidationFormat
    // baseErrorArg already wraps in `{...}`. Strip the outer braces to merge
    // with format options.
    const baseInner = includeBaseError ? baseErrorArg.slice(1, -1) : ''
    const allOpts = includeBaseError ? [...fmtOpts, baseInner] : [...fmtOpts]
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
  // v3.0: string length uses x-minLength-message / x-maxLength-message (split
  // from the previous shared x-minimum-message / x-maximum-message umbrellas).
  const minLengthMessage = schema['x-minLength-message']
  const minMsgPart = minLengthMessage ? `,${error(minLengthMessage)}` : ''
  const maxLengthMessage = schema['x-maxLength-message']
  const maxMsgPart = maxLengthMessage ? `,${error(maxLengthMessage)}` : ''
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
  // x-lowercase / x-uppercase are *validation* checks (.lowercase() /
  // .uppercase()), distinct from the *transform* extensions x-toLowerCase /
  // x-toUpperCase (.toLowerCase() / .toUpperCase()). Both can coexist on the
  // same field — the input is mapped first, then the validation enforces the
  // case constraint.
  const lowercaseValidate = schema['x-lowercase'] === true ? '.lowercase()' : undefined
  const uppercaseValidate = schema['x-uppercase'] === true ? '.uppercase()' : undefined
  return [
    base,
    // Pre-validation transforms come BEFORE refinements so input is normalized
    // first (`z.string().toLowerCase().regex(...)`). For validation-format
    // schemas these are already inside the pipe — `endTrim` et al. are empty.
    endTrim || undefined,
    endLower || undefined,
    endUpper || undefined,
    endNormalize || undefined,
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
    lowercaseValidate,
    uppercaseValidate,
  ]
    .filter((v) => v !== undefined)
    .join('')
}
