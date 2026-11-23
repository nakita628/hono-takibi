import { describe, expect, it } from 'vite-plus/test'

import { isRecord } from '../guard/index.js'
import type { OpenAPI } from '../openapi/index.js'
import {
  declareSchemaPointers,
  hoistRecursivePointers,
  inlinePointerRefs,
  resolveEmbeddedRefs,
} from './pointer.js'

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

  it.concurrent('leaves a $ref to a component, and a pointer the document does not resolve, as written', () => {
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

  // #499: a pointer that goes on inside a component schema names the schema found there.
  it.concurrent('inlines a $ref that points inside a component schema', () => {
    const doc = {
      openapi: '3.1.0',
      info: { title: 'deep-pointer', version: '1.0.0' },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        fee: {
                          $ref: '#/components/schemas/Block/properties/fee',
                          description: 'The fee',
                        },
                        tag: { $ref: '#/components/schemas/Block/properties/tags/items' },
                        base: { $ref: '#/components/schemas/Derived/allOf/0' },
                        block: { $ref: '#/components/schemas/Block' },
                      },
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
          Block: {
            type: 'object',
            properties: {
              fee: { type: 'string', pattern: '^[0-9]+$' },
              tags: { type: 'array', items: { type: 'string', pattern: '^[a-z]+$' } },
              total: { $ref: '#/components/schemas/Block/properties/fee' },
            },
          },
          Derived: {
            allOf: [
              { type: 'object', properties: { id: { type: 'string' } } },
              { type: 'object', properties: { extra: { type: 'string' } } },
            ],
          },
        },
      },
    } as OpenAPI
    const result = inlinePointerRefs(doc)
    expect(
      at(result, 'paths', '/a', 'get', 'responses', '200', 'content', 'application/json', 'schema'),
    ).toStrictEqual({
      type: 'object',
      properties: {
        fee: { type: 'string', pattern: '^[0-9]+$', description: 'The fee' },
        tag: { type: 'string', pattern: '^[a-z]+$' },
        base: { type: 'object', properties: { id: { type: 'string' } } },
        block: { $ref: '#/components/schemas/Block' },
      },
    })
    expect(at(result, 'components', 'schemas', 'Block', 'properties', 'total')).toStrictEqual({
      type: 'string',
      pattern: '^[0-9]+$',
    })
  })

  // #499: a bundler points along the path it read, across a node it wrote as a `$ref`.
  it.concurrent('reads a pointer through a $ref on its way', () => {
    const through = {
      openapi: '3.1.0',
      info: { title: 'through', version: '1.0.0' },
      paths: {
        '/blocks': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: { anyOf: [{ $ref: '#/components/schemas/Contents' }] },
                },
              },
            },
            responses: {
              '200': {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/paths/~1blocks/post/requestBody/content/application~1json/schema/anyOf/0/properties/proofs/items',
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
          Contents: { $ref: '#/components/schemas/Fulu' },
          Fulu: {
            type: 'object',
            properties: { proofs: { type: 'array', items: { type: 'string', pattern: '^0x' } } },
          },
          Loop: { $ref: '#/components/schemas/Loop' },
          Lost: { $ref: '#/components/schemas/Loop/properties/id' },
        },
      },
    } as OpenAPI
    const result = inlinePointerRefs(through)
    expect(
      at(
        result,
        'paths',
        '/blocks',
        'post',
        'responses',
        '200',
        'content',
        'application/json',
        'schema',
      ),
    ).toStrictEqual({ type: 'string', pattern: '^0x' })
    // A chain of references that comes back to itself names nothing: left as written.
    expect(at(result, 'components', 'schemas', 'Lost')).toStrictEqual({
      $ref: '#/components/schemas/Loop/properties/id',
    })
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

