import { describe, expect, it } from 'vite-plus/test'

import { isRecord } from '../guard/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { inlinePointerRefs } from './pointer.js'

/** The value at a path of keys in the document, `undefined` where the path leaves it. */
function at(document: OpenAPI, ...keys: readonly string[]) {
  return keys.reduce<unknown>(
    (node, key) =>
      Array.isArray(node) ? node[Number(key)] : isRecord(node) ? node[key] : undefined,
    document,
  )
}

// #363: a `$ref` into `paths` names no component; it is written out where it stands.
describe('inlinePointerRefs', () => {
  const body = {
    type: 'object',
    required: ['code'],
    properties: { code: { type: 'string' }, name: { type: 'string' } },
  } as const
  const spec = {
    openapi: '3.0.1',
    info: { title: 'freee', version: '1.0.0' },
    paths: {
      '/partners/upsert': {
        put: {
          requestBody: {
            content: {
              'application/json': { schema: body },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/paths/~1partners~1upsert/put/requestBody/content/application~1json/schema',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { id: { type: 'integer' } } },
                },
              },
            },
          },
        },
      },
      '/partners/{id}': {
        get: {
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/paths/~1partners~1upsert/put/responses/200/content/application~1json/schema',
                    description: 'The partner',
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Partner: { $ref: '#/components/schemas/Other' },
        Other: {
          type: 'object',
          properties: { id: { $ref: '#/components/schemas/Partner/properties/id' } },
        },
      },
      parameters: {
        Page: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } },
      },
    },
  } as OpenAPI

  it.concurrent('inlines a $ref into paths (JSON Pointer with ~1), keeping the keywords beside it', () => {
    const result = inlinePointerRefs(spec)
    expect(
      at(
        result,
        'paths',
        '/partners/upsert',
        'put',
        'requestBody',
        'content',
        'application/x-www-form-urlencoded',
        'schema',
      ),
    ).toStrictEqual(body)
    expect(
      at(
        result,
        'paths',
        '/partners/{id}',
        'get',
        'responses',
        '200',
        'content',
        'application/json',
        'schema',
      ),
    ).toStrictEqual({
      type: 'object',
      properties: { id: { type: 'integer' } },
      description: 'The partner',
    })
  })

  it.concurrent('leaves a $ref to a component, and to a property of a component schema, as written', () => {
    const result = inlinePointerRefs(spec)
    expect(result.components?.schemas).toStrictEqual(spec.components?.schemas)
    expect(
      at(
        result,
        'paths',
        '/partners/upsert',
        'put',
        'requestBody',
        'content',
        'application/json',
        'schema',
      ),
    ).toStrictEqual(body)
  })

  it.concurrent('inlines a $ref to the schema of a component parameter', () => {
    const doc = {
      ...spec,
      paths: {
        '/items': {
          get: {
            parameters: [
              {
                name: 'page',
                in: 'query',
                schema: { $ref: '#/components/parameters/Page/schema' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    } as OpenAPI
    expect(at(inlinePointerRefs(doc), 'paths', '/items', 'get', 'parameters', '0')).toStrictEqual({
      name: 'page',
      in: 'query',
      schema: { type: 'integer', minimum: 1 },
    })
  })

  it.concurrent('leaves a pointer that names nothing, and one that comes back to itself, as written', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'cycle', version: '1.0.0' },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        self: {
                          $ref: '#/paths/~1a/get/responses/200/content/application~1json/schema',
                        },
                        missing: { $ref: '#/paths/~1nope/get' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI
    const schema = at(
      inlinePointerRefs(doc),
      'paths',
      '/a',
      'get',
      'responses',
      '200',
      'content',
      'application/json',
      'schema',
    )
    // The cycle is inlined once, and the reference inside the copy is left where it would come back.
    expect(
      at({ paths: {}, ...(isRecord(schema) ? schema : {}) }, 'properties', 'self'),
    ).toStrictEqual({
      type: 'object',
      properties: {
        self: { $ref: '#/paths/~1a/get/responses/200/content/application~1json/schema' },
        missing: { $ref: '#/paths/~1nope/get' },
      },
    })
    expect(
      at({ paths: {}, ...(isRecord(schema) ? schema : {}) }, 'properties', 'missing'),
    ).toStrictEqual({ $ref: '#/paths/~1nope/get' })
  })

  it.concurrent('leaves a document without such references equal to itself', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'plain', version: '1.0.0' },
      paths: { '/a': { get: { responses: { '200': { description: 'OK' } } } } },
      components: {
        schemas: {
          A: { type: 'object', properties: { b: { $ref: '#/components/schemas/B' } } },
          B: { type: 'string' },
        },
      },
    } as OpenAPI
    expect(inlinePointerRefs(doc)).toStrictEqual(doc)
  })
})
