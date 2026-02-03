export const TraceIdExample = {
  summary: 'TraceId example',
  value: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
}

export const UserIdUuidExample = {
  summary: 'userId uuid',
  value: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
}

export const UserIdUlidExample = { summary: 'userId ulid', value: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }

export const TokenRequestClientCredentialsExample = {
  value: {
    grantType: 'client_credentials',
    clientId: 'client_123',
    clientSecret: 'secret_abc',
    trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
  },
}

export const TokenRequestRefreshExample = {
  value: {
    grantType: 'refresh_token',
    refreshToken: 'refresh_xxx',
    trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
  },
}

export const TokenResponseExample = {
  value: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    tokenType: 'Bearer',
    expiresIn: 3600,
    scope: 'inferno.read',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
    },
  },
}

export const UserMinimalExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Minimal User',
    email: 'min@example.com',
  },
}

export const UserFullExample = {
  value: {
    id: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
    },
    name: 'Inferno Taro',
    email: 'taro@inferno.example',
    company: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Inferno Inc.',
    },
    manager: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
    addresses: [
      {
        line1: '1-2-3 Hell St',
        city: 'Tokyo',
        country: 'JP',
        geo: {
          lat: 35.6895,
          lng: 139.6917,
          graph: {
            nodes: [
              {
                id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
                edges: [{ to: { id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }, weight: 0.666 }],
              },
            ],
          },
        },
      },
    ],
  },
}

export const UserPrefsExample = {
  value: {
    locale: 'ja-JP',
    marketingOptIn: false,
    shadowProfile: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Shadow',
      email: 'shadow@inferno.example',
    },
  },
}

export const CompanyExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Inferno Inc.',
    employees: [
      {
        id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
        meta: { createdAt: '2026-01-04T00:00:00Z' },
        name: 'Minimal User',
        email: 'min@example.com',
      },
    ],
  },
}

export const OrderExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    buyer: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
    status: 'paid',
    items: [
      {
        product: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Flame Keyboard',
          price: { currency: 'JPY', amount: 19999 },
        },
        quantity: 1,
      },
    ],
    auditTrail: [
      {
        entity: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Minimal User',
          email: 'min@example.com',
        },
        event: { type: 'order.created', payload: { orderId: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' } },
        meta: { createdAt: '2026-01-04T00:00:00Z' },
      },
    ],
  },
}

export const UserListExample = {
  value: {
    items: [
      {
        id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
        meta: { createdAt: '2026-01-04T00:00:00Z' },
        name: 'Minimal User',
        email: 'min@example.com',
      },
    ],
    nextCursor: 'cursor_opaque_123',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
  },
}

export const OrderListExample = {
  value: {
    items: [
      {
        id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
        meta: { createdAt: '2026-01-04T00:00:00Z' },
        buyer: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Minimal User',
          email: 'min@example.com',
        },
        status: 'paid',
      },
    ],
    nextCursor: 'cursor_opaque_orders_123',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
  },
}

export const FileExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'inferno.png',
    size: 123456,
    contentType: 'image/png',
    download: { href: '/files/01J1K9N3E6R6ZK7Z6B0Q9Q3H3J/download' },
    owner: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
  },
}

export const SubscriptionExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    callbackUrl: 'https://client.example/webhook',
    events: ['order.created', 'user.updated'],
    secret: { secretId: 'sec_123', rotation: { next: { secretId: 'sec_456' } } },
  },
}

export const WebhookEventExample = {
  value: {
    subscription: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      callbackUrl: 'https://client.example/webhook',
      events: ['order.created', 'user.updated'],
      secret: { secretId: 'sec_123', rotation: { next: { secretId: 'sec_456' } } },
    },
    event: { type: 'order.created', payload: { orderId: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' } },
  },
}

export const UserFilterExample = {
  value: {
    kind: 'user',
    email: 'taro@inferno.example',
    manager: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
  },
}

export const OrderFilterExample = {
  value: {
    kind: 'order',
    status: 'paid',
    buyer: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
    minTotal: { currency: 'JPY', amount: 1000 },
  },
}

export const ProblemGenericExample = {
  value: {
    type: 'https://errors.inferno.example/problem/generic',
    title: 'Something went wrong',
    status: 500,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    causes: [
      { type: 'https://errors.inferno.example/problem/inner', title: 'Inner failure', status: 500 },
    ],
  },
}

export const ProblemValidationExample = {
  value: {
    type: 'https://errors.inferno.example/problem/validation',
    title: 'Validation error',
    status: 400,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    errors: [
      {
        path: 'email',
        message: 'Invalid email',
        nested: { path: 'email.domain', message: 'Domain is not allowed' },
      },
    ],
  },
}

export const ProblemUnauthorizedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/unauthorized',
    title: 'Unauthorized',
    status: 401,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
}

export const ProblemNotFoundExample = {
  value: {
    type: 'https://errors.inferno.example/problem/notfound',
    title: 'Not found',
    status: 404,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
}

export const ProblemRateLimitedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/ratelimited',
    title: 'Too many requests',
    status: 429,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
}

export const UserFullAliasExample = { $ref: '#/components/examples/UserFull' }

export const DefaultUserExample = { $ref: '#/components/examples/UserMinimal' }

export const ChainedUserExample = { $ref: '#/components/examples/UserMinimal' }
