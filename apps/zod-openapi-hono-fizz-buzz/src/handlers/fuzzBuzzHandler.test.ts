import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { api } from '..'

// Test run
// pnpm vitest run ./src/handlers/fuzzBuzzHandler.test.ts

// test client
const test = testClient(api)

describe('FizzBuzz API', () => {
  it.concurrent.each([
    [1, { result: '1' }],
    [2, { result: '2' }],
    [3, { result: 'Fizz' }],
    [4, { result: '4' }],
    [5, { result: 'Buzz' }],
    [6, { result: 'Fizz' }],
    [7, { result: '7' }],
    [8, { result: '8' }],
    [9, { result: 'Fizz' }],
    [10, { result: 'Buzz' }],
    [11, { result: '11' }],
    [12, { result: 'Fizz' }],
    [13, { result: '13' }],
    [14, { result: '14' }],
    [15, { result: 'FizzBuzz' }],
  ])('path fizzBuzz get ({ query: { number: %d } }) -> %s', async (number, expected) => {
    const res = await test.fizzBuzz.$get({ query: { number: number } })
    expect(res.status).toBe(200)
    const input = await res.json()
    expect(input).toStrictEqual(expected)
  })
})

describe('fizzBuzz API Fail Test for Test Client', () => {
  it('path fizzBuzz get ({ query: { number: 0 } }) -> ZodError', async () => {
    const res = await test.fizzBuzz.$get({ query: { number: '0' } })
    expect(res.status).toBe(400)
  })
})
