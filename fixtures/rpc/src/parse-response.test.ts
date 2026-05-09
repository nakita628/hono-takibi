import { DetailedError, parseResponse } from 'hono/client'
import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { app } from './server'

/**
 * Tests for Hono RPC `parseResponse` behavior.
 *
 * @remarks
 * `parseResponse` is a type-safety helper that:
 * - Automatically parses response body based on Content-Type
 * - Throws `DetailedError` when response is not ok (status >= 400)
 * - Returns `undefined` for 204 No Content responses
 *
 * @see {@link https://hono.dev/docs/guides/rpc#parsing-a-response-with-type-safety-helper}
 */
describe('parseResponse', () => {
  const client = testClient(app)

  describe('successful responses', () => {
    it('should parse JSON object response', async () => {
      const result = await parseResponse(client.json.$get())

      expect(result).toStrictEqual({
        message: 'Hello, World!',
        timestamp: expect.any(Number),
      })
    })

    it('should parse JSON array response', async () => {
      const result = await parseResponse(client['json-array'].$get())

      expect(result).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
    })

    it('should parse text response', async () => {
      const result = await parseResponse(client.text.$get())

      expect(result).toBe('Plain text response')
    })

    it('should return undefined for 204 No Content', async () => {
      const result = await parseResponse(client.empty.$get())

      expect(result).toBeUndefined()
    })

    it('should parse nested object response', async () => {
      const result = await parseResponse(client.nested.$get())

      expect(result).toStrictEqual({
        user: {
          id: 1,
          name: 'John',
          profile: {
            email: 'john@example.com',
            settings: {
              theme: 'dark',
              notifications: true,
            },
          },
        },
      })
    })

    it('should parse response with custom headers', async () => {
      const result = await parseResponse(client.headers.$get())

      expect(result).toStrictEqual({ hasHeaders: true })
    })
  })

  describe('mutation responses', () => {
    it('should parse POST response with 201 status', async () => {
      const result = await parseResponse(
        client.create.$post({
          json: { name: 'Test Item' },
        }),
      )

      expect(result).toStrictEqual({
        id: 1,
        name: 'Test Item',
        created: true,
      })
    })

    it('should parse PUT response', async () => {
      // Note: json property type inference requires zod-openapi middleware
      // This test verifies parseResponse behavior with PUT requests
      const result = await parseResponse(
        client.update[':id'].$put({
          param: { id: '42' },
          // biome-ignore lint/suspicious/noExplicitAny: testing runtime behavior
          json: { name: 'Updated Item' } as any,
        }),
      )

      expect(result).toStrictEqual({
        id: 42,
        name: 'Updated Item',
        updated: true,
      })
    })

    it('should return undefined for DELETE with 204 status', async () => {
      const result = await parseResponse(
        client.delete[':id'].$delete({
          param: { id: '1' },
        }),
      )

      expect(result).toBeUndefined()
    })
  })

  describe('error responses', () => {
    it('should throw DetailedError for 400 Bad Request', async () => {
      await expect(parseResponse(client['error-400'].$get())).rejects.toThrow()

      try {
        await parseResponse(client['error-400'].$get())
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(400)
      }
    })

    it('should throw DetailedError for 404 Not Found', async () => {
      await expect(parseResponse(client['error-404'].$get())).rejects.toThrow()

      try {
        await parseResponse(client['error-404'].$get())
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(404)
      }
    })

    it('should throw DetailedError for 500 Internal Server Error', async () => {
      await expect(parseResponse(client['error-500'].$get())).rejects.toThrow()

      try {
        await parseResponse(client['error-500'].$get())
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(500)
      }
    })

    it('should provide response body in DetailedError detail', async () => {
      try {
        await parseResponse(client['error-400'].$get())
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.detail).toStrictEqual({
          data: {
            error: 'Bad Request',
            code: 'INVALID_INPUT',
          },
          statusText: '',
        })
      }
    })

    it('should throw DetailedError for 401 Unauthorized', async () => {
      try {
        await parseResponse(client['error-401'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(401)
        expect(error.detail).toStrictEqual({
          data: { error: 'Unauthorized' },
          statusText: '',
        })
      }
    })

    it('should throw DetailedError for 403 Forbidden', async () => {
      try {
        await parseResponse(client['error-403'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(403)
        expect(error.detail).toStrictEqual({
          data: { error: 'Forbidden' },
          statusText: '',
        })
      }
    })

    it('should throw DetailedError for 422 Unprocessable Entity with field details', async () => {
      try {
        await parseResponse(client['error-422'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(422)
        expect(error.detail).toStrictEqual({
          data: { error: 'Unprocessable Entity', fields: ['name'] },
          statusText: '',
        })
      }
    })

    it('should expose `name` as "DetailedError"', async () => {
      try {
        await parseResponse(client['error-400'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
        expect((e as Error).name).toBe('DetailedError')
      }
    })

    it('should set DetailedError.message to "<status> <statusText>"', async () => {
      try {
        await parseResponse(client['error-404'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.message).toMatch(/^404\b/)
      }
    })

    it('should leave DetailedError.code and .log undefined (not set by parseResponse)', async () => {
      try {
        await parseResponse(client['error-400'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.code).toBeUndefined()
        expect(error.log).toBeUndefined()
      }
    })

    it('should preserve text body in DetailedError.detail.data when Content-Type is text/plain', async () => {
      try {
        await parseResponse(
          // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
          (client as any)['error-text'].$get(),
        )
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(500)
        expect(error.detail).toStrictEqual({
          data: 'plain error body',
          statusText: '',
        })
      }
    })

    it('should leave detail.data undefined when error response has no body', async () => {
      try {
        await parseResponse(
          // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
          (client as any)['error-empty'].$get(),
        )
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(500)
        expect(error.detail?.data).toBeUndefined()
      }
    })

    it('should treat body as text when Content-Type header is missing', async () => {
      try {
        await parseResponse(
          // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
          (client as any)['error-no-content-type'].$get(),
        )
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(500)
        expect(error.detail).toStrictEqual({
          data: 'no content-type',
          statusText: '',
        })
      }
    })

    it('should parse vendor JSON Content-Type (application/vnd.api+json) as JSON in error detail', async () => {
      try {
        await parseResponse(
          // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
          (client as any)['error-vendor-json'].$get(),
        )
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(DetailedError)
        const error = e as DetailedError
        expect(error.statusCode).toBe(400)
        expect(error.detail).toStrictEqual({
          data: { error: 'vendor json error' },
          statusText: '',
        })
      }
    })

    it('DetailedError should be catchable as a plain Error', async () => {
      try {
        await parseResponse(client['error-400'].$get())
        expect.fail('expected to throw')
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
        expect(e).toBeInstanceOf(DetailedError)
      }
    })
  })

  /**
   * Capture the full shape of the value `parseResponse` rejects with,
   * not just `statusCode`. Each test asserts every enumerable property of
   * `DetailedError` (`name`, `message`, `statusCode`, `detail`, `code`, `log`)
   * in a single `toStrictEqual` so the reader can see exactly what is returned.
   */
  describe('error value shape', () => {
    const captureError = async (promise: Promise<unknown>) => {
      try {
        await promise
        return { thrown: false } as const
      } catch (e) {
        if (!(e instanceof DetailedError)) return { thrown: true, raw: e } as const
        return {
          thrown: true,
          name: e.name,
          message: e.message,
          statusCode: e.statusCode,
          detail: e.detail,
          code: e.code,
          log: e.log,
          isError: e instanceof Error,
          isDetailedError: e instanceof DetailedError,
        } as const
      }
    }

    it('400 with JSON body returns DetailedError with parsed JSON in detail.data', async () => {
      const captured = await captureError(parseResponse(client['error-400'].$get()))
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '400 ',
        statusCode: 400,
        detail: {
          data: { error: 'Bad Request', code: 'INVALID_INPUT' },
          statusText: '',
        },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('404 with JSON body returns DetailedError with parsed JSON in detail.data', async () => {
      const captured = await captureError(parseResponse(client['error-404'].$get()))
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '404 ',
        statusCode: 404,
        detail: {
          data: { error: 'Not Found', code: 'RESOURCE_NOT_FOUND' },
          statusText: '',
        },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('500 with JSON body returns DetailedError with parsed JSON in detail.data', async () => {
      const captured = await captureError(parseResponse(client['error-500'].$get()))
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '500 ',
        statusCode: 500,
        detail: {
          data: { error: 'Internal Server Error', code: 'SERVER_ERROR' },
          statusText: '',
        },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('401 returns DetailedError with { error: "Unauthorized" } in detail.data', async () => {
      const captured = await captureError(parseResponse(client['error-401'].$get()))
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '401 ',
        statusCode: 401,
        detail: { data: { error: 'Unauthorized' }, statusText: '' },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('403 returns DetailedError with { error: "Forbidden" } in detail.data', async () => {
      const captured = await captureError(parseResponse(client['error-403'].$get()))
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '403 ',
        statusCode: 403,
        detail: { data: { error: 'Forbidden' }, statusText: '' },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('422 returns DetailedError with field details in detail.data', async () => {
      const captured = await captureError(parseResponse(client['error-422'].$get()))
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '422 ',
        statusCode: 422,
        detail: {
          data: { error: 'Unprocessable Entity', fields: ['name'] },
          statusText: '',
        },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('text/plain error body returns DetailedError with raw text in detail.data', async () => {
      const captured = await captureError(
        // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
        parseResponse((client as any)['error-text'].$get()),
      )
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '500 ',
        statusCode: 500,
        detail: { data: 'plain error body', statusText: '' },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('empty body error returns DetailedError with detail.data === undefined', async () => {
      const captured = await captureError(
        // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
        parseResponse((client as any)['error-empty'].$get()),
      )
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '500 ',
        statusCode: 500,
        detail: { data: undefined, statusText: '' },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('missing Content-Type returns DetailedError with body parsed as text', async () => {
      const captured = await captureError(
        // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
        parseResponse((client as any)['error-no-content-type'].$get()),
      )
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '500 ',
        statusCode: 500,
        detail: { data: 'no content-type', statusText: '' },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })

    it('vendor JSON (application/vnd.api+json) returns DetailedError with parsed JSON', async () => {
      const captured = await captureError(
        // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
        parseResponse((client as any)['error-vendor-json'].$get()),
      )
      expect(captured).toStrictEqual({
        thrown: true,
        name: 'DetailedError',
        message: '400 ',
        statusCode: 400,
        detail: {
          data: { error: 'vendor json error' },
          statusText: '',
        },
        code: undefined,
        log: undefined,
        isError: true,
        isDetailedError: true,
      })
    })
  })
})
