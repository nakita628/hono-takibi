import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from './mock'

function mockCircularRefsTreeNode(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    value: faker.string.alpha({ length: { min: 5, max: 20 } }),
    children: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockCircularRefsTreeNode(),
      ),
      undefined,
    ]),
  }
}

function mockParametersMergeItemUpdate() {
  return { name: faker.helpers.arrayElement([faker.person.fullName(), undefined]) }
}

function mockSchemaEdgeCasesNullableFields() {
  return {
    name: faker.person.fullName(),
    nickname: faker.helpers.arrayElement([undefined, undefined]),
    age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined]),
    tags: faker.helpers.arrayElement([undefined, undefined]),
  }
}

function mockSchemaEdgeCasesCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockSchemaEdgeCasesRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockSchemaEdgeCasesShape() {
  return faker.helpers.arrayElement([mockSchemaEdgeCasesCircle(), mockSchemaEdgeCasesRectangle()])
}

function mockCallbacksLinksSubscriptionRequest() {
  return {
    callbackUrl: faker.internet.url(),
    events: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.helpers.arrayElement(['created', 'updated', 'deleted'] as const),
    ),
  }
}

function mockCrudRefsCreatePost() {
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

function mockCrudRefsUpdatePost() {
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

function mockCrudRefsCreateComment() {
  return { body: faker.string.alpha({ length: { min: 5, max: 20 } }) }
}

function mockComprehensiveAddress() {
  return {
    street: faker.string.alpha({ length: { min: 5, max: 20 } }),
    city: faker.location.city(),
    state: faker.helpers.arrayElement([faker.location.state(), undefined]),
    zip: faker.helpers.arrayElement([faker.location.zipCode(), undefined]),
    country: faker.location.country(),
  }
}

function mockComprehensiveCreateUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['admin', 'customer'] as const),
      undefined,
    ]),
    address: faker.helpers.arrayElement([mockComprehensiveAddress(), undefined]),
  }
}

function mockComprehensiveUpdateUser() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
    address: faker.helpers.arrayElement([mockComprehensiveAddress(), undefined]),
  }
}

function mockComprehensiveCreateProduct() {
  return {
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    categoryId: faker.number.int({ min: 1, max: 1000 }),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
  }
}

function mockComprehensiveUpdateProduct() {
  return {
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.helpers.arrayElement([
      faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
      undefined,
    ]),
    categoryId: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
  }
}

function mockComprehensiveCreateReview() {
  return {
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockComprehensiveCreateOrder() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: faker.number.int({ min: 1, max: 1000 }),
      quantity: faker.number.int({ min: 1, max: 100 }),
    })),
    shippingAddress: mockComprehensiveAddress(),
    callbackUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

