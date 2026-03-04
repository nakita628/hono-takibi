import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { api } from './index'

type Task = {
  id: string
  title: string
  status: 'pending' | 'in_progress' | 'done'
  createdAt: string
  description?: string
  tags?: string[]
  updatedAt?: string
}

const client = testClient(api)

async function createTask(title: string, opts?: { status?: Task['status']; tags?: string[] }) {
  const res = await client.api.tasks.$post({
    json: { title, ...opts },
  })
  expect(res.status).toBe(201)
  return (await res.json()) as Task
}

describe('testClient CRUD', () => {
  it('GET /api/ returns health check', async () => {
    const res = await client.api.$get()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toBe('Crude CRUD API is running')
  })

  it('POST /api/tasks creates a task', async () => {
    const task = await createTask('testClient task')
    expect(task.title).toBe('testClient task')
    expect(task.status).toBe('pending')
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeDefined()
  })

  it('GET /api/tasks lists tasks', async () => {
    const res = await client.api.tasks.$get({ query: {} })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks).toBeInstanceOf(Array)
    expect(body.total).toBeGreaterThanOrEqual(1)
  })

  it('GET /api/tasks filters by status', async () => {
    await createTask('pending task', { status: 'pending' })
    const res = await client.api.tasks.$get({
      query: { status: 'pending' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    for (const task of body.tasks) {
      expect(task.status).toBe('pending')
    }
  })

  it('GET /api/tasks/:taskId returns a task', async () => {
    const created = await createTask('get by id', { tags: ['test'] })

    const res = await client.api.tasks[':taskId'].$get({
      param: { taskId: created.id },
    })
    expect(res.status).toBe(200)
    const task = (await res.json()) as Task
    expect(task.title).toBe('get by id')
    expect(task.tags).toStrictEqual(['test'])
  })

  it('GET /api/tasks/:taskId returns 404 for missing', async () => {
    const res = await client.api.tasks[':taskId'].$get({
      param: { taskId: '999999' },
    })
    expect(res.status).toBe(404)
  })

  it('PUT /api/tasks/:taskId updates a task', async () => {
    const created = await createTask('to update')

    const res = await client.api.tasks[':taskId'].$put({
      param: { taskId: created.id },
      json: { status: 'done' },
    })
    expect(res.status).toBe(200)
    const task = (await res.json()) as Task
    expect(task.status).toBe('done')
    expect(task.title).toBe('to update')
    expect(task.updatedAt).toBeDefined()
  })

  it('PUT /api/tasks/:taskId returns 404 for missing', async () => {
    const res = await client.api.tasks[':taskId'].$put({
      param: { taskId: '999999' },
      json: { title: 'nope' },
    })
    expect(res.status).toBe(404)
  })

  it('DELETE /api/tasks/:taskId deletes a task', async () => {
    const created = await createTask('to delete')

    const res = await client.api.tasks[':taskId'].$delete({
      param: { taskId: created.id },
    })
    expect(res.status).toBe(204)

    const getRes = await client.api.tasks[':taskId'].$get({
      param: { taskId: created.id },
    })
    expect(getRes.status).toBe(404)
  })

  it('DELETE /api/tasks/:taskId returns 404 for missing', async () => {
    const res = await client.api.tasks[':taskId'].$delete({
      param: { taskId: '999999' },
    })
    expect(res.status).toBe(404)
  })
})

describe('testClient int query params (limit, offset)', () => {
  it('GET /api/tasks with limit restricts result count', async () => {
    await createTask('limit A')
    await createTask('limit B')
    await createTask('limit C')

    const res = await client.api.tasks.$get({
      query: { limit: '2' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks.length).toBeLessThanOrEqual(2)
  })

  it('GET /api/tasks with offset skips tasks', async () => {
    const allRes = await client.api.tasks.$get({ query: {} })
    const allBody = await allRes.json()

    const res = await client.api.tasks.$get({
      query: { offset: '1' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.total).toBe(allBody.total)
    expect(body.tasks.length).toBe(allBody.tasks.length - 1)
  })

  it('GET /api/tasks with limit and offset combined', async () => {
    const res = await client.api.tasks.$get({
      query: { limit: '1', offset: '0' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks.length).toBe(1)
  })
})

describe('testClient int64 cursor', () => {
  it('GET /api/tasks with cursor=0 returns all tasks', async () => {
    await createTask('cursor task 1')
    await createTask('cursor task 2')

    const res = await client.api.tasks.$get({
      query: { cursor: '0' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks.length).toBeGreaterThanOrEqual(2)
  })

  it('GET /api/tasks with cursor filters tasks with id > cursor', async () => {
    const task1 = await createTask('cursor A')
    const task2 = await createTask('cursor B')

    const res = await client.api.tasks.$get({
      query: { cursor: task1.id },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    const ids = body.tasks.map((t) => t.id)
    expect(ids).not.toContain(task1.id)
    expect(ids).toContain(task2.id)
  })

  it('GET /api/tasks with large int64 cursor (> MAX_SAFE_INTEGER)', async () => {
    const res = await client.api.tasks.$get({
      query: { cursor: '9007199254740992' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.tasks).toStrictEqual([])
    expect(body.total).toBe(0)
  })

  it('GET /api/tasks with cursor and status filter', async () => {
    const task1 = await createTask('done cursor', { status: 'done' })
    await createTask('pending cursor', { status: 'pending' })

    const res = await client.api.tasks.$get({
      query: { cursor: task1.id, status: 'pending' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    for (const task of body.tasks) {
      expect(task.status).toBe('pending')
      expect(BigInt(task.id)).toBeGreaterThan(BigInt(task1.id))
    }
  })
})
