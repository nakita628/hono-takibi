import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import { takibi } from './takibi.js'
import { OpenAPI } from '../../openapi/types.js';

// Test run
// pnpm vitest run ./src/cli/hono-takibi/takibi.test.ts

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi🔥',
    version: 'v1',
  },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Hono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hono🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'HonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'HonoX🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'ZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ZodOpenAPIHono🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
  },
}

describe('takibi', () => {
  beforeAll(() => {
    // Setup code if needed
  });

  afterAll(() => {
    // Cleanup code if needed
  });

  it('should generate Hono app with OpenAPI routes', async () => {
    const result = await takibi({
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: true },
      input: 'openapi.yaml',
      output: 'app.ts',
    }, true, true, 'api');

    expect(result).toEqual({
      message: 'Generated code and template files written',
    });
  });
});