function mockCompositionKeywordsCreditCard() {
  return {
    type: 'credit_card' as const,
    cardNumber: faker.string.alpha({ length: { min: 5, max: 20 } }),
    expiry: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockCompositionKeywordsBankTransfer() {
  return {
    type: 'bank_transfer' as const,
    bankCode: faker.string.alpha({ length: { min: 5, max: 20 } }),
    accountNumber: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockCompositionKeywordsPaymentMethod() {
  return faker.helpers.arrayElement([
    mockCompositionKeywordsCreditCard(),
    mockCompositionKeywordsBankTransfer(),
  ])
}

function mockCompositionKeywordsSearchFilter() {
  return faker.helpers.arrayElement([
    { keyword: faker.string.alpha({ length: { min: 5, max: 20 } }) },
    { category: faker.number.int({ min: 1, max: 1000 }) },
  ])
}

function mockCompositionKeywordsPerson() {
  return { name: faker.person.fullName(), email: faker.internet.email() }
}

function mockCompositionKeywordsEmployeeInfo() {
  return {
    employeeId: faker.number.int({ min: 1, max: 1000 }),
    department: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockCompositionKeywordsEmployee() {
  return {
    ...mockCompositionKeywordsPerson(),
    ...mockCompositionKeywordsEmployeeInfo(),
    ...{
      startDate: faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 10),
        undefined,
      ]),
    },
  }
}

function mockCompositionKeywordsNotStringValue() {
  return undefined
}

function mockCallbacksFieldOrderRequest() {
  return {
    item: faker.string.alpha({ length: { min: 5, max: 20 } }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    callbackUrl: faker.internet.url(),
  }
}

function mockCallbacksFieldPaymentRequest() {
  return {
    amount: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    currency: faker.string.alpha({ length: { min: 5, max: 20 } }),
    successUrl: faker.internet.url(),
    failureUrl: faker.internet.url(),
  }
}

function mockDefaultResponseItem() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

function mockComplexSchemasLiteralExpr() {
  return {
    type: 'literal' as const,
    value: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
      faker.datatype.boolean(),
    ]),
  }
}

function mockComplexSchemasBinaryExpr(): any {
  return {
    type: 'binary' as const,
    operator: faker.helpers.arrayElement(['+', '-', '*', '/'] as const),
    left: mockComplexSchemasExpression(),
    right: mockComplexSchemasExpression(),
  }
}

function mockComplexSchemasUnaryExpr(): any {
  return {
    type: 'unary' as const,
    operator: faker.helpers.arrayElement(['-', '!'] as const),
    operand: mockComplexSchemasExpression(),
  }
}

function mockComplexSchemasExpression(): any {
  return faker.helpers.arrayElement([
    mockComplexSchemasLiteralExpr(),
    mockComplexSchemasUnaryExpr(),
    mockComplexSchemasBinaryExpr(),
  ])
}

function mockComplexSchemasCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasTriangle() {
  return {
    kind: 'triangle' as const,
    base: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasPolygon() {
  return {
    kind: 'polygon' as const,
    sides: faker.number.int({ min: 3, max: 1000 }),
    sideLength: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasEllipse() {
  return {
    kind: 'ellipse' as const,
    semiMajor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    semiMinor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasShape() {
  return faker.helpers.arrayElement([
    mockComplexSchemasCircle(),
    mockComplexSchemasRectangle(),
    mockComplexSchemasTriangle(),
    mockComplexSchemasPolygon(),
    mockComplexSchemasEllipse(),
  ])
}

function mockComplexSchemasDocumentBase() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockComplexSchemasArticleContent() {
  return {
    docType: 'article' as const,
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    wordCount: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
  }
}

function mockComplexSchemasArticle() {
  return { ...mockComplexSchemasDocumentBase(), ...mockComplexSchemasArticleContent() }
}

function mockComplexSchemasSpreadsheetContent() {
  return {
    docType: 'spreadsheet' as const,
    rows: faker.number.int({ min: 1, max: 1000 }),
    columns: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockComplexSchemasSpreadsheet() {
  return { ...mockComplexSchemasDocumentBase(), ...mockComplexSchemasSpreadsheetContent() }
}

function mockComplexSchemasDocument() {
  return faker.helpers.arrayElement([mockComplexSchemasArticle(), mockComplexSchemasSpreadsheet()])
}

function mockComplexSchemasBaseConfig() {
  return { version: faker.number.int({ min: 1, max: 1000 }) }
}

function mockComplexSchemasNetworkConfig() {
  return {
    host: faker.string.alpha({ length: { min: 5, max: 20 } }),
    port: faker.number.int({ min: 1, max: 65535 }),
  }
}

function mockComplexSchemasSecurityConfig() {
  return {
    tlsEnabled: faker.datatype.boolean(),
    certPath: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockComplexSchemasFullConfig() {
  return {
    ...mockComplexSchemasBaseConfig(),
    ...mockComplexSchemasNetworkConfig(),
    ...mockComplexSchemasSecurityConfig(),
  }
}

function mockVendorExtensionsEmail() {
  return faker.internet.email()
}

function mockVendorExtensionsUsername() {
  return faker.string.alpha({ length: { min: 3, max: 20 } })
}

function mockVendorExtensionsPrice() {
  return faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })
}

function mockVendorExtensionsTags() {
  return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
    faker.string.alpha({ length: { min: 5, max: 20 } }),
  )
}

function mockVendorExtensionsCreateUser() {
  return {
    email: mockVendorExtensionsEmail(),
    username: mockVendorExtensionsUsername(),
    price: mockVendorExtensionsPrice(),
    tags: faker.helpers.arrayElement([mockVendorExtensionsTags(), undefined]),
  }
}

function mockVendorExtensionsUserId() {
  return faker.string.uuid()
}

function mockVendorExtensionsQuantity() {
  return faker.number.int({ min: 0, max: 1000 })
}

function mockVendorExtensionsCreatePost() {
  return {
    authorId: mockVendorExtensionsUserId(),
    title: faker.lorem.sentence(),
    quantity: mockVendorExtensionsQuantity(),
  }
}

function mockVendorExtensionsTransformForm() {
  return {
    trimmed: faker.string.alpha({ length: { min: 5, max: 20 } }),
    lowered: faker.string.alpha({ length: { min: 5, max: 20 } }),
    uppered: faker.string.alpha({ length: { min: 5, max: 20 } }),
    normalized: faker.string.alpha({ length: { min: 5, max: 20 } }),
    lowercased: faker.string.alpha({ length: { min: 5, max: 20 } }),
    uppercased: faker.string.alpha({ length: { min: 5, max: 20 } }),
    startsWithHttps: faker.string.alpha({ length: { min: 5, max: 20 } }),
    endsWithTest: faker.string.alpha({ length: { min: 5, max: 20 } }),
    includesSlug: faker.string.alpha({ length: { min: 5, max: 20 } }),
    emailNormalized: faker.internet.email(),
    allChained: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockVendorExtensionsCoerceForm() {
  return {
    asString: faker.string.alpha({ length: { min: 5, max: 20 } }),
    asDate: faker.date.past().toISOString(),
    asNumber: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    asInt: faker.number.int({ min: 0, max: 1000 }),
    asBool: faker.datatype.boolean(),
  }
}

function mockVendorExtensionsReplacementForm() {
  return {
    codecDate: faker.date.past().toISOString(),
    transformed: faker.string.alpha({ length: { min: 5, max: 20 } }),
    piped: faker.string.alpha({ length: { min: 5, max: 20 } }),
    preprocessed: faker.string.alpha({ length: { min: 5, max: 20 } }),
    asStringBool: faker.datatype.boolean(),
    asStringBoolCustom: faker.datatype.boolean(),
  }
}

function mockVendorExtensionsFormatOptions() {
  return {
    emailHtml5: faker.internet.email(),
    customEmail: faker.internet.email(),
    uuidV8: faker.string.uuid(),
    httpsUrl: faker.internet.url(),
    hostScopedUrl: faker.internet.url(),
    preciseDatetime: faker.date.past().toISOString(),
    localDatetime: faker.date.past().toISOString(),
    colonMac: faker.string.alpha({ length: { min: 5, max: 20 } }),
    dotMac: faker.string.alpha({ length: { min: 5, max: 20 } }),
    hs256Jwt: faker.string.alpha({ length: { min: 5, max: 20 } }),
    sha256Hash: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockVendorExtensionsCustomForm() {
  return {
    password: faker.internet.password(),
    normalizedEmail: faker.internet.email(),
    config: { name: faker.helpers.arrayElement([faker.person.fullName(), undefined]) },
    greeting: faker.string.alpha({ length: { min: 5, max: 20 } }),
    retries: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockVendorExtensionsMessageForm() {
  return {
    username: faker.internet.username(),
    code: faker.string.alpha({ length: { min: 6, max: 6 } }),
    slug: faker.helpers.fromRegExp(/^[a-z0-9-]+$/),
    age: faker.number.int({ min: 1, max: 120 }),
    score: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    count: faker.number.int({ min: 0, max: 1000 }),
    active: faker.datatype.boolean(),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 20 } }),
    ),
    pin: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.number.int({ min: 1, max: 1000 }),
    ),
    role: faker.helpers.arrayElement(['admin', 'editor', 'viewer'] as const),
    priority: faker.helpers.arrayElement([1, 2, 3] as const),
    color: 'red' as const,
    kind: faker.string.alpha({ length: { min: 5, max: 20 } }),
    uniqueTags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 20 } }),
    ),
    namespaced: {
      a: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
      b: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
      c: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
    },
    prefixed: undefined,
    payload: faker.string.alpha({ length: { min: 5, max: 20 } }),
    token: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    tokenLabel: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockVendorExtensionsComposition() {
  return {
    anyValue: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      faker.number.int({ min: 1, max: 1000 }),
    ]),
    oneValue: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        faker.number.int({ min: 1, max: 1000 }),
      ]),
      undefined,
    ]),
    notString: faker.helpers.arrayElement([undefined, undefined]),
    merged: faker.helpers.arrayElement([
      { ...{ name: faker.person.fullName() }, ...{ age: faker.number.int({ min: 1, max: 120 }) } },
      undefined,
    ]),
    propertyNames: faker.helpers.arrayElement([{}, undefined]),
  }
}

function mockVendorExtensionsConditional() {
  return {
    kind: faker.helpers.arrayElement(['premium', 'basic'] as const),
    feature: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockVendorExtensionsApplicators() {
  return {
    tuple: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.datatype.boolean(),
    ),
    list: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 20 } }),
    ),
    meta: undefined,
  }
}