// #404: a recursive definition of an externally referenced schema is declared as a component
describe('hoistRecursivePointers', () => {
  const body = '#/paths/~1apis/post/requestBody/content/application~1json/schema'
  const doc = {
    openapi: '3.0.3',
    info: { title: 'tyk', version: '1.0.0' },
    paths: {
      '/apis': {
        get: {
          responses: {
            '200': {
              description: 'OK',
              content: { 'application/json': { schema: { type: 'array', items: { $ref: body } } } },
            },
          },
        },
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    tags: { type: 'array', items: { $ref: `${body}/definitions/Tag` } },
                    root: { $ref: `${body}/definitions/Node` },
                    left: { $ref: `${body}/definitions/Left` },
                  },
                  definitions: {
                    Tag: { type: 'object', properties: { label: { type: 'string' } } },
                    Node: {
                      type: 'object',
                      properties: {
                        children: { type: 'array', items: { $ref: `${body}/definitions/Node` } },
                      },
                    },
                    Left: {
                      type: 'object',
                      properties: { right: { $ref: `${body}/definitions/Right` } },
                    },
                    Right: {
                      type: 'object',
                      properties: { left: { $ref: `${body}/definitions/Left` } },
                    },
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'OK' } },
        },
      },
    },
    components: { schemas: { Node: { type: 'string' } } },
  } as unknown as OpenAPI

  it.concurrent('declares a recursive definition as a component, numbered when the name is taken', () => {
    const hoisted = hoistRecursivePointers(doc)
    expect(Object.keys(hoisted.components?.schemas ?? {})).toStrictEqual([
      'Node',
      'Node2',
      'Left',
      'Right',
    ])
    expect(at(hoisted, 'components', 'schemas', 'Node2')).toStrictEqual({
      type: 'object',
      properties: {
        children: { type: 'array', items: { $ref: '#/components/schemas/Node2' } },
      },
    })
    expect(at(hoisted, 'components', 'schemas', 'Left')).toStrictEqual({
      type: 'object',
      properties: { right: { $ref: '#/components/schemas/Right' } },
    })
    // every reference to the definition names the component, where the schema is used and in
    // the definitions themselves
    const schema = at(
      hoisted,
      'paths',
      '/apis',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
    )
    expect(
      at({ paths: {}, ...(isRecord(schema) ? schema : {}) }, 'properties', 'root'),
    ).toStrictEqual({
      $ref: '#/components/schemas/Node2',
    })
    expect(
      at({ paths: {}, ...(isRecord(schema) ? schema : {}) }, 'definitions', 'Right'),
    ).toStrictEqual({
      type: 'object',
      properties: { left: { $ref: '#/components/schemas/Left' } },
    })
    // a definition that is not recursive, and the schema itself, stay where they are for inlining
    expect(
      at({ paths: {}, ...(isRecord(schema) ? schema : {}) }, 'properties', 'tags'),
    ).toStrictEqual({
      type: 'array',
      items: { $ref: `${body}/definitions/Tag` },
    })
    expect(
      at(
        hoisted,
        'paths',
        '/apis',
        'get',
        'responses',
        '200',
        'content',
        'application/json',
        'schema',
      ),
    ).toStrictEqual({
      type: 'array',
      items: { $ref: body },
    })
  })

  // #499: a property of a component schema that reaches itself is declared as a component too.
  it.concurrent('declares a recursive property of a component schema as a component', () => {
    const children = '#/components/schemas/Node/properties/children'
    const tree = {
      openapi: '3.1.0',
      info: { title: 'tree', version: '1.0.0' },
      paths: {},
      components: {
        schemas: {
          Node: {
            type: 'object',
            properties: {
              children: {
                type: 'array',
                items: { type: 'object', properties: { children: { $ref: children } } },
              },
            },
          },
        },
      },
    } as OpenAPI
    const result = inlinePointerRefs(hoistRecursivePointers(tree))
    const hoisted = {
      type: 'array',
      items: {
        type: 'object',
        properties: { children: { $ref: '#/components/schemas/children' } },
      },
    }
    expect(result.components?.schemas).toStrictEqual({
      Node: { type: 'object', properties: { children: hoisted } },
      children: hoisted,
    })
  })

  it.concurrent('leaves a document without a recursive pointer equal to itself', () => {
    const plain = {
      openapi: '3.1.0',
      info: { title: 'plain', version: '1.0.0' },
      paths: {
        '/a': {
          get: {
            responses: {
              '200': {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/A' } } },
              },
            },
          },
        },
        '/b': {
          get: {
            responses: { '200': { $ref: '#/paths/~1a/get/responses/200' } },
          },
        },
      },
      components: { schemas: { A: { type: 'string' } } },
    } as OpenAPI
    expect(hoistRecursivePointers(plain)).toBe(plain)
  })
})

// #404: a bundled schema with an `$id` keeps its own `#/definitions/...` pointers
/** The Responses Object of an operation that answers 200 with `schema` as JSON. */
function response(schema: unknown) {
  return { '200': { description: 'ok', content: { 'application/json': { schema } } } }
}

