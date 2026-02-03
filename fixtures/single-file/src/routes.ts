import { createRoute, z } from '@hono/zod-openapi'
import {
  BuyerIdQueryParamParamsSchema,
  CompanyIdPathParamParamsSchema,
  CursorQueryParamParamsSchema,
  FileIdPathParamParamsSchema,
  IncludeQueryParamParamsSchema,
  LimitQueryParamParamsSchema,
  OrderIdPathParamParamsSchema,
  SearchFilterQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
  UserIdPathParamParamsSchema,
} from './parameters'
import {
  CreateOrderRequestRequestBody,
  CreateUserRequestRequestBody,
  SubscriptionRequestRequestBody,
  TokenRequestRequestBody,
  UpdateUserRequestRequestBody,
} from './requestBodies'
import {
  CompanyResponse,
  ConflictResponse,
  DefaultErrorResponse,
  FileResponse,
  NotFoundResponse,
  OrderListResponse,
  OrderResponse,
  RateLimitedResponse,
  SubscriptionResponse,
  TokenResponse,
  UnauthorizedResponse,
  UserListResponse,
  UserResponse,
  ValidationErrorResponse,
} from './responses'
import { OrderCreatedCallback, SubscriptionLifecycleCallback } from './callbacks'

export const postAuthTokenRoute = createRoute({
  method: 'post',
  path: '/auth/token',
  tags: ['Auth'],
  summary: 'Issue access token',
  operationId: 'issueToken',
  request: { body: TokenRequestRequestBody },
  responses: { 200: TokenResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  security: [],
})

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List users',
  operationId: 'listUsers',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({
      limit: LimitQueryParamParamsSchema,
      cursor: CursorQueryParamParamsSchema,
      include: IncludeQueryParamParamsSchema,
      filter: SearchFilterQueryParamParamsSchema,
    }),
  },
  responses: {
    200: UserListResponse,
    401: UnauthorizedResponse,
    429: RateLimitedResponse,
    default: DefaultErrorResponse,
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create user',
  operationId: 'createUser',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: CreateUserRequestRequestBody,
  },
  responses: {
    201: UserResponse,
    400: ValidationErrorResponse,
    409: ConflictResponse,
    default: DefaultErrorResponse,
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'Get user by id',
  operationId: 'getUserById',
  request: {
    params: z.object({ userId: UserIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: UserResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const patchUsersUserIdRoute = createRoute({
  method: 'patch',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'Update user (partial)',
  operationId: 'updateUser',
  request: {
    params: z.object({ userId: UserIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: UpdateUserRequestRequestBody,
  },
  responses: {
    200: UserResponse,
    400: ValidationErrorResponse,
    404: NotFoundResponse,
    default: DefaultErrorResponse,
  },
})

export const getCompaniesCompanyIdRoute = createRoute({
  method: 'get',
  path: '/companies/{companyId}',
  tags: ['Companies'],
  summary: 'Get company by id',
  operationId: 'getCompanyById',
  request: {
    params: z.object({ companyId: CompanyIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: CompanyResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  tags: ['Orders'],
  summary: 'List orders',
  operationId: 'listOrders',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({
      limit: LimitQueryParamParamsSchema,
      cursor: CursorQueryParamParamsSchema,
      buyerId: BuyerIdQueryParamParamsSchema,
      include: IncludeQueryParamParamsSchema,
      filter: SearchFilterQueryParamParamsSchema,
    }),
  },
  responses: { 200: OrderListResponse, 401: UnauthorizedResponse, default: DefaultErrorResponse },
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create order (and optionally trigger callback)',
  operationId: 'createOrder',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: CreateOrderRequestRequestBody,
  },
  responses: { 201: OrderResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  orderEvents: OrderCreatedCallback,
})

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  tags: ['Orders'],
  summary: 'Get order by id',
  operationId: 'getOrderById',
  request: {
    params: z.object({ orderId: OrderIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: OrderResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const getFilesFileIdRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}',
  tags: ['Files'],
  summary: 'Get file metadata',
  operationId: 'getFileById',
  request: {
    params: z.object({ fileId: FileIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
  },
  responses: { 200: FileResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const postSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/subscriptions',
  tags: ['Subscriptions'],
  summary: 'Create webhook subscription',
  operationId: 'createSubscription',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: SubscriptionRequestRequestBody,
  },
  responses: {
    201: SubscriptionResponse,
    400: ValidationErrorResponse,
    default: DefaultErrorResponse,
  },
  subscriptionEvents: SubscriptionLifecycleCallback,
})
