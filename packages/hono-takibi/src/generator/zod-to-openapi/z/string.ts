import type { Schema } from '../../../openapi/index.js'
import { baseError, error, escapeRegexLiteral } from '../../../utils/index.js'
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
const errorInner = (message: string): string => error(message).slice(1, -1)

/**
 * Builds format-specific option entries (excluding `error`) for Zod v4 format
 * constructors like `z.email({ pattern })`, `z.iso.datetime({ precision })`.
 * Returns an empty array when no options apply.
 */
function makeFormatOptions(schema: Schema): readonly string[] {
  switch (schema.format) {
    case 'email': {
      // x-emailRegex wins over x-emailPattern when both are set.
      const regex = schema['x-emailRegex']
      const preset = schema['x-emailPattern']
      return [
        regex
          ? `pattern:/${escapeRegexLiteral(regex)}/`
          : preset && EMAIL_PATTERN_PRESET[preset]
            ? `pattern:z.regexes.${EMAIL_PATTERN_PRESET[preset]}`
            : undefined,
      ].filter((v) => v !== undefined)
    }
    case 'uuid':
      return schema['x-uuidVersion'] ? [`version:${JSON.stringify(schema['x-uuidVersion'])}`] : []
    case 'url':
    case 'uri':
      return [
        schema['x-urlProtocol']
          ? `protocol:/${escapeRegexLiteral(schema['x-urlProtocol'])}/`
          : undefined,
        schema['x-urlHostname']
          ? `hostname:/${escapeRegexLiteral(schema['x-urlHostname'])}/`
          : undefined,
        schema['x-urlNormalize'] === true ? 'normalize:true' : undefined,
      ].filter((v) => v !== undefined)
    case 'date-time':
      return [
        schema['x-isoPrecision'] !== undefined
          ? `precision:${schema['x-isoPrecision']}`
          : undefined,
        schema['x-isoOffset'] === true ? 'offset:true' : undefined,
        schema['x-isoLocal'] === true ? 'local:true' : undefined,
      ].filter((v) => v !== undefined)
    case 'time':
      return schema['x-isoPrecision'] !== undefined ? [`precision:${schema['x-isoPrecision']}`] : []
    case 'mac':
      return schema['x-macDelimiter']
        ? [`delimiter:${JSON.stringify(schema['x-macDelimiter'])}`]
        : []
    case 'jwt':
      return schema['x-jwtAlg'] ? [`alg:${JSON.stringify(schema['x-jwtAlg'])}`] : []
    default:
      return []
  }
}

