import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../openapi/index.js'
import {
  normalizeOpenAPI,
  templateParameterWarnings,
  undeclaredTemplateParameters,
  withoutExtensions,
  withTemplateParameters,
} from './document.js'

// #416: an `x-` key of the Paths, Responses and Callback Objects is an extension, not an entry
describe('withoutExtensions', () => {
  const ok = { description: 'OK' }
  const doc = {
    openapi: '3.0.0',
    info: { title: 'ext', version: '1.0.0' },
    paths: {
      'x-vendor-object': { get: { responses: { default: ok } } },
      'x-vendor-null': null,
      '/thing': {
        'x-item': 1,
        post: {
          'x-op': 1,
          responses: { '200': ok, 'x-vendor-object': { description: 'not a status code' } },
          callbacks: {
            onEvent: {
              'x-cb': 1,
              '{$request.body#/url}': {
                post: { responses: { '200': ok, 'x-r': ok } },
              },
            },
            byRef: { $ref: '#/components/callbacks/Shared' },
          },
        },
      },
    },
    webhooks: { 'x-hook': { post: { responses: { '200': ok, 'x-r': ok } } } },
    components: {
      schemas: { 'x-name': { type: 'string' } },
      pathItems: { Item: { get: { responses: { '200': ok, 'x-r': ok } } } },
      callbacks: {
        Shared: { 'x-cb': 1, '{$url}': { post: { responses: { 'x-r': ok, '200': ok } } } },
      },
    },
  } as unknown as OpenAPI

  it.concurrent('leaves out the extensions of paths, responses and callbacks', () => {
    expect(withoutExtensions(doc)).toStrictEqual({
      ...doc,
      paths: {
        '/thing': {
          'x-item': 1,
          post: {
            'x-op': 1,
            responses: { '200': ok },
            callbacks: {
              onEvent: { '{$request.body#/url}': { post: { responses: { '200': ok } } } },
              byRef: { $ref: '#/components/callbacks/Shared' },
            },
          },
        },
      },
      // a webhook or a component is named by its key, whatever it starts with
      webhooks: { 'x-hook': { post: { responses: { '200': ok } } } },
      components: {
        schemas: { 'x-name': { type: 'string' } },
        pathItems: { Item: { get: { responses: { '200': ok } } } },
        callbacks: { Shared: { '{$url}': { post: { responses: { '200': ok } } } } },
      },
    })
  })

  it.concurrent('leaves a document without such keys equal to itself', () => {
    const plain = {
      openapi: '3.0.0',
      info: { title: 'plain', version: '1.0.0' },
      paths: { '/a': { get: { responses: { '200': ok } } } },
    } as OpenAPI
    expect(withoutExtensions(plain)).toBe(plain)
  })
})

describe('normalizeOpenAPI', () => {
  it.concurrent('inlines a pointer into an x- path before leaving the path out', () => {
    const ok = { description: 'OK' }
    const doc = {
      openapi: '3.0.0',
      info: { title: 'mermade', version: '1.0.0' },
      paths: {
        'x-not-a-path-but-used-in-ref': { get: { responses: { default: ok } } },
        '/thingyref': { $ref: '#/paths/x-not-a-path-but-used-in-ref' },
      },
    } as unknown as OpenAPI
    expect(normalizeOpenAPI(doc)).toStrictEqual({
      ...doc,
      paths: { '/thingyref': { get: { responses: { default: ok } } } },
    })
  })

  it.concurrent('leaves a plain document equal to itself', () => {
    const plain = {
      openapi: '3.0.0',
      info: { title: 'plain', version: '1.0.0' },
      paths: { '/a': { get: { responses: { '200': { description: 'OK' } } } } },
      components: { schemas: { A: { type: 'string' } } },
    } as OpenAPI
    expect(normalizeOpenAPI(plain)).toBe(plain)
  })
})

function added(name: string) {
  return { name, in: 'path', required: true, schema: { type: 'string' } }
}

