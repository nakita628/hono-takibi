import { z } from '@hono/zod-openapi'
import {
  CompanySchema,
  CursorSchema,
  FileSchema,
  MetaSchema,
  OrderSchema,
  ProblemDetailsSchema,
  TokenResponseSchema,
  UserSchema,
  ValidationProblemDetailsSchema,
  WebhookSubscriptionSchema,
} from './schemas'
import {
  RateLimitLimitHeaderHeaderSchema,
  RateLimitRemainingHeaderHeaderSchema,
  RateLimitResetHeaderHeaderSchema,
  TraceIdHeaderHeaderSchema,
  WwwAuthenticateHeaderHeaderSchema,
} from './headers'
import {
  CompanyExample,
  FileExample,
  OrderExample,
  OrderListExample,
  ProblemGenericExample,
  ProblemNotFoundExample,
  ProblemRateLimitedExample,
  ProblemUnauthorizedExample,
  ProblemValidationExample,
  SubscriptionExample,
  TokenResponseExample,
  UserFullExample,
  UserListExample,
} from './examples'
import {
  GetCompanyFromUserLink,
  GetCompanyLink,
  GetOrderLink,
  GetUserFromFileLink,
  GetUserFromOrderLink,
  GetUserLink,
  ListOrdersForUserLink,
  ListOrdersNextPageLink,
  ListUsersLink,
  ListUsersNextPageLink,
} from './links'

import { z } from '@hono/zod-openapi'

export const DefaultErrorResponse = {
  description: 'Default error wrapper -> points to ProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { generic: ProblemGenericExample },
    },
  },
}

export const ValidationErrorResponse = {
  description: 'Validation error -> points to ValidationProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ValidationProblemDetailsSchema,
      examples: { invalid: ProblemValidationExample },
    },
  },
}

export const UnauthorizedResponse = {
  description: 'Unauthorized',
  headers: z.object({
    'x-trace-id': TraceIdHeaderHeaderSchema,
    'www-authenticate': WwwAuthenticateHeaderHeaderSchema,
  }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { unauthorized: ProblemUnauthorizedExample },
    },
  },
}

export const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/problem+json': { schema: ProblemDetailsSchema } },
}

export const NotFoundResponse = {
  description: 'Not Found',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { notFound: ProblemNotFoundExample },
    },
  },
}

export const RateLimitedResponse = {
  description: 'Too Many Requests',
  headers: z.object({
    'x-trace-id': TraceIdHeaderHeaderSchema,
    'x-ratelimit-limit': RateLimitLimitHeaderHeaderSchema,
    'x-ratelimit-remaining': RateLimitRemainingHeaderHeaderSchema,
    'x-ratelimit-reset': RateLimitResetHeaderHeaderSchema,
  }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { rateLimited: ProblemRateLimitedExample },
    },
  },
}

export const TokenResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: TokenResponseSchema, examples: { token: TokenResponseExample } },
  },
  links: { me: ListUsersLink },
}

export const UserResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: { self: GetUserLink, company: GetCompanyFromUserLink, orders: ListOrdersForUserLink },
}

export const UserListResponse = {
  description: 'Users list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z.array(UserSchema),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({ required: ['items'] }),
      examples: { list: UserListExample },
    },
  },
  links: { next: ListUsersNextPageLink },
}

export const CompanyResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: CompanySchema, examples: { company: CompanyExample } } },
  links: { self: GetCompanyLink },
}

export const OrderResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: OrderSchema, examples: { order: OrderExample } } },
  links: { self: GetOrderLink, buyer: GetUserFromOrderLink },
}

export const OrderListResponse = {
  description: 'Orders list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z.array(OrderSchema),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({ required: ['items'] }),
      examples: { list: OrderListExample },
    },
  },
  links: { next: ListOrdersNextPageLink },
}

export const FileResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExample } } },
  links: { owner: GetUserFromFileLink },
}

export const SubscriptionResponse = {
  description: 'A webhook subscription',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { subscription: SubscriptionExample },
    },
  },
}
