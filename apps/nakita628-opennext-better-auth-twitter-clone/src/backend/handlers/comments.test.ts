import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { ContractViolationError, DatabaseError } from '@/backend/domain'
import * as CommentsTransaction from '@/backend/transactions/comments'

function mockSession() {
  return {
    user: { id: faker.string.uuid(), email: 'test@example.com', name: 'Test User' },
    session: { id: faker.string.uuid() },
  }
}

function mockCommentResponse() {
  return {
    id: faker.string.uuid(),
    body: 'Nice post!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: faker.string.uuid(),
    postId: faker.string.uuid(),
  }
}

function mockCreateCommentRequest() {
  return {
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

describe('POST /api/comments', () => {
  const postId = faker.string.uuid()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 200 on success', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    const mockComment = mockCommentResponse()
    vi.mocked(CommentsTransaction.create).mockReturnValue(Effect.succeed(mockComment))

    const res = await app.request(`/api/comments?postId=${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Nice post!' }),
    })

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toStrictEqual(mockComment)
  })

  it('should return 401 when not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const res = await app.request(`/api/comments?postId=${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Nice post!' }),
    })

    expect(res.status).toBe(401)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Unauthorized' })
  })

  it('should return 422 on missing postId query param', async () => {
    mockGetSession.mockResolvedValue(mockSession())

    const res = await app.request('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Nice post!' }),
    })

    expect(res.status).toBe(422)
  })

  it('should return 422 on invalid postId format', async () => {
    mockGetSession.mockResolvedValue(mockSession())

    const res = await app.request('/api/comments?postId=not-a-uuid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Nice post!' }),
    })

    expect(res.status).toBe(422)
  })

  it('should return 500 on ContractViolationError', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    vi.mocked(CommentsTransaction.create).mockReturnValue(
      Effect.fail(new ContractViolationError({ message: 'Invalid comment data' })),
    )

    const res = await app.request(`/api/comments?postId=${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Nice post!' }),
    })

    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Invalid comment data' })
  })

  it('should return 503 on DatabaseError', async () => {
    mockGetSession.mockResolvedValue(mockSession())
    vi.mocked(CommentsTransaction.create).mockReturnValue(
      Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
    )

    const res = await app.request(`/api/comments?postId=${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Nice post!' }),
    })

    expect(res.status).toBe(503)
    const json = await res.json()
    expect(json).toStrictEqual({ message: 'Database unavailable' })
  })

  it('should pass correct arguments to transaction', async () => {
    const session = mockSession()
    mockGetSession.mockResolvedValue(session)
    const mockComment = mockCommentResponse()
    vi.mocked(CommentsTransaction.create).mockReturnValue(Effect.succeed(mockComment))

    await app.request(`/api/comments?postId=${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Test comment' }),
    })

    expect(CommentsTransaction.create).toHaveBeenCalledWith(session.user.id, {
      body: 'Test comment',
      postId,
    })
  })
})
