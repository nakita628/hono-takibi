import {
  isHttpMethod,
  isMediaWithSchema,
  isOperation,
  isParameter,
  isRefObject,
  isSecurityArray,
  isSchemaArray,
  isSchemaObject,
  isSecurityScheme,
} from '../../guard/index.js'
import { getNonExistentValue, mockFunctionName, schemaToFaker } from '../../helper/faker.js'
import type {
  Components,
  Content,
  Media,
  OpenAPI,
  Operation,
  Responses,
  Schema,
} from '../../openapi/index.js'
import {
  cyclicNodes,
  ensureSuffix,
  makeStringLiteral,
  methodPath,
  statusCodeToNumber,
  toIdentifierPascalCase,
} from '../../utils/index.js'
import { componentsCode } from '../zod-openapi-hono/openapi/components/index.js'
import { routeCode } from '../zod-openapi-hono/openapi/routes/index.js'

function collectRefs(schema: Schema, refs = new Set<string>()) {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').at(-1)
    if (refName) refs.add(refName)
  }
  if (schema.items) {
    const items = isSchemaArray(schema.items) ? schema.items : [schema.items]
    for (const item of items) {
      if (isSchemaObject(item)) collectRefs(item, refs)
    }
  }
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      collectRefs(prop, refs)
    }
  }
  if (schema.allOf) {
    for (const s of schema.allOf) {
      collectRefs(s, refs)
    }
  }
  if (schema.oneOf) {
    for (const s of schema.oneOf) {
      collectRefs(s, refs)
    }
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) {
      collectRefs(s, refs)
    }
  }
  return refs
}

function collectAllDependencies(
  refName: string,
  schemas: { readonly [k: string]: Schema },
  visited = new Set<string>(),
) {
  if (visited.has(refName)) return visited
  visited.add(refName)
  const schema = schemas[refName]
  if (!schema) return visited
  const deps = collectRefs(schema)
  for (const dep of deps) {
    collectAllDependencies(dep, schemas, visited)
  }
  return visited
}

function topologicalSort(
  refs: Set<string>,
  schemas: { readonly [k: string]: Schema },
): readonly string[] {
  const visited = new Set<string>()
  const result: string[] = []
  function visit(name: string) {
    if (visited.has(name)) return
    visited.add(name)
    const schema = schemas[name]
    if (schema) {
      const deps = collectRefs(schema)
      for (const dep of deps) {
        if (refs.has(dep)) visit(dep)
      }
    }
    result.push(name)
  }
  for (const ref of refs) {
    visit(ref)
  }
  return result
}

function detectCircularSchemas(schemas: { readonly [k: string]: Schema }) {
  return cyclicNodes(
    new Map(Object.entries(schemas).map(([name, schema]) => [name, [...collectRefs(schema)]])),
  )
}

// Collects every `#/components/schemas/X` reference reachable by walking an
// arbitrary OpenAPI node (parameters, request bodies, responses, headers,
// nested schemas — including `additionalProperties` and `not`). A generic walk
// is used instead of the schema-shaped `collectRefs` so no reference position
// is missed: under-collection would drop a const a route references (TS2304),
// whereas over-collection only risks a harmless unused-var.
function collectSchemaRefs(node: unknown, refs: Set<string>): Set<string> {
  if (Array.isArray(node)) {
    for (const item of node) collectSchemaRefs(item, refs)
    return refs
  }
  if (node !== null && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (key === '$ref' && typeof value === 'string' && value.includes('/components/schemas/')) {
        const name = value.split('/').at(-1)
        if (name) refs.add(name)
      } else {
        collectSchemaRefs(value, refs)
      }
    }
  }
  return refs
}

// Expands a set of root schema names to its transitive closure through the
// component schema map. A schema referenced only by an unreferenced schema is
// excluded, so base models reached via `is`/`allOf` from an unused model are
// dropped (no unused-var) while everything a route actually needs is kept.
function schemaClosure(roots: Set<string>, schemas: { readonly [k: string]: Schema }) {
  const used = new Set<string>()
  const stack = [...roots]
  while (stack.length > 0) {
    const name = stack.pop()
    if (name === undefined || used.has(name)) continue
    used.add(name)
    const schema = schemas[name]
    if (schema) {
      for (const ref of collectSchemaRefs(schema, new Set<string>())) {
        if (!used.has(ref)) stack.push(ref)
      }
    }
  }
  return used
}

