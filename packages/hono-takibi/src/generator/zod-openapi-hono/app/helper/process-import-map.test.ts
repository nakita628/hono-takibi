import { describe, it, expect } from 'vitest'
import { processImportMap } from './process-import-map'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/helper/process-import-map.test.ts

const processImportMapTestCases: {
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[]
  output: `${string}.ts`
  expected: { [importPath: string]: string[] }
}[] = [
  {
    routeMappings: [
      { routeName: 'putPetRoute', handlerName: 'putPetRouteHandler', path: '/pet' },
      { routeName: 'postPetRoute', handlerName: 'postPetRouteHandler', path: '/pet' },
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
      { routeName: 'postUserRoute', handlerName: 'postUserRouteHandler', path: '/user' },
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
    output: './pet-store/openapi/pet_store.ts',
    expected: {
      'pet_store.ts': [
        'putPetRoute',
        'postPetRoute',
        'getPetFindByStatusRoute',
        'getPetFindByTagsRoute',
        'getPetPetIdRoute',
        'postPetPetIdRoute',
        'deletePetPetIdRoute',
        'postPetPetIdUploadImageRoute',
        'getStoreInventoryRoute',
        'postStoreOrderRoute',
        'getStoreOrderOrderIdRoute',
        'deleteStoreOrderOrderIdRoute',
        'postUserRoute',
        'postUserCreateWithListRoute',
        'getUserLoginRoute',
        'getUserLogoutRoute',
        'getUserUsernameRoute',
        'putUserUsernameRoute',
        'deleteUserUsernameRoute',
      ],
    },
  },
]

describe('processImportMap', () => {
  it.concurrent.each(processImportMapTestCases)(
    'processImportMap(%j, %s) should return expected import mapping',
    ({ routeMappings, output, expected }) => {
      const result = processImportMap(routeMappings, output)
      expect(result).toEqual(expected)
    },
  )
})
