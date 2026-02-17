import { describe, expect, it } from 'vitest'
import { api } from './index'

describe('Crude CRUD API', () => {
  it('GET / returns health check', async () => {
    const res = await api.request('/')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toBe('Crude CRUD API is running')
  })

  it('POST /tasks creates a task', async () => {
    const res = await api.request('/tasks', {
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

  it('GET /tasks lists tasks', async () => {
    const res = await api.request('/tasks')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks).toBeInstanceOf(Array)
    expect(body.total).toBeGreaterThanOrEqual(1)
  })

  it('GET /tasks?status=pending filters by status', async () => {
    const res = await api.request('/tasks?status=pending')
    expect(res.status).toBe(200)
    const body = await res.json()
    for (const task of body.tasks) {
      expect(task.status).toBe('pending')
    }
  })

  it('GET /tasks/{taskId} returns a task', async () => {
    // Create first
    const createRes = await api.request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Read a book', tags: ['reading'] }),
    })
    const created = await createRes.json()

    const res = await api.request(`/tasks/${created.id}`)
    expect(res.status).toBe(200)
    const task = await res.json()
    expect(task.title).toBe('Read a book')
    expect(task.tags).toEqual(['reading'])
  })

  it('GET /tasks/{taskId} returns 404 for missing', async () => {
    const res = await api.request('/tasks/999999')
    expect(res.status).toBe(404)
  })

  it('PUT /tasks/{taskId} updates a task', async () => {
    // Create first
    const createRes = await api.request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Write code' }),
    })
    const created = await createRes.json()

    const res = await api.request(`/tasks/${created.id}`, {
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

  it('PUT /tasks/{taskId} returns 404 for missing', async () => {
    const res = await api.request('/tasks/999999', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'nope' }),
    })
    expect(res.status).toBe(404)
  })

  it('DELETE /tasks/{taskId} deletes a task', async () => {
    // Create first
    const createRes = await api.request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Temporary' }),
    })
    const created = await createRes.json()

    const res = await api.request(`/tasks/${created.id}`, { method: 'DELETE' })
    expect(res.status).toBe(204)

    // Verify gone
    const getRes = await api.request(`/tasks/${created.id}`)
    expect(getRes.status).toBe(404)
  })

  it('DELETE /tasks/{taskId} returns 404 for missing', async () => {
    const res = await api.request('/tasks/999999', { method: 'DELETE' })
    expect(res.status).toBe(404)
  })

  it('POST /tasks validates required fields', async () => {
    const res = await api.request('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(400)
  })
})
