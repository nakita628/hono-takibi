import { describe, expect, it } from 'vitest'
import { formatRelativeTime, formatJoinDate } from './format'

describe('formatRelativeTime', () => {
  it('should return seconds for less than 60 seconds ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 30 * 1000)
    const result = formatRelativeTime(date.toISOString())
    expect(result).toBe('30s')
  })

  it('should return minutes for less than 60 minutes ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 5 * 60 * 1000)
    const result = formatRelativeTime(date.toISOString())
    expect(result).toBe('5m')
  })

  it('should return hours for less than 24 hours ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 3 * 60 * 60 * 1000)
    const result = formatRelativeTime(date.toISOString())
    expect(result).toBe('3h')
  })

  it('should return days for 24 hours or more ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    const result = formatRelativeTime(date.toISOString())
    expect(result).toBe('2d')
  })

  it('should return 0s for the current time', () => {
    const now = new Date()
    const result = formatRelativeTime(now.toISOString())
    expect(result).toBe('0s')
  })

  it('should round down minutes', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 90 * 1000)
    const result = formatRelativeTime(date.toISOString())
    expect(result).toBe('1m')
  })

  it('should round down hours', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 5400 * 1000)
    const result = formatRelativeTime(date.toISOString())
    expect(result).toBe('1h')
  })
})

describe('formatJoinDate', () => {
  it('should format date with month and year', () => {
    const result = formatJoinDate('2024-06-15T00:00:00.000Z')
    expect(result).toBe('June 2024')
  })

  it('should format January correctly', () => {
    const result = formatJoinDate('2025-01-01T00:00:00.000Z')
    expect(result).toBe('January 2025')
  })

  it('should format December correctly', () => {
    const result = formatJoinDate('2023-12-31T23:59:59.999Z')
    expect(result).toBe('December 2023')
  })
})
