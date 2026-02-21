import { describe, expect, it } from 'vitest'
import {
  ConflictError,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from './error'

describe('Domain Errors', () => {
  describe('DatabaseError', () => {
    it('should create with message', () => {
      const error = new DatabaseError({ message: 'Connection failed' })
      expect(error.message).toBe('Connection failed')
      expect(error._tag).toBe('DatabaseError')
    })
  })

  describe('NotFoundError', () => {
    it('should create with message', () => {
      const error = new NotFoundError({ message: 'User not found' })
      expect(error.message).toBe('User not found')
      expect(error._tag).toBe('NotFoundError')
    })
  })

  describe('ValidationError', () => {
    it('should create with message', () => {
      const error = new ValidationError({ message: 'Invalid data' })
      expect(error.message).toBe('Invalid data')
      expect(error._tag).toBe('ValidationError')
    })
  })

  describe('ConflictError', () => {
    it('should create with message', () => {
      const error = new ConflictError({ message: 'Email already exists' })
      expect(error.message).toBe('Email already exists')
      expect(error._tag).toBe('ConflictError')
    })
  })

  describe('UnauthorizedError', () => {
    it('should create with message', () => {
      const error = new UnauthorizedError({ message: 'Not signed in' })
      expect(error.message).toBe('Not signed in')
      expect(error._tag).toBe('UnauthorizedError')
    })
  })

  describe('Error identity', () => {
    it('should be distinguishable via instanceof', () => {
      const dbError = new DatabaseError({ message: 'db' })
      const notFound = new NotFoundError({ message: 'not found' })

      expect(dbError instanceof DatabaseError).toBe(true)
      expect(dbError instanceof NotFoundError).toBe(false)
      expect(notFound instanceof NotFoundError).toBe(true)
      expect(notFound instanceof DatabaseError).toBe(false)
    })
  })
})