function makeMockFunction(
  name: string,
  schema: Schema,
  schemas: { readonly [k: string]: Schema },
  isCircular: boolean,
  fakerOptions: FakerOptions,
) {
  const mockBody = schemaToFaker(schema, undefined, { schemas, ...fakerOptions })
  const returnType = isCircular ? ': any' : ''
  // When the schema is annotated with `x-brand`, the corresponding zod schema
  // is `.brand<"X">()` and the inferred type is `T & $brand<"X">`. The faker
  // call alone produces the un-branded `T` (e.g. plain `string`), which the
  // route handler refuses to accept (`string` vs `string & $brand<"UserId">`).
  // Cast via `z.infer<typeof <Name>Schema>` to satisfy the type without any
  // runtime overhead — branding is a TS-only construct so the assertion is
  // safe; an `as` cast is the standard escape hatch for nominal brand types.
  // The cast target must match the emitted const name, which `helper/schema.ts`
  // derives as `toIdentifierPascalCase(ensureSuffix(name, 'Schema'))` — using
  // the raw name here would mis-case it (e.g. `userIdSchema` vs `UserIdSchema`).
  const schemaConst = toIdentifierPascalCase(ensureSuffix(name, 'Schema'))
  const body = schema['x-brand'] ? `${mockBody} as z.infer<typeof ${schemaConst}>` : mockBody
  return `function ${mockFunctionName(name)}()${returnType}{return ${body}}` as const
}

function extractSecurityInfo(
  opSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  globalSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  securitySchemes: { readonly [k: string]: unknown } | undefined,
) {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  return securityDefs.flatMap((secDef) =>
    Object.keys(secDef).flatMap(
      (
        schemeName,
      ): readonly {
        readonly type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
        readonly name: string
        readonly in?: 'header' | 'query' | 'cookie'
      }[] => {
        const scheme = securitySchemes?.[schemeName]
        if (!(scheme && isSecurityScheme(scheme))) return [] as const
        if (scheme.type === 'http' && scheme.scheme === 'bearer') {
          return [{ type: 'bearer', name: 'Authorization' }] as const
        }
        if (scheme.type === 'http' && scheme.scheme === 'basic') {
          return [{ type: 'basic', name: 'Authorization' }] as const
        }
        if (scheme.type === 'apiKey') {
          const inLocation =
            scheme.in === 'header' || scheme.in === 'query' || scheme.in === 'cookie'
              ? scheme.in
              : 'header'
          return [
            {
              type: 'apiKey',
              name: scheme.name ?? 'X-API-Key',
              in: inLocation,
            },
          ] as const
        }
        if (scheme.type === 'oauth2') {
          return [{ type: 'oauth2', name: 'Authorization' }] as const
        }
        return [] as const
      },
    ),
  )
}

function hasRequestBodyContent(
  operation: unknown,
): operation is Operation & { requestBody: { content: { readonly [k: string]: unknown } } } {
  if (typeof operation !== 'object' || operation === null) return false
  if (!('requestBody' in operation)) return false
  if (typeof operation.requestBody !== 'object' || operation.requestBody === null) return false
  return 'content' in operation.requestBody
}

/**
 * Filter OpenAPI spec to only include JSON content types for request bodies.
 * This is needed because @hono/zod-openapi doesn't correctly handle multiple content types.
 */
function filterToJsonContentTypes(openapi: OpenAPI) {
  const filteredPaths = Object.fromEntries(
    Object.entries(openapi.paths).map(([path, pathItem]) => {
      const filteredPathItem = Object.fromEntries(
        Object.entries(pathItem).map(([k, v]) => {
          if (!['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'].includes(k)) {
            return [k, v] as const
          }
          if (!hasRequestBodyContent(v)) return [k, v] as const
          const jsonContent = v.requestBody.content['application/json']
          if (!jsonContent) return [k, v] as const
          return [
            k,
            {
              ...v,
              requestBody: { ...v.requestBody, content: { 'application/json': jsonContent } },
            },
          ] as const
        }),
      )
      return [path, filteredPathItem] as const
    }),
  )
  return { ...openapi, paths: filteredPaths }
}

