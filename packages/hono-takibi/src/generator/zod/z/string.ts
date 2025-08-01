/** Build a Zod string schema from an OpenAPI string schema. */
export function string(args: {
  format?: string
  pattern?: string
  minLength?: number
  maxLength?: number
}): string {
  const FORMAT_STRING: Record<string, string> = {
    email: 'email()',
    uuid: 'uuid()',
    uuidv4: 'uuidv4()',
    uuidv6: 'uuidv6()',
    uuidv7: 'uuidv7()',
    uri: 'url()',
    emoji: 'emoji()',
    base64: 'base64()',
    base64url: 'base64url()',
    nanoid: 'nanoid()',
    cuid: 'cuid()',
    cuid2: 'cuid2()',
    ulid: 'ulid()',
    ipv4: 'ipv4()',
    ipv6: 'ipv6()',
    cidrv4: 'cidrv4()',
    cidrv6: 'cidrv6()',
    date: 'iso.date()',
    time: 'iso.time()',
    'date-time': 'iso.datetime()',
    duration: 'iso.duration()',
    binary: 'file()',
    toLowerCase: 'toLowerCase()',
    toUpperCase: 'toUpperCase()',
    trim: 'trim()',
    jwt: 'jwt()',
  } as const

  const o: string[] = []
  const f = args.format && FORMAT_STRING[args.format]
  o.push(f ? `z.${f}` : 'z.string()')
  // pattern
  if (args.pattern) {
    o.push(`.regex(/${args.pattern.replace(/(?<!\\)\//g, '\\/')}/)`)
  }
  // length
  if (
    args.minLength !== undefined &&
    args.maxLength !== undefined &&
    args.minLength === args.maxLength
  ) {
    o.push(`.length(${args.minLength})`)
  } else {
    // min
    if (args.minLength !== undefined) {
      o.push(`.min(${args.minLength})`)
    }
    // max
    if (args.maxLength !== undefined) {
      o.push(`.max(${args.maxLength})`)
    }
  }
  return o.join('')
}
