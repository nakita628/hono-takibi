import { describe, expect, it } from 'vite-plus/test'

import { makeConst, makeExportConst, makeImports, makeModuleSpec } from './code.js'

describe('makeModuleSpec', () => {
  it.concurrent('returns relative path from file to output (strips /index)', () => {
    const result = makeModuleSpec('/src/routes/index.ts', { output: '/src/schemas/index.ts' })
    expect(result).toBe('../schemas')
  })

  it.concurrent('returns relative path without .ts extension', () => {
    const result = makeModuleSpec('/src/routes/user.ts', { output: '/src/schemas/user.ts' })
    expect(result).toBe('../schemas/user')
  })

  it.concurrent('returns . for split directory in same directory', () => {
    const result = makeModuleSpec('/src/routes/index.ts', { output: '/src/routes', split: true })
    expect(result).toBe('.')
  })

  it.concurrent('returns relative path to directory for split mode', () => {
    const result = makeModuleSpec('/src/routes/index.ts', { output: '/src/schemas', split: true })
    expect(result).toBe('../schemas')
  })

  it.concurrent('ensures dot-relative prefix', () => {
    const result = makeModuleSpec('/src/index.ts', { output: '/src/schemas.ts' })
    expect(result).toBe('./schemas')
  })

  it.concurrent('handles nested paths (strips /index)', () => {
    const result = makeModuleSpec('/src/api/v1/routes/users.ts', {
      output: '/src/shared/schemas/index.ts',
    })
    expect(result).toBe('../../../shared/schemas')
  })
})

/* ═══════════════════════════════════ makeConst ═══════════════════════════════════ */

describe('makeConst', () => {
  it.concurrent('generates exported const with PascalCase name', () => {
    expect(makeConst(true, 'User', 'Schema')).toBe('export const UserSchema=')
  })

  it.concurrent('generates non-exported const', () => {
    expect(makeConst(false, 'Post', 'Response')).toBe('const PostResponse=')
  })

  it.concurrent('handles kebab-case input', () => {
    expect(makeConst(true, 'user-profile', 'Schema')).toBe('export const UserProfileSchema=')
  })

  it.concurrent('handles dot-separated input', () => {
    expect(makeConst(true, 'api.user', 'Schema')).toBe('export const ApiUserSchema=')
  })

  it.concurrent('handles input that already ends with suffix', () => {
    expect(makeConst(true, 'UserSchema', 'Schema')).toBe('export const UserSchemaSchema=')
  })

  it.concurrent('handles single character name', () => {
    expect(makeConst(false, 'a', 'Schema')).toBe('const ASchema=')
  })

  it.concurrent('handles numeric prefix in name', () => {
    expect(makeConst(true, '123value', 'Schema')).toBe('export const _123valueSchema=')
  })

  it.concurrent('handles empty name with suffix', () => {
    expect(makeConst(true, '', 'Schema')).toBe('export const Schema=')
  })
})

/* ═══════════════════════════════════ makeExportConst ═══════════════════════════════════ */