function resolveResponse(
  response: Responses | undefined,
  componentResponses: { readonly [k: string]: Responses } | undefined,
): Responses | undefined {
  if (!response) return undefined
  if (isRefObject(response) && response.$ref) {
    const refName = response.$ref.split('/').at(-1)
    return refName ? componentResponses?.[refName] : undefined
  }
  return response
}

/**
 * Resolves the representative success response for a mock handler.
 *
 * Mirrors the route generator's status mapping (`statusCodeToNumber`): explicit
 * `200`/`201`/`204` win, then `default`, then the lowest remaining 2xx (including
 * the `2XX` wildcard). Status and response are returned together so the emitted
 * body and its status code are always derived from the same response key.
 */
function resolveSuccessResponse(
  responses: { readonly [k: string]: Responses } | undefined,
  componentResponses: { readonly [k: string]: Responses } | undefined,
) {
  if (!responses) return undefined
  const keys = Object.keys(responses)
  const priority = ['200', '201', '204', 'default'].filter((key) => keys.includes(key))
  const others = keys
    .filter(
      (key) =>
        !priority.includes(key) && statusCodeToNumber(key) >= 200 && statusCodeToNumber(key) < 300,
    )
    .toSorted((a, b) => statusCodeToNumber(a) - statusCodeToNumber(b))
  const key = [...priority, ...others][0]
  if (!key) return undefined
  return {
    key,
    statusCode: statusCodeToNumber(key),
    response: resolveResponse(responses[key], componentResponses),
  }
}

/**
 * Generates the auth check code for a handler.
 * Only emits a check when the route defines a 401 response.
 */
function makeAuthCheck(
  security: readonly {
    readonly type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
    readonly name: string
    readonly in?: 'header' | 'query' | 'cookie'
  }[],
  has401: boolean,
) {
  if (!has401 || security.length === 0) return ''
  const authChecks = security.flatMap((sec) => {
    if (sec.type === 'bearer' || sec.type === 'oauth2' || sec.type === 'basic') {
      return [`c.req.header('Authorization')`]
    }
    if (sec.type === 'apiKey') {
      // `name` comes from the document, so it is emitted as an escaped literal.
      if (sec.in === 'header') return [`c.req.header(${makeStringLiteral(sec.name)})`]
      if (sec.in === 'query') return [`c.req.query(${makeStringLiteral(sec.name)})`]
      // Hono's request object does not expose a `.cookie()` accessor; cookies
      // must come from the `hono/cookie` helper. Caller is responsible for
      // emitting the matching `import { getCookie } from 'hono/cookie'`.
      if (sec.in === 'cookie') return [`getCookie(c, ${makeStringLiteral(sec.name)})`]
    }
    return []
  })
  if (authChecks.length === 0) return ''
  return `if(!(${authChecks.join(' || ')})){return c.json({ message: 'Unauthorized' }, 401)}`
}

// A media object's `examples` entry, resolved against `components.examples`.
// An `externalValue`-only entry yields `undefined`: its value lives outside the
// document.
function exampleEntryValue(
  entry: NonNullable<Media['examples']>[string],
  components: Components | undefined,
): unknown {
  if ('$ref' in entry && typeof entry.$ref === 'string') {
    const name = entry.$ref.split('/').at(-1)
    const resolved = name ? components?.examples?.[name] : undefined
    return resolved && 'value' in resolved ? resolved.value : undefined
  }
  return 'value' in entry ? entry.value : undefined
}

// Reads a media object's representative example. Mirrors the docs generator's
// `extractMediaExample`: `example` (singular) wins, otherwise the first entry of
// `examples`, so the handler falls back to faker when that entry has no value.
function extractMediaExample(media: Media, components: Components | undefined): unknown {
  if (media.example !== undefined) return media.example
  const first = Object.values(media.examples ?? {})[0]
  return first ? exampleEntryValue(first, components) : undefined
}

// The media type answered through `c.json()`: `application/json` first, then any
// `+json` suffix (`application/problem+json`, `application/vnd.api+json`), which
// `@hono/zod-openapi` also types as JSON — error responses are commonly declared
// as problem+json, and would otherwise mock to an empty body.
function jsonMediaType(content: Content | undefined) {
  const types = Object.keys(content ?? {})
  return types.includes('application/json')
    ? 'application/json'
    : types.find((type) => /^application\/(?:[\w.-]+\+)?json(?:;|$)/u.test(type))
}