// #499: a schema pointed at inside a component schema is declared once, as a component.
describe('declareSchemaPointers', () => {
  it.concurrent('declares the schema where it is written and names it in every $ref', () => {
    const declared = declareSchemaPointers({
      openapi: '3.1.0',
      info: { title: 'deep-pointer', version: '1.0.0' },
      paths: {
        '/a': {
          get: {
            responses: response({
              type: 'object',
              properties: {
                fee: { $ref: '#/components/schemas/Block/properties/fee', description: 'The fee' },
                tag: { $ref: '#/components/schemas/Block/properties/tags/items' },
                base: { $ref: '#/components/schemas/Derived/allOf/0' },
                block: { $ref: '#/components/schemas/Block' },
              },
            }),
          },
        },
      },
      components: {
        schemas: {
          Block: {
            type: 'object',
            properties: {
              fee: { type: 'string', pattern: '^[0-9]+$' },
              tags: { type: 'array', items: { type: 'string', pattern: '^[a-z]+$' } },
              total: { $ref: '#/components/schemas/Block/properties/fee' },
            },
          },
          Derived: {
            allOf: [
              { type: 'object', properties: { id: { type: 'string' } } },
              { type: 'object', properties: { extra: { type: 'string' } } },
            ],
          },
        },
      },
    } as OpenAPI)
    expect(declared.components?.schemas).toStrictEqual({
      Block: {
        type: 'object',
        properties: {
          fee: { $ref: '#/components/schemas/BlockFee' },
          tags: { type: 'array', items: { $ref: '#/components/schemas/BlockTagsItems' } },
          total: { $ref: '#/components/schemas/BlockFee' },
        },
      },
      Derived: {
        allOf: [
          { $ref: '#/components/schemas/DerivedAllOf0' },
          { type: 'object', properties: { extra: { type: 'string' } } },
        ],
      },
      BlockFee: { type: 'string', pattern: '^[0-9]+$' },
      BlockTagsItems: { type: 'string', pattern: '^[a-z]+$' },
      DerivedAllOf0: { type: 'object', properties: { id: { type: 'string' } } },
    })
    expect(
      at(
        declared,
        'paths',
        '/a',
        'get',
        'responses',
        '200',
        'content',
        'application/json',
        'schema',
      ),
    ).toStrictEqual({
      type: 'object',
      properties: {
        // the keywords beside the `$ref` stay beside it
        fee: { $ref: '#/components/schemas/BlockFee', description: 'The fee' },
        tag: { $ref: '#/components/schemas/BlockTagsItems' },
        base: { $ref: '#/components/schemas/DerivedAllOf0' },
        block: { $ref: '#/components/schemas/Block' },
      },
    })
  })

  it.concurrent('declares a schema inside a declared schema, and one that reaches itself', () => {
    const declared = declareSchemaPointers({
      openapi: '3.1.0',
      info: { title: 'nested', version: '1.0.0' },
      paths: {
        '/a': {
          get: {
            responses: response({
              type: 'object',
              properties: {
                tags: { $ref: '#/components/schemas/Block/properties/tags' },
                tag: { $ref: '#/components/schemas/Block/properties/tags/items' },
              },
            }),
          },
        },
      },
      components: {
        schemas: {
          Block: {
            type: 'object',
            properties: { tags: { type: 'array', items: { type: 'string' } } },
          },
          Node: {
            type: 'object',
            properties: {
              children: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    children: { $ref: '#/components/schemas/Node/properties/children' },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI)
    expect(declared.components?.schemas).toStrictEqual({
      Block: { type: 'object', properties: { tags: { $ref: '#/components/schemas/BlockTags' } } },
      Node: {
        type: 'object',
        properties: { children: { $ref: '#/components/schemas/NodeChildren' } },
      },
      BlockTags: { type: 'array', items: { $ref: '#/components/schemas/BlockTagsItems' } },
      BlockTagsItems: { type: 'string' },
      NodeChildren: {
        type: 'array',
        items: {
          type: 'object',
          properties: { children: { $ref: '#/components/schemas/NodeChildren' } },
        },
      },
    })
  })

  it.concurrent('declares one component for pointers that lead to one place through a $ref', () => {
    const body = '#/paths/~1blocks/post/requestBody/content/application~1json/schema'
    const declared = declareSchemaPointers({
      openapi: '3.1.0',
      info: { title: 'through', version: '1.0.0' },
      paths: {
        '/blocks': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: { anyOf: [{ $ref: '#/components/schemas/Contents' }] },
                },
              },
            },
            responses: response({
              type: 'object',
              properties: {
                a: { $ref: `${body}/anyOf/0/properties/kzg_proofs/items` },
                b: { $ref: '#/components/schemas/Fulu.Contents/properties/kzg_proofs/items' },
                // a node that is a `$ref` itself, and a pointer into `paths`, are not declared
                c: { $ref: '#/components/schemas/Fulu.Contents/properties/owner' },
                d: { $ref: `${body}/anyOf` },
              },
            }),
          },
        },
      },
      components: {
        schemas: {
          Contents: { $ref: '#/components/schemas/Fulu.Contents' },
          'Fulu.Contents': {
            type: 'object',
            properties: {
              kzg_proofs: { type: 'array', items: { type: 'string', pattern: '^0x' } },
              owner: { $ref: '#/components/schemas/Owner' },
            },
          },
          Owner: { type: 'string' },
          // the name is taken: the declared one is numbered
          'Fulu.ContentsKzgProofsItems': { type: 'integer' },
        },
      },
    } as OpenAPI)
    expect(Object.keys(declared.components?.schemas ?? {})).toStrictEqual([
      'Contents',
      'Fulu.Contents',
      'Owner',
      'Fulu.ContentsKzgProofsItems',
      'Fulu.ContentsKzgProofsItems2',
    ])
    expect(at(declared, 'components', 'schemas', 'Fulu.ContentsKzgProofsItems2')).toStrictEqual({
      type: 'string',
      pattern: '^0x',
    })
    expect(
      at(
        declared,
        'paths',
        '/blocks',
        'post',
        'responses',
        '200',
        'content',
        'application/json',
        'schema',
        'properties',
      ),
    ).toStrictEqual({
      a: { $ref: '#/components/schemas/Fulu.ContentsKzgProofsItems2' },
      b: { $ref: '#/components/schemas/Fulu.ContentsKzgProofsItems2' },
      c: { $ref: '#/components/schemas/Fulu.Contents/properties/owner' },
      d: { $ref: `${body}/anyOf` },
    })
  })

  it.concurrent('names a property after itself, whatever it is called', () => {
    const declared = declareSchemaPointers({
      openapi: '3.1.0',
      info: { title: 'names', version: '1.0.0' },
      paths: {},
      components: {
        schemas: {
          Meta: {
            type: 'object',
            properties: { properties: { type: 'object' } },
            $defs: { page_size: { type: 'integer' } },
          },
          Use: {
            type: 'object',
            properties: {
              a: { $ref: '#/components/schemas/Meta/properties/properties' },
              b: { $ref: '#/components/schemas/Meta/$defs/page_size' },
            },
          },
        },
      },
    })
    expect(Object.keys(declared.components?.schemas ?? {})).toStrictEqual([
      'Meta',
      'Use',
      'MetaProperties',
      'MetaPageSize',
    ])
  })

  it.concurrent('leaves a document without such a pointer equal to itself', () => {
    const plain = {
      openapi: '3.1.0',
      info: { title: 'plain', version: '1.0.0' },
      paths: {
        '/a': { get: { responses: response({ $ref: '#/paths/~1a/get/responses/200' }) } },
      },
      components: { schemas: { A: { type: 'string' } } },
    } as OpenAPI
    expect(declareSchemaPointers(plain)).toBe(plain)
  })
})