// #508: a path template parameter the document does not declare is still a path parameter
describe('withTemplateParameters', () => {
  const ok = { description: 'OK' }
  const userId = { name: 'user_id', in: 'path', required: true, schema: { type: 'integer' } }
  const doc = {
    openapi: '3.1.0',
    info: { title: 'undeclared', version: '1.0.0' },
    paths: {
      '/users/{id}': { get: { responses: { '200': ok } } },
      '/users/{user_id}/messages/{message_id}': {
        get: { parameters: [userId], responses: { '200': ok } },
      },
      '/teams/{team_id}/members/{member_id}': {
        parameters: [{ $ref: '#/components/parameters/TeamId' }],
        get: { responses: { '200': ok } },
        delete: {
          parameters: [
            { name: 'member_id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: { '204': ok },
        },
      },
      '/search/{q}': {
        get: {
          parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }],
          responses: { '200': ok },
        },
      },
      '/shared/{id}': { $ref: '#/components/pathItems/Shared' },
      '/health': { get: { responses: { '200': ok } } },
    },
    components: {
      parameters: {
        TeamId: { name: 'team_id', in: 'path', required: true, schema: { type: 'string' } },
      },
      pathItems: {
        Shared: {
          parameters: [{ name: 'trace', in: 'header', schema: { type: 'string' } }],
          get: { responses: { '200': ok } },
        },
      },
    },
  } as unknown as OpenAPI

  it.concurrent('names the operations and the parameters they leave out', () => {
    expect(undeclaredTemplateParameters(doc)).toStrictEqual([
      { path: '/users/{id}', method: 'get', names: ['id'] },
      { path: '/users/{user_id}/messages/{message_id}', method: 'get', names: ['message_id'] },
      { path: '/teams/{team_id}/members/{member_id}', method: 'get', names: ['member_id'] },
      { path: '/search/{q}', method: 'get', names: ['q'] },
      { path: '/shared/{id}', method: 'get', names: ['id'] },
    ])
  })

  it.concurrent('declares them as required string path parameters', () => {
    expect(withTemplateParameters(doc)).toStrictEqual({
      ...doc,
      paths: {
        '/users/{id}': { get: { responses: { '200': ok }, parameters: [added('id')] } },
        '/users/{user_id}/messages/{message_id}': {
          get: { parameters: [userId, added('message_id')], responses: { '200': ok } },
        },
        '/teams/{team_id}/members/{member_id}': {
          parameters: [{ $ref: '#/components/parameters/TeamId' }],
          get: { responses: { '200': ok }, parameters: [added('member_id')] },
          delete: {
            parameters: [
              { name: 'member_id', in: 'path', required: true, schema: { type: 'string' } },
            ],
            responses: { '204': ok },
          },
        },
        '/search/{q}': {
          get: {
            parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }, added('q')],
            responses: { '200': ok },
          },
        },
        // The operations of a `$ref` item are the component's: declared on the item instead.
        '/shared/{id}': {
          $ref: '#/components/pathItems/Shared',
          parameters: [{ name: 'trace', in: 'header', schema: { type: 'string' } }, added('id')],
        },
        '/health': { get: { responses: { '200': ok } } },
      },
    })
  })

  it.concurrent('leaves nothing undeclared, and a second pass changes nothing', () => {
    const declared = withTemplateParameters(doc)
    expect(undeclaredTemplateParameters(declared)).toStrictEqual([])
    expect(withTemplateParameters(declared)).toBe(declared)
  })

  it.concurrent('returns a document that declares its parameters as it is', () => {
    const valid = {
      openapi: '3.1.0',
      info: { title: 'valid', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          get: {
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': ok },
          },
        },
      },
    } as unknown as OpenAPI
    expect(withTemplateParameters(valid)).toBe(valid)
    expect(normalizeOpenAPI(valid)).toBe(valid)
    expect(templateParameterWarnings(valid)).toStrictEqual([])
  })

  it.concurrent('reads a document without paths', () => {
    const webhooksOnly = { openapi: '3.1.0', info: { title: 'w', version: '1' } } as OpenAPI
    expect(undeclaredTemplateParameters(webhooksOnly)).toStrictEqual([])
    expect(withTemplateParameters(webhooksOnly)).toBe(webhooksOnly)
  })

  it.concurrent('warns of each operation', () => {
    const two = {
      openapi: '3.1.0',
      info: { title: 'two', version: '1.0.0' },
      paths: {
        '/users/{id}': { get: { responses: { '200': ok } } },
        '/a/{b}/c/{d}': { put: { responses: { '200': ok } } },
      },
    } as unknown as OpenAPI
    expect(templateParameterWarnings(two)).toStrictEqual([
      '⚠️ GET /users/{id}: {id} is not declared in parameters; read as a required string path parameter.',
      '⚠️ PUT /a/{b}/c/{d}: {b}, {d} are not declared in parameters; read as required string path parameters.',
    ])
  })
})