/** What a mock can answer for one declared response. */
type MockResponse = {
  /** The spec key (`404`, `4XX`, `default`), `XX` upper-cased. */
  readonly key: string
  readonly jsonType: string | undefined
  readonly jsonSchema: Schema | undefined
  readonly textSchema: Schema | undefined
  /** The example answered by default (`useExamples`), if any. */
  readonly example: unknown
  /** The `examples` entries a `Prefer: example=<name>` can select. */
  readonly namedExamples: readonly (readonly [string, unknown])[]
  /** The schema const an authored example is cast to (a named `$ref` schema). */
  readonly exampleCast: string | undefined
}

function describeResponse(
  key: string,
  response: Responses,
  components: Components | undefined,
  useExamples: boolean,
): MockResponse {
  const jsonType = jsonMediaType(response.content)
  const jsonMedia = jsonType ? response.content?.[jsonType] : undefined
  const textMedia = response.content?.['text/plain']
  const jsonSchema = jsonMedia && isMediaWithSchema(jsonMedia) ? jsonMedia.schema : undefined
  return {
    key: /^[1-5]xx$/iu.test(key) ? key.toUpperCase() : key,
    jsonType,
    jsonSchema,
    textSchema: textMedia && isMediaWithSchema(textMedia) ? textMedia.schema : undefined,
    example: useExamples && jsonMedia ? extractMediaExample(jsonMedia, components) : undefined,
    namedExamples: Object.entries(jsonMedia?.examples ?? {}).flatMap(([name, entry]) => {
      const value = exampleEntryValue(entry, components)
      return value === undefined ? [] : [[name, value] as const]
    }),
    exampleCast: jsonSchema?.$ref
      ? toIdentifierPascalCase(ensureSuffix(jsonSchema.$ref.split('/').at(-1) ?? '', 'Schema'))
      : undefined,
  }
}

// The value expression and media of one answer: an authored example, else faker.
function responsePayload(
  response: MockResponse,
  example: unknown,
  schemas: { readonly [k: string]: Schema },
  fakerOptions: FakerOptions,
  allRefs: Set<string>,
) {
  if (example !== undefined) {
    // An authored literal can be widened (e.g. `string` vs an enum/branded
    // member), so it is pinned to the schema's inferred type when that schema
    // is a named `$ref` — mirroring the `x-brand` handling.
    const cast = response.exampleCast ? ` as z.infer<typeof ${response.exampleCast}>` : ''
    return { kind: 'json', data: `${JSON.stringify(example)}${cast}` } as const
  }
  if (response.jsonSchema) {
    collectRefs(response.jsonSchema, allRefs)
    const data = schemaToFaker(response.jsonSchema, undefined, { schemas, ...fakerOptions })
    return { kind: 'json', data } as const
  }
  if (response.textSchema) {
    const data = schemaToFaker(response.textSchema, undefined, { schemas, ...fakerOptions })
    return { kind: 'text', data } as const
  }
  return { kind: 'none' } as const
}

// Answers with a status the route declares literally, through the typed
// `c.json`/`c.text`, so the body is checked against that response's schema.
function makeHandlerBody(
  statusCode: number,
  response: MockResponse | undefined,
  payload: ReturnType<typeof responsePayload>,
) {
  if (payload.kind === 'json') {
    // `c.json` defaults the header to application/json; a `+json` type is kept.
    const headers =
      response?.jsonType && response.jsonType !== 'application/json'
        ? `, { 'Content-Type': ${makeStringLiteral(response.jsonType)} }`
        : ''
    return `return c.json(${payload.data}, ${statusCode}${headers})`
  }
  if (payload.kind === 'text') return `return c.text(${payload.data}, ${statusCode})`
  if (statusCode === 204) return `return new Response(null, { status: 204 })`
  return `return c.body(null, ${statusCode})`
}

