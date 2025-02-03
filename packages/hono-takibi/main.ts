import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import {
  putPetRoute,
  postPetRoute,
  getPetFindByStatusRoute,
  getPetFindByTagsRoute,
  getPetPetIdRoute,
  postPetPetIdRoute,
  deletePetPetIdRoute,
  postPetPetIdUploadImageRoute,
  getStoreInventoryRoute,
  postStoreOrderRoute,
  getStoreOrderOrderIdRoute,
  deleteStoreOrderOrderIdRoute,
  postUserRoute,
  postUserCreateWithListRoute,
  getUserLoginRoute,
  getUserLogoutRoute,
  getUserUsernameRoute,
  putUserUsernameRoute,
  deleteUserUsernameRoute,
} from './/workspaces/hono-takibi/packages/hono-takibi/routes/petstore.ts'
import {
  putPetRouteHandler,
  postPetRouteHandler,
  getPetFindByStatusRouteHandler,
  getPetFindByTagsRouteHandler,
  getPetPetIdRouteHandler,
  postPetPetIdRouteHandler,
  deletePetPetIdRouteHandler,
  postPetPetIdUploadImageRouteHandler,
} from './/workspaces/hono-takibi/packages/hono-takibi/routes/handler/pet_handler.ts'
import {
  getStoreInventoryRouteHandler,
  postStoreOrderRouteHandler,
  getStoreOrderOrderIdRouteHandler,
  deleteStoreOrderOrderIdRouteHandler,
} from './/workspaces/hono-takibi/packages/hono-takibi/routes/handler/store_handler.ts'
import {
  postUserRouteHandler,
  postUserCreateWithListRouteHandler,
  getUserLoginRouteHandler,
  getUserLogoutRouteHandler,
  getUserUsernameRouteHandler,
  putUserUsernameRouteHandler,
  deleteUserUsernameRouteHandler,
} from './/workspaces/hono-takibi/packages/hono-takibi/routes/handler/user_handler.ts'

const app = new OpenAPIHono()

const api = app
  .openapi(putPetRoute, putPetRouteHandler)
  .openapi(postPetRoute, postPetRouteHandler)
  .openapi(getPetFindByStatusRoute, getPetFindByStatusRouteHandler)
  .openapi(getPetFindByTagsRoute, getPetFindByTagsRouteHandler)
  .openapi(getPetPetIdRoute, getPetPetIdRouteHandler)
  .openapi(postPetPetIdRoute, postPetPetIdRouteHandler)
  .openapi(deletePetPetIdRoute, deletePetPetIdRouteHandler)
  .openapi(postPetPetIdUploadImageRoute, postPetPetIdUploadImageRouteHandler)
  .openapi(getStoreInventoryRoute, getStoreInventoryRouteHandler)
  .openapi(postStoreOrderRoute, postStoreOrderRouteHandler)
  .openapi(getStoreOrderOrderIdRoute, getStoreOrderOrderIdRouteHandler)
  .openapi(deleteStoreOrderOrderIdRoute, deleteStoreOrderOrderIdRouteHandler)
  .openapi(postUserRoute, postUserRouteHandler)
  .openapi(postUserCreateWithListRoute, postUserCreateWithListRouteHandler)
  .openapi(getUserLoginRoute, getUserLoginRouteHandler)
  .openapi(getUserLogoutRoute, getUserLogoutRouteHandler)
  .openapi(getUserUsernameRoute, getUserUsernameRouteHandler)
  .openapi(putUserUsernameRoute, putUserUsernameRouteHandler)
  .openapi(deleteUserUsernameRoute, deleteUserUsernameRouteHandler)

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  app
    .doc('/doc', {
      openapi: '3.0.3',
      info: {
        title: 'Swagger Petstore - OpenAPI 3.0',
        description:
          "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!\nYou can now help us improve the API whether it's by making changes to the definition itself or to the code.\nThat way, with time, we can improve the API in general, and expose some of the new features in OAS3.\n\n_If you're looking for the Swagger 2.0/OAS 2.0 version of Petstore, then click [here](https://editor.swagger.io/?url=https://petstore.swagger.io/v2/swagger.yaml). Alternatively, you can load via the `Edit > Load Petstore OAS 2.0` menu option!_\n\nSome useful links:\n- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)\n- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)",
        termsOfService: 'http://swagger.io/terms/',
        contact: { email: 'apiteam@swagger.io' },
        license: { name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html' },
        version: '1.0.11',
      },
      servers: [{ url: 'https://petstore3.swagger.io/api/v3' }],
      externalDocs: { description: 'Find out more about Swagger', url: 'http://swagger.io' },
      tags: [
        {
          name: 'pet',
          description: 'Everything about your Pets',
          externalDocs: { description: 'Find out more', url: 'http://swagger.io' },
        },
        {
          name: 'store',
          description: 'Access to Petstore orders',
          externalDocs: { description: 'Find out more about our store', url: 'http://swagger.io' },
        },
        { name: 'user', description: 'Operations about user' },
      ],
    })
    .get('/ui', swaggerUI({ url: 'api/doc' }))
}

export type AddType = typeof api

export default api