export function string(
  schema: Schema,
  options?: {
    coerce?: boolean
    readonly?: boolean
    isOptional?: boolean
  },
): string {
  const errorMessage = schema['x-error-message']
  const requiredMessage = schema['x-required-message']
  const coerce = schema['x-coerce'] === true
  // coerce converts undefined → "undefined" (string) or Invalid Date — success
  // or non-undefined failure, so issue.input === undefined is unreachable.
  const baseErrorArg = baseError(errorMessage, coerce ? undefined : requiredMessage)

  // Hash: z.hash(algo, { enc }) — algo is a required positional arg. The hash
  // branch passes x-error-message via errorInner below; the format-specific slot
  // is reserved for the standard validation-format constructors (email/uuid/url/...).
  const hashBase = (() => {
    if (schema.format !== 'hash') return undefined
    const algo = schema['x-hashAlg']
    if (!algo) return baseErrorArg ? `z.string(${baseErrorArg})` : 'z.string()'
    const enc = schema['x-hashEnc']
    const opts = [
      enc ? `enc:${JSON.stringify(enc)}` : undefined,
      errorMessage ? errorInner(errorMessage) : undefined,
    ].filter((v) => v !== undefined)
    const optsStr = opts.length > 0 ? `,{${opts.join(',')}}` : ''
    return `z.hash(${JSON.stringify(algo)}${optsStr})`
  })()

  // x-codec: bidirectional codec between an input string schema and a runtime
  // value. The user-supplied string (complete `z.codec(...)` expression)
  // replaces the base schema verbatim.
  const codec = schema['x-codec']
  if (codec !== undefined && !coerce && !hashBase) {
    return codec
  }

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
      // Only base64 / base64url drive a decode. Other encodings (binary,
      // 7bit, 8bit, quoted-printable) flow through as plain strings.
      if (enc !== 'base64' && enc !== 'base64url') return ''
      // MIME-family classification. Binary families MUST stay as raw bytes
      // (UTF-8 stringification corrupts non-text payloads — e.g. PNG magic
      // 0x89 expands to 0xC2 0x89). JSON families round-trip through
      // JSON.parse with a guarded try/catch so syntax errors surface as
      // Zod issues instead of uncaught exceptions.
      const mt = mediaType ? mediaType.toLowerCase() : ''
      const isBinary = /^(image|audio|video)\//.test(mt) || mt === 'application/octet-stream'
      const isJson = mt.length > 0 && /json/.test(mt)
      // Binary MIME types decode base64 directly to Uint8Array — UTF-8
      // decoding would corrupt the bytes.
      if (isBinary) {
        return '.transform((val)=>typeof atob==="function"?Uint8Array.from(atob(val),(c)=>c.charCodeAt(0)):new Uint8Array(Buffer.from(val,"base64")))'
      }
      // JSON MIME: try/catch + ctx.addIssue so SyntaxError becomes a Zod
      // issue rather than an uncaught throw at safeParse time.
      if (isJson) {
        const issueExpr = errorMessage
          ? `{code:"custom",message:${JSON.stringify(errorMessage)},params:{cause:e instanceof Error?e.message:String(e)}}`
          : '{code:"custom",params:{cause:e instanceof Error?e.message:String(e)}}'
        return `.transform((val,ctx)=>{try{const s=typeof atob==="function"?atob(val):Buffer.from(val,"base64").toString("utf8");return JSON.parse(s)}catch(e){ctx.addIssue(${issueExpr});return z.NEVER}})`
      }
      // Text / unspecified MIME → preserve previous UTF-8 decoding behavior.
      return '.transform((val)=>typeof atob==="function"?atob(val):Buffer.from(val,"base64").toString("utf8"))'
    })()
    // contentSchema may be a $ref or inline schema; both branches recurse
    // through zodToOpenAPI which already handles refs via makeRef. Propagate
    // `options` so nested array/object receives `.readonly()` when requested.
    const validateStep = contentSchema
      ? `.pipe(${zodToOpenAPI(contentSchema, undefined, options)})`
      : ''
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

  const makeValidationBase = (): string => {
    if (hashBase) return hashBase
    if (coerce && schema.format && DATE_FORMATS.has(schema.format)) {
      return baseErrorArg ? `z.coerce.date(${baseErrorArg})` : 'z.coerce.date()'
    }
    if (!format) {
      if (coerce) return baseErrorArg ? `z.coerce.string(${baseErrorArg})` : 'z.coerce.string()'
      return baseErrorArg ? `z.string(${baseErrorArg})` : 'z.string()'
    }
    const fmtOpts = isValidationFormat ? makeFormatOptions(schema) : []
    const includeBaseError = !!baseErrorArg && isValidationFormat
    // baseErrorArg already wraps in `{...}`. Strip the outer braces to merge
    // with format options.
    const baseInner = includeBaseError ? baseErrorArg.slice(1, -1) : ''
    const allOpts = baseInner ? [...fmtOpts, baseInner] : [...fmtOpts]
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
    ? `z.string()${postTrim}${postLower}${postUpper}${postNormalize}.pipe(${makeValidationBase()})`
    : makeValidationBase()
  // When piped, transforms live before `.pipe(...)`. Otherwise they trail the
  // validation chain (after .min/.max/.length).
  const endTrim = usePipe ? '' : postTrim
  const endLower = usePipe ? '' : postLower
  const endUpper = usePipe ? '' : postUpper
  const endNormalize = usePipe ? '' : postNormalize

  // Per-keyword precedence: `x-<keyword>-message` > `x-error-message` > Zod default.
  // The `x-error-message` already flows into the `z.string({error})` constructor via
  // `baseErrorArg`, but Zod scopes that to invalid-type errors only — `.min/.max/...`
  // need an explicit fallback to honor the contract in openapi/index.ts.
  const patternMessage = schema['x-pattern-message'] ?? errorMessage
  const hasUnicodeProperty = schema.pattern && /\\[pP]\{/.test(schema.pattern)
  const patternMessagePart = patternMessage ? `,${error(patternMessage)}` : ''
  const pattern = schema.pattern
    ? `.regex(/${escapeRegexLiteral(schema.pattern)}/${hasUnicodeProperty ? 'u' : ''}${patternMessagePart})`
    : undefined
  const lengthMessage = schema['x-length-message'] ?? errorMessage
  const lengthMessagePart = lengthMessage ? `,${error(lengthMessage)}` : ''
  const minLengthMessage = schema['x-minLength-message'] ?? errorMessage
  const minLengthMessagePart = minLengthMessage ? `,${error(minLengthMessage)}` : ''
  const maxLengthMessage = schema['x-maxLength-message'] ?? errorMessage
  const maxLengthMessagePart = maxLengthMessage ? `,${error(maxLengthMessage)}` : ''
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
  const chain = [
    base,
    // Pre-validation transforms come BEFORE refinements so input is normalized
    // first (`z.string().toLowerCase().regex(...)`). For validation-format
    // schemas these are already inside the pipe — `endTrim` et al. are empty.
    endTrim || undefined,
    endLower || undefined,
    endUpper || undefined,
    endNormalize || undefined,
    pattern,
    isFixedLength ? `.length(${schema.minLength}${lengthMessagePart})` : undefined,
    !isFixedLength && schema.minLength !== undefined
      ? `.min(${schema.minLength}${minLengthMessagePart})`
      : undefined,
    !isFixedLength && schema.maxLength !== undefined
      ? `.max(${schema.maxLength}${maxLengthMessagePart})`
      : undefined,
    includes,
    startsWith,
    endsWith,
    lowercaseValidate,
    uppercaseValidate,
  ]
    .filter((v) => v !== undefined)
    .join('')
  return chain
}
