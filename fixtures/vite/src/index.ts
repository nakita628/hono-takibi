import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteUsersIdRouteHandler,
  getHonoRouteHandler,
  getHonoXRouteHandler,
  getUsersIdRouteHandler,
  getUsersRouteHandler,
  getZodOpenapiHonoRouteHandler,
  patchUsersIdRouteHandler,
  postUsersRouteHandler,
  putUsersIdRouteHandler,
} from './handlers'
import {
  deleteUsersIdRoute,
  getHonoRoute,
  getHonoXRoute,
  getUsersIdRoute,
  getUsersRoute,
  getZodOpenapiHonoRoute,
  patchUsersIdRoute,
  postUsersRoute,
  putUsersIdRoute,
} from './routes'

const app = new OpenAPIHono()

const api = app
  .openapi(deleteUsersIdRoute, deleteUsersIdRouteHandler)
  .openapi(getHonoRoute, getHonoRouteHandler)
  .openapi(getHonoXRoute, getHonoXRouteHandler)
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(getUsersIdRoute, getUsersIdRouteHandler)
  .openapi(getZodOpenapiHonoRoute, getZodOpenapiHonoRouteHandler)
  .openapi(patchUsersIdRoute, patchUsersIdRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)
  .openapi(putUsersIdRoute, putUsersIdRouteHandler)

if (process.env.NODE_ENV === 'development') {
  app
    .doc('/doc', {
      openapi: '3.1.0',
      info: { title: 'Hono Takibi API', version: 'v1' },
    })
    .get('/ui', swaggerUI({ url: '/doc' }))
}

export type AddType = typeof api

export default app
