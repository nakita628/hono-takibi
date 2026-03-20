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
      "import{UserSchema}from'../schemas'\nimport{IdParamsSchema}from'../parameters'\nimport{UserResponse}from'../responses'\n\n\nUserSchema, IdParamsSchema, UserResponse",
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
})