// Answers a `4XX`/`default` response, whose status is only known at runtime
// (the `Prefer` code), so the route's types cannot name it: `preferResponse`
// builds the `Response` directly.
function makeRawHandlerBody(
  statusExpr: string,
  response: MockResponse,
  payload: ReturnType<typeof responsePayload>,
) {
  if (payload.kind === 'json') {
    const type = makeStringLiteral(response.jsonType ?? 'application/json')
    return `return preferResponse(${statusExpr}, JSON.stringify(${payload.data}), ${type})`
  }
  if (payload.kind === 'text') {
    return `return preferResponse(${statusExpr}, String(${payload.data}), 'text/plain')`
  }
  return `return preferResponse(${statusExpr}, null)`
}

// Module-level helpers for Prism-compatible response selection, emitted once
// per mock file. The names carry no `mock` prefix so they can never collide
// with a component factory (`mock<Name>`).
const PREFER_HELPERS = `// Reads Prism's \`Prefer: code=<status>, example=<name>\` header (or the \`__code\` /
// \`__example\` query) and resolves it against the responses the route declares:
// the exact status, then its \`NXX\` range, then \`default\`. Without a code the
// example is looked up in the success response. Anything the route does not
// declare answers 500 problem+json, as Prism does.
function resolvePrefer(
  req: { header(name: string): string | undefined; query(name: string): string | undefined },
  responses: { readonly [key: string]: readonly string[] },
  success: string,
) {
  let code = req.query('__code')
  let example = req.query('__example')
  for (const [, name = '', quoted, bare] of (req.header('Prefer') ?? '').matchAll(
    /([A-Za-z]+)\\s*=\\s*(?:"([^"]*)"|([^\\s,;]*))/gu,
  )) {
    if (name.toLowerCase() === 'code') code ??= quoted ?? bare
    if (name.toLowerCase() === 'example') example ??= quoted ?? bare
  }
  if (code === undefined && example === undefined) return {}
  if (code !== undefined && !/^[2-5]\\d\\d$/u.test(code)) {
    preferProblem(\`Prefer code=\${code} is not a status code between 200 and 599.\`)
  }
  const key =
    code === undefined
      ? success
      : [code, \`\${code.slice(0, 1)}XX\`, 'default'].find((k) => Object.hasOwn(responses, k))
  if (key === undefined) preferProblem(\`No \${code} response is declared for this operation.\`)
  if (example !== undefined && !responses[key]?.includes(example)) {
    preferProblem(\`No example named "\${example}" is declared for the \${key} response.\`)
  }
  return { key, code, example }
}

// Answers with a status the route's types cannot name (a \`4XX\`/\`default\` response
// picked at runtime); Hono's error handler sends \`res\` with that status.
function preferResponse(status: number, body: string | null, contentType?: string): never {
  throw new HTTPException(status as ContentfulStatusCode, {
    res: new Response(body, contentType ? { headers: { 'Content-Type': contentType } } : {}),
  })
}

function preferProblem(detail: string): never {
  return preferResponse(
    500,
    JSON.stringify({ type: 'about:blank', title: 'Mock response unavailable', status: 500, detail }),
    'application/problem+json',
  )
}`

export type MockOptions = {
  readonly arrayMin?: number
  readonly arrayMax?: number
  readonly readonly?: boolean
  /**
   * `true` (default) answers with a response's media-level `example`/`examples`;
   * `'all'` also uses the scalar `example`/`examples` of every schema and
   * property; `false` always generates.
   */
  readonly useExamples?: boolean | 'all'
  readonly locale?: string
  readonly delay?: number | { readonly min: number; readonly max: number } | false
  /**
   * Re-seeds faker (and pins its reference date to `SEED_REF_DATE`) at the start
   * of every handler, so each route answers the same body every time.
   */
  readonly seed?: number | readonly number[]
}

// `faker.date.*` is relative to the current time, so a seeded mock also pins
// the reference date; otherwise every date (and a JWT's `iat`) would drift.
const SEED_REF_DATE = '2025-01-01T00:00:00.000Z'

// The knobs threaded into `schemaToFaker`; `useExamples` there means the
// schema-level examples (`MockOptions['useExamples'] === 'all'`).
type FakerOptions = {
  readonly arrayMin?: number
  readonly arrayMax?: number
  readonly useExamples?: boolean
}

