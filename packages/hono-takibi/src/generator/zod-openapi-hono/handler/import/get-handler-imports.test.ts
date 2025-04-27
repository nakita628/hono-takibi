import { describe, expect, it } from 'vitest'
import { getHandlerImports } from './get-handler-imports'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/import/get-handler-imports.test.ts

const getHandlerImportsTestCases: {
  handlerMaps: {
    routeName: string
    handlerName: string
    path: string
  }[]
  expected: { [fileName: string]: string[] }
}[] = [
  {
    handlerMaps: [
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
    expected: {
      'pet_handler.ts': [
        'putPetRouteHandler',
        'postPetRouteHandler',
        'getPetFindByStatusRouteHandler',
        'getPetFindByTagsRouteHandler',
        'getPetPetIdRouteHandler',
        'postPetPetIdRouteHandler',
        'deletePetPetIdRouteHandler',
        'postPetPetIdUploadImageRouteHandler',
      ],
      'store_handler.ts': [
        'getStoreInventoryRouteHandler',
        'postStoreOrderRouteHandler',
        'getStoreOrderOrderIdRouteHandler',
        'deleteStoreOrderOrderIdRouteHandler',
      ],
      'user_handler.ts': [
        'postUserRouteHandler',
        'postUserCreateWithListRouteHandler',
        'getUserLoginRouteHandler',
        'getUserLogoutRouteHandler',
        'getUserUsernameRouteHandler',
        'putUserUsernameRouteHandler',
        'deleteUserUsernameRouteHandler',
      ],
    },
  },
]

describe('getHandlerImports', () => {
  it.concurrent.each(getHandlerImportsTestCases)(
    'getHandlerImports($handlerMaps) -> $expected',
    ({ handlerMaps, expected }) => {
      const result = getHandlerImports(handlerMaps)
      expect(result).toEqual(expected)
    },
  )
})
