import { z } from '@hono/zod-openapi'
import {
  OrderSchema,
  ProblemDetailsSchema,
  TokenRequestSchema,
  UserPreferencesSchema,
  UserSchema,
  WebhookEventSchema,
  WebhookSubscriptionSchema,
} from './schemas'
import {
  OrderExample,
  SubscriptionExample,
  TokenRequestClientCredentialsExample,
  TokenRequestRefreshExample,
  UserFullExample,
  UserMinimalExample,
  UserPrefsExample,
  WebhookEventExample,
} from './examples'

import { z } from '@hono/zod-openapi'

export const TokenRequestRequestBody = {
  content: {
    'application/json': {
      schema: TokenRequestSchema,
      examples: {
        clientCredentials: TokenRequestClientCredentialsExample,
        refreshToken: TokenRequestRefreshExample,
      },
    },
  },
  required: true,
}

export const CreateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: UserSchema,
      examples: { full: UserFullExample, minimal: UserMinimalExample },
    },
  },
  required: true,
}

export const UpdateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: z.union([
        UserSchema,
        UserPreferencesSchema,
        z.object({ patch: ProblemDetailsSchema.exactOptional() }),
      ]),
      examples: { prefs: UserPrefsExample },
    },
  },
  required: true,
}

export const CreateOrderRequestRequestBody = {
  content: { 'application/json': { schema: OrderSchema, examples: { sample: OrderExample } } },
  required: true,
}

export const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExample },
    },
  },
  required: true,
}

export const WebhookEventRequestRequestBody = {
  content: {
    'application/json': { schema: WebhookEventSchema, examples: { event: WebhookEventExample } },
  },
  required: true,
}
