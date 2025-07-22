import { describe, expect, it } from 'vitest'
import { testClient } from 'hono/testing'
import { api } from '..'

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

// test client
describe('FizzBuzz API', () => {
  it.concurrent.each(fizzBuzzApiTestCases)(
    'path fizzBuzz get ({ query: { number: $number } }) -> $expected',
    async ({ number, expected }) => {
      const res = await test.fizzBuzz.$get({ query: { number: number } })
      expect(res.status).toBe(200)
      const input = await res.json()
      expect(input).toEqual(expected)
    },
  )
})

describe('fizzBuzz API Fail Test for Test Client', () => {
  it('path fizzBuzz get ({ query: { number: 0 } }) -> ZodError', async () => {
    const res = await test.fizzBuzz.$get({ query: { number: '0' } })
    expect(res.status).toBe(400)
  })
})