describe('All Features — consolidated generate fixture', () => {
  describe('default', () => {
    describe('GET /minimal/health', () => {
      it('should return 200', async () => {
        const res = await app.request(`/minimal/health`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /allExports/users', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/allExports/users?page=${encodeURIComponent(String(page))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /allExports/users', () => {
      it('should return 201', async () => {
        const res = await app.request(`/allExports/users`, { method: 'POST' })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /allExports/users/{id}', () => {
      it('should return 200', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/allExports/users/${id}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/allExports/users/${id}`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /circularRefs/tree', () => {
      it('should return 200', async () => {
        const res = await app.request(`/circularRefs/tree`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /circularRefs/tree', () => {
      it('should return 201', async () => {
        const body = mockCircularRefsTreeNode()
        const res = await app.request(`/circularRefs/tree`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /circularRefs/graph', () => {
      it('should return 200', async () => {
        const res = await app.request(`/circularRefs/graph`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /securitySchemes/public', () => {
      it('should return 200', async () => {
        const res = await app.request(`/securitySchemes/public`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /securitySchemes/bearer-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/securitySchemes/bearer-protected`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/securitySchemes/bearer-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /securitySchemes/api-key-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/securitySchemes/api-key-protected`, {
          method: 'GET',
          headers: { 'X-API-Key': faker.string.alphanumeric(32) },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/securitySchemes/api-key-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /securitySchemes/basic-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/securitySchemes/basic-protected`, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`,
          },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/securitySchemes/basic-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /securitySchemes/oauth-protected', () => {
      it('should return 200', async () => {
        const res = await app.request(`/securitySchemes/oauth-protected`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/securitySchemes/oauth-protected`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /securitySchemes/multi-auth', () => {
      it('should return 200', async () => {
        const res = await app.request(`/securitySchemes/multi-auth`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
            'X-API-Key': faker.string.alphanumeric(32),
          },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/securitySchemes/multi-auth`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('POST /contentTypes/json', () => {
      it('should return 200', async () => {
        const body = {
          name: faker.person.fullName(),
          value: faker.number.int({ min: 1, max: 1000 }),
        }
        const res = await app.request(`/contentTypes/json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /contentTypes/form', () => {
      it('should return 200', async () => {
        const res = await app.request(`/contentTypes/form`, { method: 'POST' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /contentTypes/upload', () => {
      it('should return 200', async () => {
        const res = await app.request(`/contentTypes/upload`, { method: 'POST' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /contentTypes/text', () => {
      it('should return 200', async () => {
        const res = await app.request(`/contentTypes/text`, { method: 'POST' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /contentTypes/multi-content', () => {
      it('should return 200', async () => {
        const body = { data: faker.string.alpha({ length: { min: 5, max: 20 } }) }
        const res = await app.request(`/contentTypes/multi-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /parametersMerge/items/{itemId}', () => {
      it('should return 200', async () => {
        const fields = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/parametersMerge/items/{itemId}?fields=${encodeURIComponent(String(fields))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /parametersMerge/items/{itemId}', () => {
      it('should return 200', async () => {
        const version = faker.string.alpha({ length: { min: 5, max: 20 } })
        const body = mockParametersMergeItemUpdate()
        const res = await app.request(`/parametersMerge/items/{itemId}`, {
          method: 'PUT',
          headers: { version: String(version), 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('DELETE /parametersMerge/items/{itemId}', () => {
      it('should return 204', async () => {
        const res = await app.request(`/parametersMerge/items/{itemId}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('GET /parametersMerge/items', () => {
      it('should return 200', async () => {
        const limit = faker.number.int({ min: 1, max: 100 })
        const offset = faker.number.int({ min: 0, max: 1000 })
        const sort = faker.helpers.arrayElement(['name', 'created', 'updated'] as const)
        const res = await app.request(
          `/parametersMerge/items?limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}&sort=${encodeURIComponent(String(sort))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /schemaEdgeCases/nullable', () => {
      it('should return 200', async () => {
        const body = mockSchemaEdgeCasesNullableFields()
        const res = await app.request(`/schemaEdgeCases/nullable`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /schemaEdgeCases/discriminated', () => {
      it('should return 200', async () => {
        const body = mockSchemaEdgeCasesShape()
        const res = await app.request(`/schemaEdgeCases/discriminated`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /schemaEdgeCases/composed', () => {
      it('should return 200', async () => {
        const res = await app.request(`/schemaEdgeCases/composed`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /schemaEdgeCases/deep-nested', () => {
      it('should return 200', async () => {
        const res = await app.request(`/schemaEdgeCases/deep-nested`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /schemaEdgeCases/additional-props', () => {
      it('should return 200', async () => {
        const res = await app.request(`/schemaEdgeCases/additional-props`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /callbacksLinks/subscriptions', () => {
      it('should return 201', async () => {
        const body = mockCallbacksLinksSubscriptionRequest()
        const res = await app.request(`/callbacksLinks/subscriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /callbacksLinks/subscriptions/{id}', () => {
      it('should return 200', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/callbacksLinks/subscriptions/${id}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('DELETE /callbacksLinks/subscriptions/{id}', () => {
      it('should return 204', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/callbacksLinks/subscriptions/${id}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('POST /callbacksLinks/webhooks/test', () => {
      it('should return 200', async () => {
        const body = { url: faker.internet.url() }
        const res = await app.request(`/callbacksLinks/webhooks/test`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /crudRefs/posts', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/crudRefs/posts?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /crudRefs/posts', () => {
      it('should return 201', async () => {
        const body = mockCrudRefsCreatePost()
        const res = await app.request(`/crudRefs/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /crudRefs/posts/{id}', () => {
      it('should return 200', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/crudRefs/posts/${id}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /crudRefs/posts/{id}', () => {
      it('should return 200', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const body = mockCrudRefsUpdatePost()
        const res = await app.request(`/crudRefs/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('DELETE /crudRefs/posts/{id}', () => {
      it('should return 204', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/crudRefs/posts/${id}`, { method: 'DELETE' })
        expect(res.status).toBe(204)
      })
    })
    describe('GET /crudRefs/posts/{id}/comments', () => {
      it('should return 200', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const res = await app.request(`/crudRefs/posts/${id}/comments`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /crudRefs/posts/{id}/comments', () => {
      it('should return 201', async () => {
        const id = faker.number.int({ min: 1, max: 99999 })
        const body = mockCrudRefsCreateComment()
        const res = await app.request(`/crudRefs/posts/${id}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /crudRefs/tags', () => {
      it('should return 200', async () => {
        const res = await app.request(`/crudRefs/tags`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /comprehensive/users', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/comprehensive/users?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /comprehensive/users', () => {
      it('should return 201', async () => {
        const body = mockComprehensiveCreateUser()
        const res = await app.request(`/comprehensive/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockComprehensiveCreateUser()
        const res = await app.request(`/comprehensive/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/users/{userId}', () => {
      it('should return 200', async () => {
        const res = await app.request(`/comprehensive/users/{userId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /comprehensive/users/{userId}', () => {
      it('should return 200', async () => {
        const body = mockComprehensiveUpdateUser()
        const res = await app.request(`/comprehensive/users/{userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const body = mockComprehensiveUpdateUser()
        const res = await app.request(`/comprehensive/users/{userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('DELETE /comprehensive/users/{userId}', () => {
      it('should return 204', async () => {
        const res = await app.request(`/comprehensive/users/{userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(204)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/comprehensive/users/{userId}`, { method: 'DELETE' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/products', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const category = faker.string.alpha({ length: { min: 5, max: 20 } })
        const minPrice = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 })
        const maxPrice = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 })
        const res = await app.request(
          `/comprehensive/products?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}&category=${encodeURIComponent(String(category))}&minPrice=${encodeURIComponent(String(minPrice))}&maxPrice=${encodeURIComponent(String(maxPrice))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /comprehensive/products', () => {
      it('should return 201', async () => {
        const body = mockComprehensiveCreateProduct()
        const res = await app.request(`/comprehensive/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockComprehensiveCreateProduct()
        const res = await app.request(`/comprehensive/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/products/{productId}', () => {
      it('should return 200', async () => {
        const res = await app.request(`/comprehensive/products/{productId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /comprehensive/products/{productId}', () => {
      it('should return 200', async () => {
        const body = mockComprehensiveUpdateProduct()
        const res = await app.request(`/comprehensive/products/{productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const body = mockComprehensiveUpdateProduct()
        const res = await app.request(`/comprehensive/products/{productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/products/{productId}/reviews', () => {
      it('should return 200', async () => {
        const res = await app.request(`/comprehensive/products/{productId}/reviews`, {
          method: 'GET',
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /comprehensive/products/{productId}/reviews', () => {
      it('should return 201', async () => {
        const body = mockComprehensiveCreateReview()
        const res = await app.request(`/comprehensive/products/{productId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockComprehensiveCreateReview()
        const res = await app.request(`/comprehensive/products/{productId}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/orders', () => {
      it('should return 200', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const status = faker.helpers.arrayElement([
          'pending',
          'confirmed',
          'shipped',
          'delivered',
          'cancelled',
        ] as const)
        const res = await app.request(
          `/comprehensive/orders?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}&status=${encodeURIComponent(String(status))}`,
          { method: 'GET', headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` } },
        )
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const page = faker.number.int({ min: 1, max: 1000 })
        const limit = faker.number.int({ min: 1, max: 1000 })
        const status = faker.helpers.arrayElement([
          'pending',
          'confirmed',
          'shipped',
          'delivered',
          'cancelled',
        ] as const)
        const res = await app.request(
          `/comprehensive/orders?page=${encodeURIComponent(String(page))}&limit=${encodeURIComponent(String(limit))}&status=${encodeURIComponent(String(status))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(401)
      })
    })
    describe('POST /comprehensive/orders', () => {
      it('should return 201', async () => {
        const body = mockComprehensiveCreateOrder()
        const res = await app.request(`/comprehensive/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${faker.string.alphanumeric(32)}`,
          },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
      it('should return 401 without auth', async () => {
        const body = mockComprehensiveCreateOrder()
        const res = await app.request(`/comprehensive/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/orders/{orderId}', () => {
      it('should return 200', async () => {
        const res = await app.request(`/comprehensive/orders/{orderId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/comprehensive/orders/{orderId}`, { method: 'GET' })
        expect(res.status).toBe(401)
      })
    })
    describe('GET /comprehensive/categories', () => {
      it('should return 200', async () => {
        const res = await app.request(`/comprehensive/categories`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /comprehensive/upload/image', () => {
      it('should return 200', async () => {
        const res = await app.request(`/comprehensive/upload/image`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${faker.string.alphanumeric(32)}` },
        })
        expect(res.status).toBe(200)
      })
      it('should return 401 without auth', async () => {
        const res = await app.request(`/comprehensive/upload/image`, { method: 'POST' })
        expect(res.status).toBe(401)
      })
    })
    describe('POST /compositionKeywords/one-of', () => {
      it('should return 200', async () => {
        const body = mockCompositionKeywordsPaymentMethod()
        const res = await app.request(`/compositionKeywords/one-of`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /compositionKeywords/any-of', () => {
      it('should return 200', async () => {
        const body = mockCompositionKeywordsSearchFilter()
        const res = await app.request(`/compositionKeywords/any-of`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /compositionKeywords/all-of', () => {
      it('should return 200', async () => {
        const body = mockCompositionKeywordsEmployee()
        const res = await app.request(`/compositionKeywords/all-of`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /compositionKeywords/not', () => {
      it('should return 200', async () => {
        const body = mockCompositionKeywordsNotStringValue()
        const res = await app.request(`/compositionKeywords/not`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/not-ref', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/not-ref`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/not-enum', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/not-enum`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/not-const', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/not-const`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/not-composition', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/not-composition`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/all-of-sibling', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/all-of-sibling`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/nullable-one-of', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/nullable-one-of`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/any-of-three', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/any-of-three`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /compositionKeywords/any-of-ref', () => {
      it('should return 200', async () => {
        const res = await app.request(`/compositionKeywords/any-of-ref`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /callbacksField/orders', () => {
      it('should return 201 - Create an order with callback', async () => {
        const body = mockCallbacksFieldOrderRequest()
        const res = await app.request(`/callbacksField/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('POST /callbacksField/payments', () => {
      it('should return 201 - Create a payment with multiple callbacks', async () => {
        const body = mockCallbacksFieldPaymentRequest()
        const res = await app.request(`/callbacksField/payments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /callbacksField/items', () => {
      it('should return 200 - List items (no callbacks)', async () => {
        const res = await app.request(`/callbacksField/items`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /arrayObjectConstraints/tags', () => {
      it('should return 200', async () => {
        const res = await app.request(`/arrayObjectConstraints/tags`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /arrayObjectConstraints/tags', () => {
      it('should return 201', async () => {
        const body = {
          metadata: {
            key: faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 5, max: 20 } }),
              undefined,
            ]),
            value: faker.helpers.arrayElement([
              faker.string.alpha({ length: { min: 5, max: 20 } }),
              undefined,
            ]),
          },
          config: faker.helpers.arrayElement([
            { name: faker.helpers.arrayElement([faker.person.fullName(), undefined]) },
            undefined,
          ]),
          limited: faker.helpers.arrayElement([
            {
              a: faker.helpers.arrayElement([
                faker.string.alpha({ length: { min: 5, max: 20 } }),
                undefined,
              ]),
              b: faker.helpers.arrayElement([
                faker.string.alpha({ length: { min: 5, max: 20 } }),
                undefined,
              ]),
            },
            undefined,
          ]),
        }
        const res = await app.request(`/arrayObjectConstraints/tags`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /arrayObjectConstraints/settings', () => {
      it('should return 200', async () => {
        const filter = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/arrayObjectConstraints/settings?filter=${encodeURIComponent(String(filter))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('PUT /arrayObjectConstraints/settings', () => {
      it('should return 200', async () => {
        const body = { avatar: faker.string.alpha({ length: { min: 5, max: 20 } }) }
        const res = await app.request(`/arrayObjectConstraints/settings`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /arrayObjectConstraints/config', () => {
      it('should return 201', async () => {
        const body = {
          data: {},
          headers: faker.helpers.arrayElement([{}, undefined]),
          keys: faker.helpers.arrayElement([{}, undefined]),
        }
        const res = await app.request(`/arrayObjectConstraints/config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('POST /arrayObjectConstraints/payment', () => {
      it('should return 201', async () => {
        const body = {
          creditCard: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 5, max: 20 } }),
            undefined,
          ]),
          billingAddress: faker.helpers.arrayElement([
            faker.string.alpha({ length: { min: 5, max: 20 } }),
            undefined,
          ]),
          email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
        }
        const res = await app.request(`/arrayObjectConstraints/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /trailingSlash/api/reverseChiban/', () => {
      it('should return 200 - Reverse Chiban (trailing slash)', async () => {
        const res = await app.request(`/trailingSlash/api/reverseChiban/`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /trailingSlash/api/reverseChiban', () => {
      it('should return 200 - Reverse Chiban (no trailing slash)', async () => {
        const res = await app.request(`/trailingSlash/api/reverseChiban`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /trailingSlash/posts/', () => {
      it('should return 200 - List posts (trailing slash only)', async () => {
        const limit = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/trailingSlash/posts/?limit=${encodeURIComponent(String(limit))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /trailingSlash/posts/', () => {
      it('should return 201 - Create post (trailing slash only)', async () => {
        const body = { title: faker.lorem.sentence() }
        const res = await app.request(`/trailingSlash/posts/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /trailingSlash/users/{id}/', () => {
      it('should return 200 - Get user (trailing slash with path param)', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/trailingSlash/users/${id}/`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /trailingSlash/items/', () => {
      it('should return 200 - List items (trailing slash only)', async () => {
        const res = await app.request(`/trailingSlash/items/`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /readonlyRef/users', () => {
      it('should return 200 - List users', async () => {
        const res = await app.request(`/readonlyRef/users`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /readonlyRef/users', () => {
      it('should return 201 - Create user', async () => {
        const res = await app.request(`/readonlyRef/users`, { method: 'POST' })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /readonlyRef/users/{id}', () => {
      it('should return 200 - Get user by ID', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/readonlyRef/users/${id}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
      it('should return 404 for non-existent resource', async () => {
        const res = await app.request(`/readonlyRef/users/__non_existent__`, { method: 'GET' })
        expect(res.status).toBe(404)
      })
    })
    describe('PUT /readonlyRef/users/{id}', () => {
      it('should return 200 - Update user', async () => {
        const id = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(`/readonlyRef/users/${id}`, { method: 'PUT' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /readonlyRef/items', () => {
      it('should return 200 - List items (uses $ref response alias)', async () => {
        const res = await app.request(`/readonlyRef/items`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /trailingSlashReal/api/reverseGeocode/', () => {
      it('should return 200 - Reverse geocode lookup', async () => {
        const callback = faker.string.alpha({ length: { min: 5, max: 20 } })
        const search_type = faker.helpers.arrayElement(['0', '1', '2'] as const)
        const lat = faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })
        const lon = faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })
        const polygon = faker.helpers.fromRegExp(/^(\d+\.\d+,\d+\.\d+,)*\d+\.\d+,\d+\.\d+$/)
        const radius = faker.number.int({ min: 1, max: 200 })
        const include_shape = faker.datatype.boolean()
        const include_count = faker.datatype.boolean()
        const limit = faker.number.int({ min: 1, max: 50 })
        const offset = faker.number.int({ min: 1, max: 1000 })
        const res = await app.request(
          `/trailingSlashReal/api/reverseGeocode/?callback=${encodeURIComponent(String(callback))}&search_type=${encodeURIComponent(String(search_type))}&lat=${encodeURIComponent(String(lat))}&lon=${encodeURIComponent(String(lon))}&polygon=${encodeURIComponent(String(polygon))}&radius=${encodeURIComponent(String(radius))}&include_shape=${encodeURIComponent(String(include_shape))}&include_count=${encodeURIComponent(String(include_count))}&limit=${encodeURIComponent(String(limit))}&offset=${encodeURIComponent(String(offset))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('POST /defaultResponse/items', () => {
      it('should return 200', async () => {
        const body = mockDefaultResponseItem()
        const res = await app.request(`/defaultResponse/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /defaultResponse/ping', () => {
      it('should return 2', async () => {
        const res = await app.request(`/defaultResponse/ping`, { method: 'GET' })
        expect(res.status).toBe(2)
      })
    })
    describe('POST /complexSchemas/expressions', () => {
      it('should return 200', async () => {
        const body = mockComplexSchemasExpression()
        const res = await app.request(`/complexSchemas/expressions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /complexSchemas/shapes', () => {
      it('should return 200', async () => {
        const body = mockComplexSchemasShape()
        const res = await app.request(`/complexSchemas/shapes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /complexSchemas/documents', () => {
      it('should return 200', async () => {
        const body = mockComplexSchemasDocument()
        const res = await app.request(`/complexSchemas/documents`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /complexSchemas/configs', () => {
      it('should return 200', async () => {
        const body = mockComplexSchemasFullConfig()
        const res = await app.request(`/complexSchemas/configs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /complexSchemas/nullable-union', () => {
      it('should return 200', async () => {
        const res = await app.request(`/complexSchemas/nullable-union`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /complexSchemas/nested-circular', () => {
      it('should return 200', async () => {
        const res = await app.request(`/complexSchemas/nested-circular`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/users', () => {
      it('should return 201', async () => {
        const body = mockVendorExtensionsCreateUser()
        const res = await app.request(`/vendorExtensions/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('GET /vendorExtensions/users/{userId}', () => {
      it('should return 200', async () => {
        const userId = mockVendorExtensionsUserId()
        const res = await app.request(`/vendorExtensions/users/${userId}`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/posts', () => {
      it('should return 201', async () => {
        const body = mockVendorExtensionsCreatePost()
        const res = await app.request(`/vendorExtensions/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(201)
      })
    })
    describe('POST /vendorExtensions/transforms', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsTransformForm()
        const res = await app.request(`/vendorExtensions/transforms`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/coerce', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsCoerceForm()
        const res = await app.request(`/vendorExtensions/coerce`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/replacements', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsReplacementForm()
        const res = await app.request(`/vendorExtensions/replacements`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/formats', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsFormatOptions()
        const res = await app.request(`/vendorExtensions/formats`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/custom', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsCustomForm()
        const res = await app.request(`/vendorExtensions/custom`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/messages', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsMessageForm()
        const res = await app.request(`/vendorExtensions/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/composition', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsComposition()
        const res = await app.request(`/vendorExtensions/composition`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/conditional', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsConditional()
        const res = await app.request(`/vendorExtensions/conditional`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('POST /vendorExtensions/applicators', () => {
      it('should return 200', async () => {
        const body = mockVendorExtensionsApplicators()
        const res = await app.request(`/vendorExtensions/applicators`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /pagination/items', () => {
      it('should return 200 - List items with pagination', async () => {
        const limit = faker.number.int({ min: 1, max: 1000 })
        const cursor = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/pagination/items?limit=${encodeURIComponent(String(limit))}&cursor=${encodeURIComponent(String(cursor))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
    describe('GET /pagination/feeds', () => {
      it('should return 200 - Feed (paginated, no args)', async () => {
        const res = await app.request(`/pagination/feeds`, { method: 'GET' })
        expect(res.status).toBe(200)
      })
    })
    describe('GET /pagination/users/{userId}/posts', () => {
      it("should return 200 - User's posts (paginated, path param)", async () => {
        const userId = faker.string.alpha({ length: { min: 5, max: 20 } })
        const cursor = faker.string.alpha({ length: { min: 5, max: 20 } })
        const res = await app.request(
          `/pagination/users/${userId}/posts?cursor=${encodeURIComponent(String(cursor))}`,
          { method: 'GET' },
        )
        expect(res.status).toBe(200)
      })
    })
  })
  describe('v2/public/booking/account/register/oauth', () => {
    describe('POST /trailingSlashReal/api/v2/public/booking/account/register/oauth/', () => {
      it('should return 200', async () => {
        const body = { account: undefined, profile: undefined }
        const res = await app.request(
          `/trailingSlashReal/api/v2/public/booking/account/register/oauth/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          },
        )
        expect(res.status).toBe(200)
      })
    })
  })
  describe('v2/public/booking/account/register/email', () => {
    describe('POST /trailingSlashReal/api/v2/public/booking/account/register/email', () => {
      it('should return 200 - Send registration URL via email', async () => {
        const body = { email: faker.internet.email() }
        const res = await app.request(
          `/trailingSlashReal/api/v2/public/booking/account/register/email`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          },
        )
        expect(res.status).toBe(200)
      })
    })
  })
})
