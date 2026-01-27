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
  })
})
