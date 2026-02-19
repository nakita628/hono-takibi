import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('FizzBuzz', () => {
  describe('GET /fizzBuzz', () => {
    it('should return 200 - Get FizzBuzz result', async () => {
      const number = faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })
      const details = faker.string.alpha({ length: { min: 5, max: 20 } })
      const res = await app.request(
        `/fizzBuzz?number=${encodeURIComponent(String(number))}&details=${encodeURIComponent(String(details))}`,
        { method: 'GET' },
      )
      expect(res.status).toBe(200)
    })
  })
})

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
    const res = await app.request(`/fizzBuzz?number=${number}`, { method: 'GET' })
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toStrictEqual(expected)
  })
})

describe('fizzBuzz API Fail Test', () => {
  it('path fizzBuzz get ({ query: { number: 0 } }) -> 400', async () => {
    const res = await app.request('/fizzBuzz?number=0', { method: 'GET' })
    expect(res.status).toBe(400)
  })
})
