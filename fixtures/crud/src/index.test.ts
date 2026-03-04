import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './index'

function mockCreateTask() {
  return {
    title: faker.lorem.sentence(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    status: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['pending', 'in_progress', 'done'] as const),
      undefined,
    ]),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
  }
}

function mockUpdateTask() {
  return {
    title: faker.helpers.arrayElement([faker.lorem.sentence(), undefined]),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    status: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['pending', 'in_progress', 'done'] as const),
      undefined,
    ]),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
  }
}

describe('Crude CRUD API', () => {
  describe('default', () => {
    describe('GET /api', () => {
      it('should return 200 - Health check', async () => {
        const res = await app.request(`/api`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
  describe('tasks', () => {
    describe('GET /api/tasks', () => {
      it('should return 200 - List tasks', async () => {
        const status = faker.helpers.arrayElement(['pending', 'in_progress', 'done'] as const)
        const limit = faker.number.int({ min: 1, max: 100 })
        const offset = faker.number.int({ min: 0, max: 1000 })
        const cursor = faker.number.int({
          min: Number.MIN_SAFE_INTEGER,
          max: Number.MAX_SAFE_INTEGER,
        })
        const res = await app.request(
          `/api/tasks?status=${encodeURIComponent(String(status))}&limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}&cursor=${encodeURIComponent(String(cursor))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /api/tasks', () => {
      it('should return 201 - Create task', async () => {
        const body = mockCreateTask()
        const res = await app.request(`/api/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /api/tasks/{taskId}', () => {
      it('should return 200 - Get task by ID', async () => {
        const taskId = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/api/tasks/${taskId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
      it('should return 404 for non-existent resource', async () => {
        const res = await app.request(`/api/tasks/__non_existent__`, { method: 'GET' })
        expect(res.status).toBe(404)
      })
    })
    describe('PUT /api/tasks/{taskId}', () => {
      it('should return 200 - Update task', async () => {
        const taskId = faker.string.alpha({ length: { min: 5, max: 20 } })
        const body = mockUpdateTask()
        const res = await app.request(`/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 404 for non-existent resource', async () => {
        const body = mockUpdateTask()
        const res = await app.request(`/api/tasks/__non_existent__`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(404)
      })
    })
    describe('DELETE /api/tasks/{taskId}', () => {
      it('should return 204 - Delete task', async () => {
        const taskId = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/api/tasks/${taskId}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
      it('should return 404 for non-existent resource', async () => {
        const res = await app.request(`/api/tasks/__non_existent__`, { method: 'DELETE' })
        expect(res.status).toBe(404)
      })
    })
  })
})