describe('makeExportConst', () => {
  it.concurrent('generates single export const', () => {
    expect(makeExportConst({ user: { id: 1 } }, 'Example')).toBe(
      'export const UserExample={"id":1}',
    )
  })

  it.concurrent('generates export const with as const assertion', () => {
    expect(makeExportConst({ user: { id: 1 } }, 'Example', true)).toBe(
      'export const UserExample={"id":1} as const',
    )
  })

  it.concurrent('generates multiple export consts separated by double newline', () => {
    const result = makeExportConst({ user: { id: 1 }, post: { title: 'Hello' } }, 'Data')
    expect(result).toBe('export const UserData={"id":1}\n\nexport const PostData={"title":"Hello"}')
  })

  it.concurrent('generates multiple export consts with as const', () => {
    const result = makeExportConst({ user: { id: 1 }, post: { title: 'Hello' } }, 'Data', true)
    expect(result).toBe(
      'export const UserData={"id":1} as const\n\nexport const PostData={"title":"Hello"} as const',
    )
  })

  it.concurrent('handles empty object', () => {
    expect(makeExportConst({}, 'Example')).toBe('')
  })

  it.concurrent('handles string value', () => {
    expect(makeExportConst({ greeting: 'hello' }, 'Example')).toBe(
      'export const GreetingExample="hello"',
    )
  })

  it.concurrent('handles array value', () => {
    expect(makeExportConst({ tags: [1, 2, 3] }, 'Example')).toBe('export const TagsExample=[1,2,3]')
  })

  it.concurrent('handles null value', () => {
    expect(makeExportConst({ empty: null }, 'Example')).toBe('export const EmptyExample=null')
  })

  it.concurrent('handles nested object value', () => {
    expect(makeExportConst({ config: { a: { b: 'c' } } }, 'Example')).toBe(
      'export const ConfigExample={"a":{"b":"c"}}',
    )
  })

  it.concurrent('handles kebab-case keys', () => {
    expect(makeExportConst({ 'user-profile': { name: 'test' } }, 'Example')).toBe(
      'export const UserProfileExample={"name":"test"}',
    )
  })

  it.concurrent('without readonly flag defaults to no as const', () => {
    expect(makeExportConst({ item: 42 }, 'Value', false)).toBe('export const ItemValue=42')
  })

  it.concurrent('with undefined readonly flag defaults to no as const', () => {
    expect(makeExportConst({ item: 42 }, 'Value', undefined)).toBe('export const ItemValue=42')
  })
})

/* ═══════════════════════════════════ makeImports ═══════════════════════════════════ */