describe('resolveEmbeddedRefs', () => {
  const schema = '#/paths/~1apis/post/requestBody/content/application~1json/schema'
  const doc = {
    openapi: '3.0.3',
    info: { title: 'tyk', version: '1.0.0' },
    paths: {
      '/apis': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  id: 'https://spec.openapis.org/oas/3.0/schema/2021-09-28',
                  type: 'object',
                  properties: {
                    tags: { type: 'array', items: { $ref: '#/definitions/Tag' } },
                    user: { $ref: '#/components/schemas/User' },
                    nope: { $ref: '#/definitions/Nope' },
                  },
                  definitions: {
                    Tag: { type: 'object', properties: { docs: { $ref: '#/definitions/Docs' } } },
                    Docs: { type: 'object' },
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'OK' } },
        },
      },
    },
    components: {
      schemas: {
        User: { type: 'object', properties: { tag: { $ref: '#/definitions/Tag' } } },
      },
    },
  } as unknown as OpenAPI

  it.concurrent('writes the pointers of the resource as pointers of the document', () => {
    const resolved = resolveEmbeddedRefs(doc)
    const target = at(
      resolved,
      'paths',
      '/apis',
      'post',
      'requestBody',
      'content',
      'application/json',
      'schema',
    )
    const schemaDoc = { paths: {}, ...(isRecord(target) ? target : {}) }
    expect(at(schemaDoc, 'properties', 'tags', 'items')).toStrictEqual({
      $ref: `${schema}/definitions/Tag`,
    })
    expect(at(schemaDoc, 'definitions', 'Tag', 'properties', 'docs')).toStrictEqual({
      $ref: `${schema}/definitions/Docs`,
    })
    // a pointer the document resolves, and one nothing resolves, are left as written
    expect(at(schemaDoc, 'properties', 'user')).toStrictEqual({ $ref: '#/components/schemas/User' })
    expect(at(schemaDoc, 'properties', 'nope')).toStrictEqual({ $ref: '#/definitions/Nope' })
    // outside the resource the document is the resource
    expect(at(resolved, 'components', 'schemas', 'User', 'properties', 'tag')).toStrictEqual({
      $ref: '#/definitions/Tag',
    })
  })

  it.concurrent('leaves a document without such a resource equal to itself', () => {
    const plain = {
      openapi: '3.1.0',
      info: { title: 'plain', version: '1.0.0' },
      paths: { '/a': { get: { responses: { '200': { description: 'OK' } } } } },
      components: { schemas: { A: { $id: 'https://e.example/a', type: 'string' } } },
    } as unknown as OpenAPI
    expect(resolveEmbeddedRefs(plain)).toBe(plain)
  })
})
