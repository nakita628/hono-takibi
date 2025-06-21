import { describe, expect, it, beforeAll } from 'vitest'
import { testClient } from 'hono/testing'
import { serve } from '@hono/node-server'
import { api } from '..'
import { apiClient } from '..'

// test client
const test = testClient(api)

// test case
const fizzBuzzApiTestCases = [
  {
    number: 1,
    expected: { result: '1' },
  },
  {
    number: 2,
    expected: { result: '2' },
  },
  {
    number: 3,
    expected: { result: 'Fizz' },
  },
  {
    number: 4,
    expected: { result: '4' },
  },
  {
    number: 5,
    expected: { result: 'Buzz' },
  },
  {
    number: 6,
    expected: { result: 'Fizz' },
  },
  {
    number: 7,
    expected: { result: '7' },
  },
  {
    number: 8,
    expected: { result: '8' },
  },
  {
    number: 9,
    expected: { result: 'Fizz' },
  },
  {
    number: 10,
    expected: { result: 'Buzz' },
  },
  {
    number: 11,
    expected: { result: '11' },
  },
  {
    number: 12,
    expected: { result: 'Fizz' },
  },
  {
    number: 13,
    expected: { result: '13' },
  },
  {
    number: 14,
    expected: { result: '14' },
  },
  {
    number: 15,
    expected: { result: 'FizzBuzz' },
  },
]

// // test client
describe('FizzBuzz API', () => {
  it.concurrent.each(fizzBuzzApiTestCases)(
    'path fizzbuzz get ({ query: { number: $number } }) -> $expected',
    async ({ number, expected }) => {
      const res = await test.fizzbuzz.$get({ query: { number: number } })
      expect(res.status).toBe(200)
      const input = await res.json()
      expect(input).toEqual(expected)
    },
  )
})

describe('FizzBuzz API Fail Test for Test Client', () => {
  it('path fizzbuzz get ({ query: { number: 0 } }) -> ZodError', async () => {
    const res = await test.fizzbuzz.$get({ query: { number: '0' } })
    expect(res.status).toBe(400)
  })
})

// fetch
describe('FizzBuzz API Fetch Test', () => {
  beforeAll(async () => {
    serve({
      fetch: api.fetch,
      port: 3000,
    })
  })

  it.concurrent.each(fizzBuzzApiTestCases)(
    'path fizzbuzz get fizzbuzz?number=$number -> $expected',
    async ({ number, expected }) => {
      const res = await fetch(`http://localhost:3000/fizzbuzz?number=${number}`)
      expect(res.status).toBe(200)
      const input = await res.json()
      expect(input).toEqual(expected)
    },
  )
})

describe('FizzBuzz API Fail Test for Fetch', () => {
  it('path fizzbuzz get fizzbuzz?number=0 -> ZodError', async () => {
    const res = await fetch('http://localhost:3000/fizzbuzz?number=0')
    expect(res.status).toBe(400)
  })
})

describe('RPC Mode', async () => {
  it.concurrent('path fizzbuzz get fizzbuzz?number=15 -> FizzBuzz', async () => {
    const res = await apiClient.fizzbuzz.$get({ query: { number: 15 } })
    expect(res.status).toBe(200)
    const input = await res.json()
    expect(input).toEqual({ result: 'FizzBuzz' })
  })

  it.concurrent('path fizzbuzz get fizzbuzz?number=15 -> FizzBuzz details', async () => {
    const res_details = await apiClient.fizzbuzz.$get({
      query: { number: 15, details: 'true' },
    })
    expect(res_details.status).toBe(200)
    const input = await res_details.json()
    expect(input).toEqual({ result: 'FizzBuzz', number: 15 })
  })
})