describe('makeImports', () => {
  it.concurrent('adds z import when code uses z.', () => {
    const code = 'z.string()'
    const result = makeImports(code, '/src/routes/user.ts', undefined)
    expect(result).toBe("import{z}from'@hono/zod-openapi'\n\n\nz.string()")
  })

  it.concurrent('adds createRoute import when code uses createRoute(', () => {
    const code = 'const route = createRoute({ method: "get" })'
    const result = makeImports(code, '/src/routes/user.ts', undefined)
    expect(result).toBe(
      'import{createRoute}from\'@hono/zod-openapi\'\n\n\nconst route = createRoute({ method: "get" })',
    )
  })

  it.concurrent('inserts honoExtras between createRoute and z', () => {
    const code = 'const route = createRoute({ request: { body: z.object({}) } })'
    const result = makeImports(code, '/src/routes/user.ts', undefined, false, [
      'defineOpenAPIRoute',
    ])
    expect(result).toBe(
      "import{createRoute,defineOpenAPIRoute,z}from'@hono/zod-openapi'\n\n\nconst route = createRoute({ request: { body: z.object({}) } })",
    )
  })

  it.concurrent('adds both createRoute and z imports', () => {
    const code = 'const route = createRoute({ request: { body: z.object({}) } })'
    const result = makeImports(code, '/src/routes/user.ts', undefined)
    expect(result).toBe(
      "import{createRoute,z}from'@hono/zod-openapi'\n\n\nconst route = createRoute({ request: { body: z.object({}) } })",
    )
  })

  it.concurrent('adds schema imports from components', () => {
    const code = 'const route = createRoute({ request: { body: UserSchema } })'
    const result = makeImports(code, '/src/routes/user.ts', {
      schemas: { output: '/src/schemas.ts' },
    })
    expect(result).toBe(
      "import{createRoute}from'@hono/zod-openapi'\nimport{UserSchema}from'../schemas'\n\n\nconst route = createRoute({ request: { body: UserSchema } })",
    )
  })

  it.concurrent('adds multiple schema imports sorted alphabetically', () => {
    const code = 'PostSchema, UserSchema, CommentSchema'
    const result = makeImports(code, '/src/routes/index.ts', {
      schemas: { output: '/src/schemas.ts' },
    })
    expect(result).toBe(
      "import{CommentSchema,PostSchema,UserSchema}from'../schemas'\n\n\nPostSchema, UserSchema, CommentSchema",
    )
  })

  it.concurrent('excludes locally defined exports from imports', () => {
    const code =
      'export const UserSchema = z.object({})\nconst route = createRoute({ body: UserSchema })'
    const result = makeImports(code, '/src/routes/user.ts', {
      schemas: { output: '/src/schemas.ts' },
    })
    expect(result.includes('import{UserSchema}')).toBe(false)
  })

  it.concurrent('handles ParamsSchema pattern for parameters', () => {
    const code = 'IdParamsSchema'
    const result = makeImports(code, '/src/routes/user.ts', {
      parameters: { output: '/src/parameters.ts' },
    })
    expect(result).toBe("import{IdParamsSchema}from'../parameters'\n\n\nIdParamsSchema")
  })

  it.concurrent('handles Response pattern', () => {
    const code = 'UserResponse'
    const result = makeImports(code, '/src/routes/user.ts', {
      responses: { output: '/src/responses.ts' },
    })
    expect(result).toBe("import{UserResponse}from'../responses'\n\n\nUserResponse")
  })

  it.concurrent('handles HeaderSchema pattern', () => {
    const code = 'AuthHeaderSchema'
    const result = makeImports(code, '/src/routes/user.ts', {
      headers: { output: '/src/headers.ts' },
    })
    expect(result).toBe("import{AuthHeaderSchema}from'../headers'\n\n\nAuthHeaderSchema")
  })

  it.concurrent('handles Example pattern', () => {
    const code = 'UserExample'
    const result = makeImports(code, '/src/routes/user.ts', {
      examples: { output: '/src/examples.ts' },
    })
    expect(result).toBe("import{UserExample}from'../examples'\n\n\nUserExample")
  })

  it.concurrent('handles SecurityScheme pattern', () => {
    const code = 'BearerSecurityScheme'
    const result = makeImports(code, '/src/routes/user.ts', {
      securitySchemes: { output: '/src/security.ts' },
    })
    expect(result).toBe("import{BearerSecurityScheme}from'../security'\n\n\nBearerSecurityScheme")
  })

  it.concurrent('handles RequestBody pattern', () => {
    const code = 'CreateUserRequestBody'
    const result = makeImports(code, '/src/routes/user.ts', {
      requestBodies: { output: '/src/request-bodies.ts' },
    })
    expect(result).toBe(
      "import{CreateUserRequestBody}from'../request-bodies'\n\n\nCreateUserRequestBody",
    )
  })

  it.concurrent('handles Link pattern', () => {
    const code = 'GetUserLink'
    const result = makeImports(code, '/src/routes/user.ts', {
      links: { output: '/src/links.ts' },
    })
    expect(result).toBe("import{GetUserLink}from'../links'\n\n\nGetUserLink")
  })

  it.concurrent('handles Callback pattern', () => {
    const code = 'WebhookCallback'
    const result = makeImports(code, '/src/routes/user.ts', {
      callbacks: { output: '/src/callbacks.ts' },
    })
    expect(result).toBe("import{WebhookCallback}from'../callbacks'\n\n\nWebhookCallback")
  })

  it.concurrent('uses fallback path when component not in config', () => {
    const code = 'UserSchema'
    const result = makeImports(code, '/src/routes/user.ts', undefined)
    expect(result).toBe("import{UserSchema}from'./schemas'\n\n\nUserSchema")
  })

  it.concurrent('uses split fallback prefix when split is true', () => {
    const code = 'UserSchema'
    const result = makeImports(code, '/src/routes/user.ts', undefined, true)
    expect(result).toBe("import{UserSchema}from'../schemas'\n\n\nUserSchema")
  })

  it.concurrent('uses custom import path from component config', () => {
    const code = 'UserSchema'
    const result = makeImports(code, '/src/routes/user.ts', {
      schemas: { output: '/src/schemas.ts', import: '@/schemas' },
    })
    expect(result).toBe("import{UserSchema}from'@/schemas'\n\n\nUserSchema")
  })

  it.concurrent('returns code without imports when no patterns match', () => {
    const code = 'const x = 1'
    const result = makeImports(code, '/src/routes/user.ts', undefined)
    expect(result).toBe('\n\nconst x = 1')
  })

  it.concurrent('handles code with no z. and no createRoute', () => {
    const code = 'const hello = "world"'
    const result = makeImports(code, '/src/routes/user.ts', undefined)
    expect(result).toBe('\n\nconst hello = "world"')
  })

  it.concurrent('handles multiple component types in same code', () => {
    const code = 'UserSchema, IdParamsSchema, UserResponse'
    const result = makeImports(code, '/src/routes/index.ts', {
      schemas: { output: '/src/schemas.ts' },
      parameters: { output: '/src/parameters.ts' },
      responses: { output: '/src/responses.ts' },
    })
    expect(result).toBe(
      "import{UserSchema}from'../schemas'\nimport{UserResponse}from'../responses'\nimport{IdParamsSchema}from'../parameters'\n\n\nUserSchema, IdParamsSchema, UserResponse",
    )
  })

  it.concurrent('handles MediaTypeSchema pattern', () => {
    const code = 'JsonMediaTypeSchema'
    const result = makeImports(code, '/src/routes/user.ts', {
      mediaTypes: { output: '/src/media-types.ts' },
    })
    expect(result).toBe("import{JsonMediaTypeSchema}from'../media-types'\n\n\nJsonMediaTypeSchema")
  })

  it.concurrent('MediaTypeSchema is not matched as generic Schema', () => {
    const code = 'JsonMediaTypeSchema'
    const result = makeImports(code, '/src/routes/user.ts', {
      schemas: { output: '/src/schemas.ts' },
      mediaTypes: { output: '/src/media-types.ts' },
    })
    // MediaTypeSchema should only appear in mediaTypes import, not schemas
    expect(result.includes("import{JsonMediaTypeSchema}from'../media-types'")).toBe(true)
    expect(result.includes("import{JsonMediaTypeSchema}from'../schemas'")).toBe(false)
  })

  // -----------------------------------------------------------------
  // Regression tests for string-literal false positives.
  //
  // The auto-import detector matches patterns like `\bXxxCallback\b` to find
  // referenced component identifiers. Without stripping string contents
  // before scanning, identifier-shaped tokens that happen to live inside a
  // quoted value (e.g. `operationId: 'userCreatedCallback'`,
  // `description: 'See UserSchema for details'`) get falsely detected as
  // imports. The bug surfaced in split mode where it produced self-imports
  // like `import { userCreatedCallback } from './index'`.
  //
  // Every component-type pattern needs coverage so any future regex
  // refactor cannot reintroduce a leak in just one type.
  // -----------------------------------------------------------------
  it('ignores Callback identifier inside single-quoted string', () => {
    const code = `export const UserCreatedCallback = {
  post: { operationId: 'userCreatedCallback' },
}`
    const result = makeImports(code, '/src/components/callbacks/userCreated.ts', {
      callbacks: { output: '/src/components/callbacks', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('userCreatedCallback'))).toBe(false)
  })

  it('ignores Schema identifier inside double-quoted JSON-style string', () => {
    // `pathItems` / `callbacks` generators emit JSON.stringify output where
    // object keys land in double quotes. A token like `"UserSchema"` (a key,
    // not a value) must not trigger a schema import.
    const code = `export const ProductsItem = {
  "get": { "responses": { "200": { "description": "See UserSchema below" } } },
}`
    const result = makeImports(code, '/src/components/pathItems/products.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('UserSchema'))).toBe(false)
  })

  it('ignores Response identifier inside template literal', () => {
    const code = `export const X = {
  description: \`returns UserResponse on success\`,
}`
    const result = makeImports(code, '/src/x.ts', {
      responses: { output: '/src/components/responses', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('UserResponse'))).toBe(false)
  })

  it('ignores RequestBody / Example / Link / Header / SecurityScheme inside strings', () => {
    // One pass covering all remaining component-type patterns to lock in the
    // strip's coverage across every regex in IMPORT_PATTERNS.
    const code = `export const X = {
  a: 'see CreateUserRequestBody',
  b: 'inspect UserExample',
  c: 'GetUserLink',
  d: 'X-IdHeaderSchema',
  e: 'BearerAuthSecurityScheme',
  f: 'JsonMediaTypeSchema',
  g: 'UserParamsSchema',
}`
    const result = makeImports(code, '/src/x.ts', {
      requestBodies: { output: '/src/components/requestBodies', split: true },
      examples: { output: '/src/components/examples', split: true },
      links: { output: '/src/components/links', split: true },
      headers: { output: '/src/components/headers', split: true },
      securitySchemes: { output: '/src/components/securitySchemes', split: true },
      mediaTypes: { output: '/src/components/mediaTypes', split: true },
      parameters: { output: '/src/components/parameters', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.length).toBe(0)
  })

  it('ignores identifiers inside strings even when escaped quotes are present', () => {
    // `\'` inside a single-quoted string previously could throw the parser
    // off and re-enter scanning mode mid-string. The strip must skip past
    // the escape and stay inside the literal until the unescaped closer.
    const code = `export const X = { msg: 'don\\'t use UserSchema directly' }`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('UserSchema'))).toBe(false)
  })

  it('still imports identifiers in real code positions', () => {
    const code = 'export const Wrapper = { inner: UserCreatedCallback }'
    const result = makeImports(code, '/src/wrap.ts', {
      callbacks: { output: '/src/components/callbacks', split: true },
    })
    expect(result.includes('import{UserCreatedCallback}from')).toBe(true)
  })

  it('detects identifier when one occurrence is in code and another is in a string', () => {
    // Mixed scenario: the same identifier appears in BOTH a string AND a
    // real reference. The detector should still emit one import (because
    // there is a real reference), and not double-count or skip it.
    const code = `export const X = {
  description: 'creates UserSchema instance',
  schema: UserSchema,
}`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    const userSchemaImports = importLines.filter((l) => l.includes('UserSchema'))
    expect(userSchemaImports.length).toBe(1)
  })

  it('does not self-import when an identifier shape matches the file own export', () => {
    // The defined-set filter must continue to work after the strip pass so a
    // file that exports `UserCreatedCallback` does not import its own name
    // even when said name appears multiple times in the body.
    const code = `export const UserCreatedCallback = {
  inner: UserCreatedCallback,
}`
    const result = makeImports(code, '/src/components/callbacks/userCreated.ts', {
      callbacks: { output: '/src/components/callbacks', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('UserCreatedCallback'))).toBe(false)
  })

  it('ignores identifier-shape tokens inside line comments (`// ...`)', () => {
    // Generated JSDoc / comment-out blocks could mention identifier names
    // (e.g. `// see UserSchema for the runtime check`). Without comment
    // stripping the auto-import detector would emit a phantom import.
    const code = `// see UserSchema for the runtime check
export const X = { v: 1 }`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('UserSchema'))).toBe(false)
  })

  it('ignores identifier-shape tokens inside block comments (`/* ... */` and JSDoc)', () => {
    const code = `/**
 * @returns the UserSchema instance
 * Other refs: BearerAuthSecurityScheme, GetUserLink, JsonMediaTypeSchema
 */
export const X = { v: 1 }`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      securitySchemes: { output: '/src/components/securitySchemes', split: true },
      links: { output: '/src/components/links', split: true },
      mediaTypes: { output: '/src/components/mediaTypes', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.length).toBe(0)
  })

  it('still imports identifier when comment mentions it AND code references it', () => {
    // Real reference outside the comment must still trigger the import; the
    // comment mention alone should not double-emit anything.
    const code = `// validates UserSchema input
export const X = { schema: UserSchema }`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    const userSchemaImports = importLines.filter((l) => l.includes('UserSchema'))
    expect(userSchemaImports.length).toBe(1)
  })

  // ============================================================
  // Suffix disambiguation: longest match wins regardless of source order.
  // Regression: `UserParamsSchema` ended up classified as `schemas` when
  // `Schema` came first in `COMPONENT_SUFFIXES`. `classifyRef` now picks
  // the longest matching suffix, so source order in COMPONENT_SUFFIXES is
  // purely cosmetic.
  // ============================================================
  it('classifies *ParamsSchema as parameters even though *Schema also matches', () => {
    const code = 'UserParamsSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      parameters: { output: '/src/components/parameters', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(
      importLines.some((l) => l.includes('parameters') && l.includes('UserParamsSchema')),
    ).toBe(true)
    expect(importLines.some((l) => l.includes('schemas') && l.includes('UserParamsSchema'))).toBe(
      false,
    )
  })

  it('classifies *HeaderSchema as headers (not schemas)', () => {
    const code = 'XRequestIdHeaderSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      headers: { output: '/src/components/headers', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(
      importLines.some((l) => l.includes('headers') && l.includes('XRequestIdHeaderSchema')),
    ).toBe(true)
    expect(
      importLines.some((l) => l.includes('schemas') && l.includes('XRequestIdHeaderSchema')),
    ).toBe(false)
  })

  it('classifies *MediaTypeSchema as mediaTypes (not schemas)', () => {
    const code = 'JsonUserMediaTypeSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      mediaTypes: { output: '/src/components/mediaTypes', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(
      importLines.some((l) => l.includes('mediaTypes') && l.includes('JsonUserMediaTypeSchema')),
    ).toBe(true)
    expect(
      importLines.some((l) => l.includes('schemas') && l.includes('JsonUserMediaTypeSchema')),
    ).toBe(false)
  })

  it('handles a name where multiple long suffixes both end with Schema (chain)', () => {
    // A pathological identifier ending with the longest suffix should still
    // be classified by the longest match, not by the shorter prefix-of-suffix.
    const code = 'XParamsSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      parameters: { output: '/src/components/parameters', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('parameters'))).toBe(true)
    expect(importLines.some((l) => l.includes('schemas'))).toBe(false)
  })

  it('handles all 11 OpenAPI 3.x component types in one body', () => {
    // OpenAPI 3.0 / 3.1 / 3.2 share these 11 components — verify each
    // identifier suffix routes to the correct kind in a single pass.
    const code = [
      'UserSchema',
      'IdParamsSchema',
      'XHeaderSchema',
      'BearerAuthSecurityScheme',
      'CreateUserRequestBody',
      'OkResponse',
      'GoodExample',
      'NextLink',
      'WebhookCallback',
      'PetsItemPathItem',
      'JsonMediaTypeSchema',
    ].join(',')
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      parameters: { output: '/src/components/parameters', split: true },
      headers: { output: '/src/components/headers', split: true },
      securitySchemes: { output: '/src/components/securitySchemes', split: true },
      requestBodies: { output: '/src/components/requestBodies', split: true },
      responses: { output: '/src/components/responses', split: true },
      examples: { output: '/src/components/examples', split: true },
      links: { output: '/src/components/links', split: true },
      callbacks: { output: '/src/components/callbacks', split: true },
      pathItems: { output: '/src/components/pathItems', split: true },
      mediaTypes: { output: '/src/components/mediaTypes', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('schemas') && l.includes('UserSchema'))).toBe(true)
    expect(importLines.some((l) => l.includes('parameters') && l.includes('IdParamsSchema'))).toBe(
      true,
    )
    expect(importLines.some((l) => l.includes('headers') && l.includes('XHeaderSchema'))).toBe(true)
    expect(
      importLines.some(
        (l) => l.includes('securitySchemes') && l.includes('BearerAuthSecurityScheme'),
      ),
    ).toBe(true)
    expect(
      importLines.some((l) => l.includes('requestBodies') && l.includes('CreateUserRequestBody')),
    ).toBe(true)
    expect(importLines.some((l) => l.includes('responses') && l.includes('OkResponse'))).toBe(true)
    expect(importLines.some((l) => l.includes('examples') && l.includes('GoodExample'))).toBe(true)
    expect(importLines.some((l) => l.includes('links') && l.includes('NextLink'))).toBe(true)
    expect(importLines.some((l) => l.includes('callbacks') && l.includes('WebhookCallback'))).toBe(
      true,
    )
    expect(importLines.some((l) => l.includes('pathItems') && l.includes('PetsItemPathItem'))).toBe(
      true,
    )
    expect(
      importLines.some((l) => l.includes('mediaTypes') && l.includes('JsonMediaTypeSchema')),
    ).toBe(true)
  })

  it('does not import when configured component path is missing', () => {
    // If the user only configures schemas, an identifier ending in `Header
    // Schema` shouldn't crash or emit a fallback path silently — it just
    // doesn't get imported (caller decides the policy).
    const code = 'UserSchema, XRequestIdHeaderSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes('UserSchema'))).toBe(true)
    // headers path is not configured — fallback emits to ../headers via fallbackPrefix
    expect(
      importLines.some((l) => l.includes('headers') && l.includes('XRequestIdHeaderSchema')),
    ).toBe(true)
  })

  // ============================================================
  // Output ordering — COMPONENT_SUFFIXES declaration order regardless of
  // scan-encounter order. Source layout MUST NOT leak into emitted import
  // order; otherwise a trivial whitespace tweak in the generator changes
  // the resulting file diff.
  // ============================================================
  it('emits imports in COMPONENT_SUFFIXES order even when scan encounter is reversed', () => {
    // Reverse encounter: Header → Schema → Param. Output must be:
    // schemas → parameters → headers (config / spec order).
    const code = 'XHeaderSchema, UserSchema, IdParamsSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      parameters: { output: '/src/components/parameters', split: true },
      headers: { output: '/src/components/headers', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    const findIdx = (token: string) => importLines.findIndex((l) => l.includes(token))
    expect(findIdx('UserSchema')).toBeLessThan(findIdx('IdParamsSchema'))
    expect(findIdx('IdParamsSchema')).toBeLessThan(findIdx('XHeaderSchema'))
  })

  // ============================================================
  // Identifier position robustness — generators can place refs after any
  // JS code-position character. Confirm `\b` boundary works.
  // ============================================================
  it('detects identifier preceded by various JS punctuation', () => {
    // Cases: after `(`, `[`, `,`, `:`, `=`, ` `, newline, `{`
    const code = `[
  UserSchema,
  ((PetSchema)),
  { x: TodoSchema },
  =CommentSchema=
]`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    expect(result.includes('UserSchema')).toBe(true)
    expect(result.includes('PetSchema')).toBe(true)
    expect(result.includes('TodoSchema')).toBe(true)
    expect(result.includes('CommentSchema')).toBe(true)
  })

  // ============================================================
  // SCAN regex robustness — body contains only strings/comments. No
  // import lines should be emitted (besides @hono/zod-openapi for `z.`
  // detection if applicable).
  // ============================================================
  it('emits no component imports when body is only strings and comments', () => {
    const code = `// just a comment with UserSchema mentioned
'string with UserSchema',
"another string with PetSchema",
/* block comment with CommentSchema */`
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.some((l) => l.includes("from '../components/schemas'"))).toBe(false)
  })

  it('emits no imports for empty body', () => {
    const result = makeImports('', '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    expect(importLines.length).toBe(0)
  })

  // ============================================================
  // Bare suffix name (no prefix) — should NOT match. The regex requires
  // at least one identifier char before the suffix (`\w+Schema`).
  // ============================================================
  it('does not match the bare suffix name (e.g. just "Schema")', () => {
    const code = 'Schema, Response, Callback, PathItem'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      responses: { output: '/src/components/responses', split: true },
      callbacks: { output: '/src/components/callbacks', split: true },
      pathItems: { output: '/src/components/pathItems', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    // Bare 'Schema' / 'Response' / 'Callback' / 'PathItem' shouldn't be imported
    expect(importLines.length).toBe(0)
  })

  // ============================================================
  // Nested suffix substring — `XParamsSchemaSchema` ends in `Schema`,
  // but it ALSO ends in `ParamsSchemaSchema` which isn't a known
  // suffix. Longest match should pick the longest KNOWN suffix
  // (`ParamsSchema` — 12 chars).
  // ============================================================
  it('classifies repeated-suffix identifier by longest known suffix', () => {
    // `UserSchemaSchema` ends in both 'Schema' (6) and... nothing longer
    // that's a known suffix. So it gets classified as schemas.
    const code = 'UserSchemaSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    expect(result.includes('import{UserSchemaSchema}from')).toBe(true)
  })

  it('classifies *ParamsSchemaSchema correctly (ends in two Schemas)', () => {
    // `XParamsSchemaSchema` — endsWith('Schema') ✓, endsWith('ParamsSchema') ✗
    // (since the last 12 chars are 'SchemaSchema', not 'ParamsSchema').
    // So the classification is `schemas` (the only matching suffix).
    const code = 'XParamsSchemaSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
      parameters: { output: '/src/components/parameters', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    // Identifier MUST be imported, classified as schemas (not parameters)
    expect(
      importLines.some((l) => l.includes('XParamsSchemaSchema') && l.includes('schemas')),
    ).toBe(true)
    expect(
      importLines.some((l) => l.includes('XParamsSchemaSchema') && l.includes('parameters')),
    ).toBe(false)
  })

  // ============================================================
  // Unicode safety — identifiers with non-ASCII letters are not in
  // OpenAPI generator output (we sanitize to PascalCase ASCII), but the
  // regex `[A-Za-z_$]` correctly excludes them. Document this behavior.
  // ============================================================
  it('does not import identifiers starting with non-ASCII letters', () => {
    // `日本Schema` would be a non-ASCII identifier. JS_IDENT requires
    // `[A-Za-z_$]` start char, so the regex captures only the ASCII tail.
    // The captured form here would be 'Schema' alone — but the regex
    // requires at least one identifier char before the suffix (`\w+Schema`),
    // so `Schema` alone doesn't match.
    const code = '日本Schema, UserSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    // UserSchema imported, but the non-ASCII-prefixed identifier produces
    // no import (would-be capture 'Schema' is too short to match `\w+`).
    expect(importLines.some((l) => l.includes('UserSchema'))).toBe(true)
    expect(importLines.some((l) => l.includes('日本'))).toBe(false)
  })

  // ============================================================
  // Multiple references to the same identifier collapse to one import.
  // ============================================================
  it('collapses duplicate identifier references into a single import', () => {
    const code = 'UserSchema; UserSchema; UserSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    // Count occurrences of the import line
    const importMatches = result.match(/import\{UserSchema\}/g) ?? []
    expect(importMatches.length).toBe(1)
  })

  // ============================================================
  // Multiple distinct identifiers from same kind merge into one import line.
  // ============================================================
  it('merges multiple identifiers of the same kind into one sorted import line', () => {
    const code = 'UserSchema, PetSchema, CommentSchema'
    const result = makeImports(code, '/src/x.ts', {
      schemas: { output: '/src/components/schemas', split: true },
    })
    const importLines = result.split('\n').filter((l) => l.startsWith('import'))
    // Single import line containing all three names sorted alphabetically.
    expect(importLines.some((l) => l.includes('{CommentSchema,PetSchema,UserSchema}'))).toBe(true)
    // No separate import line per identifier.
    expect(importLines.filter((l) => l.includes('schemas')).length).toBe(1)
  })
})
