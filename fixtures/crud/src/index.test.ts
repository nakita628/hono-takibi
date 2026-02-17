import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import app, { api } from './index'

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
  it('GET /api/ returns health check', async () => {
    const res = await api.request('/api')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toBe('Crude CRUD API is running')
  })

  it('POST /api/tasks creates a task', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Buy milk' }),
    })
    expect(res.status).toBe(201)
    const task = await res.json()
    expect(task.title).toBe('Buy milk')
    expect(task.status).toBe('pending')
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeDefined()
  })

  it('GET /api/tasks lists tasks', async () => {
    const res = await api.request('/api/tasks')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks).toBeInstanceOf(Array)
    expect(body.total).toBeGreaterThanOrEqual(1)
  })

  it('GET /api/tasks?status=pending filters by status', async () => {
    const res = await api.request('/api/tasks?status=pending')
    expect(res.status).toBe(200)
    const body = await res.json()
    for (const task of body.tasks) {
      expect(task.status).toBe('pending')
    }
  })

  it('GET /api/tasks/{taskId} returns a task', async () => {
    // Create first
    const createRes = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Read a book', tags: ['reading'] }),
    })
    const created = await createRes.json()

    const res = await api.request(`/api/tasks/${created.id}`)
    expect(res.status).toBe(200)
    const task = await res.json()
    expect(task.title).toBe('Read a book')
    expect(task.tags).toEqual(['reading'])
  })

  it('GET /api/tasks/{taskId} returns 404 for missing', async () => {
    const res = await api.request('/api/tasks/999999')
    expect(res.status).toBe(404)
  })

  it('PUT /api/tasks/{taskId} updates a task', async () => {
    // Create first
    const createRes = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Write code' }),
    })
    const created = await createRes.json()

    const res = await api.request(`/api/tasks/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'done' }),
    })
    expect(res.status).toBe(200)
    const task = await res.json()
    expect(task.status).toBe('done')
    expect(task.title).toBe('Write code')
    expect(task.updatedAt).toBeDefined()
  })

  it('PUT /api/tasks/{taskId} returns 404 for missing', async () => {
    const res = await api.request('/api/tasks/999999', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'nope' }),
    })
    expect(res.status).toBe(404)
  })

  it('DELETE /api/tasks/{taskId} deletes a task', async () => {
    // Create first
    const createRes = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Temporary' }),
    })
    const created = await createRes.json()

    const res = await api.request(`/api/tasks/${created.id}`, { method: 'DELETE' })
    expect(res.status).toBe(204)

    // Verify gone
    const getRes = await api.request(`/api/tasks/${created.id}`)
    expect(getRes.status).toBe(404)
  })

  it('DELETE /api/tasks/{taskId} returns 404 for missing', async () => {
    const res = await api.request('/api/tasks/999999', { method: 'DELETE' })
    expect(res.status).toBe(404)
  })

  it('POST /api/tasks validates required fields', async () => {
    const res = await api.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
  })

  describe('GET /api/', () => {
    it('should return 200 - Health check', async () => {
      const res = await app.request('/api/', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('GET /api/tasks', () => {
    it('should return 200 - List tasks', async () => {
      const status = faker.helpers.arrayElement(['pending', 'in_progress', 'done'] as const)
      const limit = faker.number.int({ min: 1, max: 100 })
      const offset = faker.number.int({ min: 0, max: 1000 })
      const res = await app.request(
        `/api/tasks?status=${encodeURIComponent(String(status))}&limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}`,
        { method: 'GET' },
      )
      expect(res.status).toBe(200)
    })
  })
  describe('POST /api/tasks', () => {
    it('should return 201 - Create task', async () => {
      const body = mockCreateTask()
      const res = await app.request('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(201)
    })
  })
  describe('GET /api/tasks/{taskId}', () => {
    it('should return 200 - Get task by ID', async () => {
      const res = await app.request('/api/tasks/{taskId}', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('PUT /api/tasks/{taskId}', () => {
    it('should return 200 - Update task', async () => {
      const body = mockUpdateTask()
      const res = await app.request('/api/tasks/{taskId}', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
    })
  })
  describe('DELETE /api/tasks/{taskId}', () => {
    it('should return 204 - Delete task', async () => {
      const res = await app.request('/api/tasks/{taskId}', { method: 'DELETE' })
      expect(res.status).toBe(204)
    })
  })
})
