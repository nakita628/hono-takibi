import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockCreatePost() {
  return {
    title: faker.lorem.sentence(),
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    tagIds: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.number.int({ min: 1, max: 1000 }),
      ),
      undefined,
    ]),
  }
}

function mockUpdatePost() {
  return {
    title: faker.helpers.arrayElement([faker.lorem.sentence(), undefined]),
    body: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    tagIds: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.number.int({ min: 1, max: 1000 }),
      ),
      undefined,
    ]),
  }
}

function mockCreateComment() {
  return {
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

describe('Readonly Split API', () => {
  describe('default', () => {
    describe('GET /posts', () => {
      it('GET /posts', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/posts?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /posts', () => {
      it('POST /posts', async () => {
        const body = mockCreatePost()
        const res = await app.request(`/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /posts/{id}', () => {
      it('GET /posts/{id}', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/posts/${id}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /posts/{id}', () => {
      it('PUT /posts/{id}', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const body = mockUpdatePost()
        const res = await app.request(`/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('DELETE /posts/{id}', () => {
      it('DELETE /posts/{id}', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/posts/${id}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('GET /posts/{id}/comments', () => {
      it('GET /posts/{id}/comments', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/posts/${id}/comments`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /posts/{id}/comments', () => {
      it('POST /posts/{id}/comments', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const body = mockCreateComment()
        const res = await app.request(`/posts/${id}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /tags', () => {
      it('GET /tags', async () => {
        const res = await app.request(`/tags`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
