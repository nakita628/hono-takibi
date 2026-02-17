import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockLiteralExpr() {
  return {
    type: 'literal' as const,
    value: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
      faker.datatype.boolean(),
    ]),
  }
}

function mockBinaryExpr(): any {
  return {
    type: 'binary' as const,
    operator: faker.helpers.arrayElement(['+', '-', '*', '/'] as const),
    left: mockExpression(),
    right: mockExpression(),
  }
}

function mockUnaryExpr(): any {
  return {
    type: 'unary' as const,
    operator: faker.helpers.arrayElement(['-', '!'] as const),
    operand: mockExpression(),
  }
}

function mockExpression(): any {
  return faker.helpers.arrayElement([mockLiteralExpr(), mockUnaryExpr(), mockBinaryExpr()])
}

function mockCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockTriangle() {
  return {
    kind: 'triangle' as const,
    base: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockPolygon() {
  return {
    kind: 'polygon' as const,
    sides: faker.number.int({ min: 3, max: 1000 }),
    sideLength: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockEllipse() {
  return {
    kind: 'ellipse' as const,
    semiMajor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    semiMinor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockShape() {
  return faker.helpers.arrayElement([
    mockCircle(),
    mockRectangle(),
    mockTriangle(),
    mockPolygon(),
    mockEllipse(),
  ])
}

function mockDocumentBase() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockArticleContent() {
  return {
    docType: 'article' as const,
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    wordCount: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
  }
}

function mockArticle() {
  return { ...mockDocumentBase(), ...mockArticleContent() }
}

function mockSpreadsheetContent() {
  return {
    docType: 'spreadsheet' as const,
    rows: faker.number.int({ min: 1, max: 1000 }),
    columns: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockSpreadsheet() {
  return { ...mockDocumentBase(), ...mockSpreadsheetContent() }
}

function mockDocument() {
  return faker.helpers.arrayElement([mockArticle(), mockSpreadsheet()])
}

function mockBaseConfig() {
  return {
    version: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockNetworkConfig() {
  return {
    host: faker.string.alpha({ length: { min: 5, max: 20 } }),
    port: faker.number.int({ min: 1, max: 65535 }),
  }
}

function mockSecurityConfig() {
  return {
    tlsEnabled: faker.datatype.boolean(),
    certPath: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockFullConfig() {
  return { ...mockBaseConfig(), ...mockNetworkConfig(), ...mockSecurityConfig() }
}

describe('Complex Schema Patterns API', () => {
  describe('default', () => {
    describe('POST /expressions', () => {
      it('should return 200', async () => {
        const body = mockExpression()
        const res = await app.request(`/expressions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /shapes', () => {
      it('should return 200', async () => {
        const body = mockShape()
        const res = await app.request(`/shapes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /documents', () => {
      it('should return 200', async () => {
        const body = mockDocument()
        const res = await app.request(`/documents`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /configs', () => {
      it('should return 200', async () => {
        const body = mockFullConfig()
        const res = await app.request(`/configs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /nullable-union', () => {
      it('should return 200', async () => {
        const res = await app.request(`/nullable-union`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /nested-circular', () => {
      it('should return 200', async () => {
        const res = await app.request(`/nested-circular`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
  })
})
