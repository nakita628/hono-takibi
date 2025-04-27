import { describe, expect, it } from 'vitest'
import { generateApplyOpenapiRoutes } from './generate-apply-openapi-routes'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generators/generate-apply-openapi-routes.test.ts

const generateApplyOpenapiRoutesTestCases = [
  {
    routeMappings: [
      {
        routeName: 'putPetRoute',
        handlerName: 'putPetRouteHandler',
        path: '/pet',
      },
      {
        routeName: 'postPetRoute',
        handlerName: 'postPetRouteHandler',
        path: '/pet',
      },
      {
        routeName: 'getPetFindByStatusRoute',
        handlerName: 'getPetFindByStatusRouteHandler',
        path: '/pet/findByStatus',
      },
      {
        routeName: 'getPetFindByTagsRoute',
        handlerName: 'getPetFindByTagsRouteHandler',
        path: '/pet/findByTags',
      },
      {
        routeName: 'getPetPetIdRoute',
        handlerName: 'getPetPetIdRouteHandler',
        path: '/pet/{petId}',
      },
      {
        routeName: 'postPetPetIdRoute',
        handlerName: 'postPetPetIdRouteHandler',
        path: '/pet/{petId}',
      },
      {
        routeName: 'deletePetPetIdRoute',
        handlerName: 'deletePetPetIdRouteHandler',
        path: '/pet/{petId}',
      },
      {
        routeName: 'postPetPetIdUploadImageRoute',
        handlerName: 'postPetPetIdUploadImageRouteHandler',
        path: '/pet/{petId}/uploadImage',
      },
      {
        routeName: 'getStoreInventoryRoute',
        handlerName: 'getStoreInventoryRouteHandler',
        path: '/store/inventory',
      },
      {
        routeName: 'postStoreOrderRoute',
        handlerName: 'postStoreOrderRouteHandler',
        path: '/store/order',
      },
      {
        routeName: 'getStoreOrderOrderIdRoute',
        handlerName: 'getStoreOrderOrderIdRouteHandler',
        path: '/store/order/{orderId}',
      },
      {
        routeName: 'deleteStoreOrderOrderIdRoute',
        handlerName: 'deleteStoreOrderOrderIdRouteHandler',
        path: '/store/order/{orderId}',
      },
      {
        routeName: 'postUserRoute',
        handlerName: 'postUserRouteHandler',
        path: '/user',
      },
      {
        routeName: 'postUserCreateWithListRoute',
        handlerName: 'postUserCreateWithListRouteHandler',
        path: '/user/createWithList',
      },
      {
        routeName: 'getUserLoginRoute',
        handlerName: 'getUserLoginRouteHandler',
        path: '/user/login',
      },
      {
        routeName: 'getUserLogoutRoute',
        handlerName: 'getUserLogoutRouteHandler',
        path: '/user/logout',
      },
      {
        routeName: 'getUserUsernameRoute',
        handlerName: 'getUserUsernameRouteHandler',
        path: '/user/{username}',
      },
      {
        routeName: 'putUserUsernameRoute',
        handlerName: 'putUserUsernameRouteHandler',
        path: '/user/{username}',
      },
      {
        routeName: 'deleteUserUsernameRoute',
        handlerName: 'deleteUserUsernameRouteHandler',
        path: '/user/{username}',
      },
    ],
    expected: `.openapi(putPetRoute,putPetRouteHandler)
.openapi(postPetRoute,postPetRouteHandler)
.openapi(getPetFindByStatusRoute,getPetFindByStatusRouteHandler)
.openapi(getPetFindByTagsRoute,getPetFindByTagsRouteHandler)
.openapi(getPetPetIdRoute,getPetPetIdRouteHandler)
.openapi(postPetPetIdRoute,postPetPetIdRouteHandler)
.openapi(deletePetPetIdRoute,deletePetPetIdRouteHandler)
.openapi(postPetPetIdUploadImageRoute,postPetPetIdUploadImageRouteHandler)
.openapi(getStoreInventoryRoute,getStoreInventoryRouteHandler)
.openapi(postStoreOrderRoute,postStoreOrderRouteHandler)
.openapi(getStoreOrderOrderIdRoute,getStoreOrderOrderIdRouteHandler)
.openapi(deleteStoreOrderOrderIdRoute,deleteStoreOrderOrderIdRouteHandler)
.openapi(postUserRoute,postUserRouteHandler)
.openapi(postUserCreateWithListRoute,postUserCreateWithListRouteHandler)
.openapi(getUserLoginRoute,getUserLoginRouteHandler)
.openapi(getUserLogoutRoute,getUserLogoutRouteHandler)
.openapi(getUserUsernameRoute,getUserUsernameRouteHandler)
.openapi(putUserUsernameRoute,putUserUsernameRouteHandler)
.openapi(deleteUserUsernameRoute,deleteUserUsernameRouteHandler)`,
  },
]

describe('generateApplyOpenapiRoutes', () => {
  it.concurrent.each(generateApplyOpenapiRoutesTestCases)(
    'generateApplyOpenapiRoutes($routeMappings) -> $expected',
    ({ routeMappings, expected }) => {
      const result = generateApplyOpenapiRoutes(routeMappings)
      expect(result).toBe(expected)
    },
  )
})