// Builds the optional response-delay middleware. A fixed `number` sleeps that
// many ms; a `{ min, max }` range sleeps a per-request random duration via
// `faker.number.int`. `false`/omitted emit nothing, leaving the output
// byte-identical to a mock without a delay. The middleware is cross-cutting (not
// woven into handler bodies) so the response generators stay pure; `setTimeout`
// is a WHATWG global, so the mock runs unchanged on Node, Bun, Deno and Workers.
function delayMiddlewareCode(delay: MockOptions['delay']) {
  const ms =
    typeof delay === 'number'
      ? `${delay}`
      : typeof delay === 'object' && delay !== null
        ? `faker.number.int({ min: ${delay.min}, max: ${delay.max} })`
        : undefined
  if (ms === undefined) return ''
  return `\n\napp.use(async (_c, next) => {\n  await new Promise((resolve) => setTimeout(resolve, ${ms}))\n  await next()\n})`
}

export function makeMock(openapi: OpenAPI, basePath: string, options: MockOptions = {}) {
  // Split the emit-shell knobs off from the faker knobs threaded into
  // `schemaToFaker`. `useExamples` defaults to `true` — the mock has always
  // preferred a spec-authored response example — which gates the media-level
  // example only (`extractMediaExample`); `'all'` additionally lets
  // `schemaToFaker` use each schema's own scalar example.
  const {
    useExamples: useExamplesOption,
    locale,
    delay,
    seed,
    readonly: readonlyOption,
    arrayMin,
    arrayMax,
  } = options
  const useExamples = useExamplesOption ?? true
  const fakerOptions: FakerOptions = {
    ...(arrayMin !== undefined ? { arrayMin } : {}),
    ...(arrayMax !== undefined ? { arrayMax } : {}),
    ...(useExamples === 'all' ? { useExamples: true } : {}),
  }
  const filteredOpenapi = filterToJsonContentTypes(openapi)
  const paths = filteredOpenapi.paths
  const schemas = openapi.components?.schemas ?? {}
  const securitySchemes = openapi.components?.securitySchemes
  const componentResponses = openapi.components?.responses
  const allRefs = new Set<string>()
  const processed = Object.entries(paths).flatMap(([p, pathItem]) =>
    Object.entries(pathItem).flatMap(([method, operation]) => {
      if (!(isHttpMethod(method) && isOperation(operation))) return []
      const routeId = methodPath(method, p)
      const security = extractSecurityInfo(
        isSecurityArray(operation.security) ? operation.security : undefined,
        isSecurityArray(openapi.security) ? openapi.security : undefined,
        securitySchemes,
      )
      const requiresAuth = security.length > 0
      const success = resolveSuccessResponse(operation.responses, componentResponses)
      const statusCode = success?.statusCode ?? 200
      const successKey = success?.key ?? '200'
      const responses = Object.entries(operation.responses ?? {}).flatMap(([key, raw]) => {
        const response = resolveResponse(raw, componentResponses)
        return response
          ? [describeResponse(key, response, openapi.components, useExamples !== false)]
          : []
      })
      const successResponse = responses.find((r) => r.key === successKey)
      const handlerBody = makeHandlerBody(
        statusCode,
        successResponse,
        successResponse
          ? responsePayload(
              successResponse,
              successResponse.example,
              schemas,
              fakerOptions,
              allRefs,
            )
          : { kind: 'none' },
      )
      // `Prefer: code=…, example=…` picks any declared response or named example
      // (Prism's convention), so error states can be exercised on demand. A
      // literally declared status answers through the typed `c.json`; a `4XX` /
      // `default` one, whose status comes from the request, through
      // `preferResponse`. The success response's default body stays the final
      // return below.
      const preferTable = JSON.stringify(
        Object.fromEntries(responses.map((r) => [r.key, r.namedExamples.map(([name]) => name)])),
      )
      const preferBranches = responses
        .flatMap((response) => {
          const isLiteral = /^\d{3}$/u.test(response.key)
          const key = JSON.stringify(response.key)
          const render = (example: unknown) => {
            const payload = responsePayload(response, example, schemas, fakerOptions, allRefs)
            return isLiteral
              ? makeHandlerBody(Number(response.key), response, payload)
              : makeRawHandlerBody(
                  `Number(prefer.code ?? ${statusCodeToNumber(response.key)})`,
                  response,
                  payload,
                )
          }
          // An entry that is already the default answer (the first one) needs no branch.
          const named = response.namedExamples
            .filter(([, value]) => value !== response.example)
            .map(
              ([name, value]) =>
                `if(prefer.key===${key}&&prefer.example===${JSON.stringify(name)}){${render(value)}}`,
            )
          const isFinalReturn = isLiteral && response.key === successKey
          return isFinalReturn
            ? named
            : [...named, `if(prefer.key===${key}){${render(response.example)}}`]
        })
        .join('')
      const preferCall = `resolvePrefer(c.req,${preferTable},${JSON.stringify(successKey)})`
      // Generate auth check code only when route defines a 401 Unauthorized response
      const has401 = operation.responses?.[String(401)] !== undefined
      const authCheck = makeAuthCheck(security, has401)
      // The generated test suite requests getNonExistentValue() sentinels for
      // routes declaring a 404, so the mock must answer 404 for exactly those
      // values — the two generators share the sentinel as a contract. An
      // explicit `Prefer` wins over the sentinel.
      const pathParams = (operation.parameters ?? []).flatMap((rawParam) => {
        const resolved = rawParam.$ref
          ? (openapi.components?.parameters?.[
              rawParam.$ref.replace('#/components/parameters/', '')
            ] ?? rawParam)
          : rawParam
        if (!(isParameter(resolved) && resolved.in === 'path')) return []
        return [{ name: resolved.name, schema: resolved.schema ?? { type: 'string' as const } }]
      })
      const notFoundResponse = responses.find((r) => r.key === '404')
      const notFoundCheck =
        notFoundResponse !== undefined && pathParams.length > 0
          ? (() => {
              const condition = pathParams
                .map(
                  // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
                  (p) =>
                    `c.req.param(${makeStringLiteral(p.name)}) === '${getNonExistentValue(p.schema, schemas)}'`,
                )
                .join(' || ')
              const notFoundBody = makeHandlerBody(
                404,
                notFoundResponse,
                responsePayload(notFoundResponse, undefined, schemas, fakerOptions, allRefs),
              )
              return `if(prefer.key===undefined&&(${condition})){${notFoundBody}}`
            })()
          : ''
      // Seeding inside the handler (not once at module load) makes a route's body
      // independent of which requests ran before it, and the handler body runs
      // synchronously after the seed, so concurrent requests cannot interleave.
      const usesFaker = /\bfaker\.|\bmock[A-Za-z0-9_$]*\(/u.test(
        `${preferBranches}${notFoundCheck}${handlerBody}`,
      )
      const seedCall =
        seed !== undefined && usesFaker
          ? `faker.seed(${JSON.stringify(seed)});faker.setDefaultRefDate('${SEED_REF_DATE}');`
          : ''
      // With nothing to branch on, the call still rejects an undeclared `Prefer`.
      const preferCheck =
        preferBranches === '' && notFoundCheck === ''
          ? `${preferCall};`
          : `const prefer=${preferCall};${preferBranches}`
      const handler = `const ${routeId}RouteHandler: RouteHandler<typeof ${routeId}Route> = async (c) => {${seedCall}${authCheck}${preferCheck}${notFoundCheck}${handlerBody}}`
      return [{ entry: { routeId, method, path: p, requiresAuth }, handler }]
    }),
  )
  const routeMetas = processed.map(({ entry }) => entry)
  const handlers = processed.map(({ handler }) => handler)
  const allDeps = new Set<string>()
  for (const ref of allRefs) {
    collectAllDependencies(ref, schemas, allDeps)
  }
  const sortedRefs = topologicalSort(allDeps, schemas)
  const circularSchemas = detectCircularSchemas(schemas)
  const mockFunctions = sortedRefs
    .filter((refName) => schemas[refName])
    .map((refName) =>
      makeMockFunction(
        refName,
        schemas[refName],
        schemas,
        circularSchemas.has(refName),
        fakerOptions,
      ),
    )
  // Emit only the schema consts a route can reach. Roots are every
  // `#/components/schemas/X` referenced from the paths and from the non-schema
  // component objects a route may `$ref` (responses, parameters, request
  // bodies, headers); the closure then pulls in their transitive deps. Base
  // models reached only via `is`/`allOf` from an unused model fall away (no
  // unused-var), while everything `routeCode` references stays.
  const rootRefs = collectSchemaRefs(filteredOpenapi.paths, new Set<string>())
  if (openapi.components) {
    collectSchemaRefs(openapi.components.responses, rootRefs)
    collectSchemaRefs(openapi.components.parameters, rootRefs)
    collectSchemaRefs(openapi.components.requestBodies, rootRefs)
    collectSchemaRefs(openapi.components.headers, rootRefs)
    collectSchemaRefs(openapi.components.callbacks, rootRefs)
    collectSchemaRefs(openapi.components.pathItems, rootRefs)
    collectSchemaRefs(openapi.components.links, rootRefs)
  }
  const usedSchemaNames = schemaClosure(rootRefs, schemas)
  const filteredComponents = openapi.components
    ? {
        ...openapi.components,
        schemas: Object.fromEntries(
          Object.entries(schemas).filter(([name]) => usedSchemaNames.has(name)),
        ),
      }
    : undefined
  const components = filteredComponents
    ? componentsCode(filteredComponents, {
        exportSchemasTypes: false,
        exportSchemas: false,
        exportParametersTypes: false,
        exportParameters: false,
        exportSecuritySchemes: false,
        exportRequestBodies: false,
        exportResponses: false,
        exportHeadersTypes: false,
        exportHeaders: false,
        exportExamples: false,
        exportLinks: false,
        exportCallbacks: false,
        exportPathItems: false,
        exportMediaTypes: false,
        exportMediaTypesTypes: false,
        ...(readonlyOption !== undefined ? { readonly: readonlyOption } : {}),
      })
    : ''
  const routes = routeCode(filteredOpenapi, readonlyOption)
  const appSetup = routeMetas
    .map(({ routeId }) => `.openapi(${routeId}Route, ${routeId}RouteHandler)`)
    .join('')
  const handlersJoined = handlers.join('\n\n')
  const mockFunctionsJoined = mockFunctions.join('\n\n')
  // The generator mocks `format: int64`/`bigint` as a `bigint` (matching the
  // zod schema's inferred type), but `JSON.stringify` throws on BigInt, so
  // `c.json` would return 500. The `toJSON` hook serializes it as a decimal
  // string — the conventional wire form for 64-bit integers in JSON. The
  // `in` guard keeps the hook idempotent (a second mock file or another
  // library defining it first must not throw) while typechecking without a
  // BigInt interface augmentation, and `writable`/`configurable` mirror
  // `Date.prototype.toJSON` so the hook stays removable; `enumerable`
  // stays false so the key never leaks into spreads.
  const bigIntSerializer = `${mockFunctionsJoined}\n${handlersJoined}`.includes(
    'faker.number.bigInt(',
  )
    ? `if(!('toJSON'in BigInt.prototype)){Object.defineProperty(BigInt.prototype,'toJSON',{value(this:bigint){return this.toString()},writable:true,configurable:true})}`
    : ''
  const needsCookieImport = handlersJoined.includes('getCookie(c,')
  // A faker locale swaps only the import specifier; the `faker` binding name is
  // unchanged so every handler body stays byte-identical. The locale string is
  // validated upstream (config) to a faker locale-code shape, so it cannot break
  // out of the import path.
  const fakerImport = locale
    ? `import { faker } from '@faker-js/faker/locale/${locale}'`
    : `import { faker } from '@faker-js/faker'`
  const usesPrefer = handlers.length > 0
  const imports = `import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
${fakerImport}${needsCookieImport ? `\nimport { getCookie } from 'hono/cookie'` : ''}${
    usesPrefer
      ? `\nimport { HTTPException } from 'hono/http-exception'\nimport type { ContentfulStatusCode } from 'hono/utils/http-status'`
      : ''
  }`
  const delayMiddleware = delayMiddlewareCode(delay)
  const appCode = `const app = new OpenAPIHono()${basePath !== '/' ? `.basePath('${basePath}')` : ''}${delayMiddleware}

export const api = app${appSetup}

export default app`
  return [
    imports,
    bigIntSerializer,
    components,
    routes,
    mockFunctionsJoined,
    usesPrefer ? PREFER_HELPERS : '',
    handlersJoined,
    appCode,
  ]
    .filter((s) => s.length > 0)
    .join('\n\n')
}
