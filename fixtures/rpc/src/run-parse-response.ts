import { serve } from '@hono/node-server'
import { hc } from 'hono/client'
import { DetailedError, parseResponse } from 'hono/client'
import { app, type AppType } from './server'

/**
 * Run actual parseResponse tests and log the behavior.
 */
async function main() {
  // Start server
  const server = serve({ fetch: app.fetch, port: 3456 })
  console.log('Server started on port 3456')

  // Create client
  const client = hc<AppType>('http://localhost:3456')

  console.log('\n========================================')
  console.log('parseResponse Behavior Investigation')
  console.log('========================================\n')

  // 1. JSON response
  console.log('--- 1. JSON Response (GET /json) ---')
  try {
    const result = await parseResponse(client.json.$get())
    console.log('Result:', result)
    console.log('Type:', typeof result)
  } catch (e) {
    console.error('Error:', e)
  }

  // 2. JSON Array response
  console.log('\n--- 2. JSON Array Response (GET /json-array) ---')
  try {
    const result = await parseResponse(client['json-array'].$get())
    console.log('Result:', result)
    console.log('Is Array:', Array.isArray(result))
  } catch (e) {
    console.error('Error:', e)
  }

  // 3. Text response
  console.log('\n--- 3. Text Response (GET /text) ---')
  try {
    const result = await parseResponse(client.text.$get())
    console.log('Result:', result)
    console.log('Type:', typeof result)
  } catch (e) {
    console.error('Error:', e)
  }

  // 4. Empty response (204 No Content)
  console.log('\n--- 4. Empty Response (GET /empty - 204 No Content) ---')
  try {
    const result = await parseResponse(client.empty.$get())
    console.log('Result:', result)
    console.log('Is undefined:', result === undefined)
  } catch (e) {
    console.error('Error:', e)
  }

  // 5. Error response (400)
  console.log('\n--- 5. Error Response (GET /error-400 - 400 Bad Request) ---')
  try {
    const result = await parseResponse(client['error-400'].$get())
    console.log('Result:', result)
  } catch (e) {
    console.log('Caught error!')
    console.log('Is DetailedError:', e instanceof DetailedError)
    if (e instanceof DetailedError) {
      console.log('Error message:', e.message)
      console.log('Error statusCode:', e.statusCode)
      console.log('Error detail:', JSON.stringify(e.detail, null, 2))
      console.log('Error code:', e.code)
      console.log('Error log:', e.log)
    } else {
      console.log('Raw error:', e)
    }
  }

  // 6. Error response (404)
  console.log('\n--- 6. Error Response (GET /error-404 - 404 Not Found) ---')
  try {
    const result = await parseResponse(client['error-404'].$get())
    console.log('Result:', result)
  } catch (e) {
    console.log('Caught error!')
    if (e instanceof DetailedError) {
      console.log('Error message:', e.message)
      console.log('Error statusCode:', e.statusCode)
      console.log('Error detail:', JSON.stringify(e.detail, null, 2))
    }
  }

  // 7. Error response (500)
  console.log('\n--- 7. Error Response (GET /error-500 - 500 Internal Server Error) ---')
  try {
    const result = await parseResponse(client['error-500'].$get())
    console.log('Result:', result)
  } catch (e) {
    console.log('Caught error!')
    if (e instanceof DetailedError) {
      console.log('Error message:', e.message)
      console.log('Error statusCode:', e.statusCode)
      console.log('Error detail:', JSON.stringify(e.detail, null, 2))
    }
  }

  // 8. POST response (201 Created)
  console.log('\n--- 8. POST Response (POST /create - 201 Created) ---')
  try {
    const result = await parseResponse(
      client.create.$post({
        json: { name: 'Test Item' },
      }),
    )
    console.log('Result:', result)
    console.log('Type:', typeof result)
  } catch (e) {
    console.error('Error:', e)
  }

  // 9. Nested JSON response
  console.log('\n--- 9. Nested JSON Response (GET /nested) ---')
  try {
    const result = await parseResponse(client.nested.$get())
    console.log('Result:', JSON.stringify(result, null, 2))
    console.log('Type:', typeof result)
  } catch (e) {
    console.error('Error:', e)
  }

  // 10. Response with custom headers
  console.log('\n--- 10. Response with Custom Headers (GET /headers) ---')
  try {
    const result = await parseResponse(client.headers.$get())
    console.log('Result:', result)
  } catch (e) {
    console.error('Error:', e)
  }

  // 11. Using .catch() pattern from docs
  console.log('\n--- 11. Using .catch() Pattern (Error case) ---')
  const resultWithCatch = await parseResponse(client['error-400'].$get()).catch(
    (e: DetailedError) => {
      console.log('Caught in .catch():')
      console.log('  message:', e.message)
      console.log('  statusCode:', e.statusCode)
      console.log('  detail:', JSON.stringify(e.detail, null, 2))
      return null // Return null on error
    },
  )
  console.log('Result from .catch() pattern:', resultWithCatch)

  console.log('\n========================================')
  console.log('Investigation Complete')
  console.log('========================================\n')

  // Close server
  server.close()
}

main().catch(console.error)
