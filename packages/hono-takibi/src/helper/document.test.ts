import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../openapi/index.js'
import { normalizeOpenAPI, withoutExtensions } from './document.js'

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
