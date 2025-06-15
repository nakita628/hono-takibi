import { describe, it, expect } from 'vitest'
import { importRoutes } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/import-routes.test.ts

const importRoutesTestCases = [
  {
    importsMap: {
      'routes/pet-store.ts': [
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
    expected: [
      "import { putPetRoute,postPetRoute,getPetFindByStatusRoute,getPetFindByTagsRoute,getPetPetIdRoute,postPetPetIdRoute,deletePetPetIdRoute,postPetPetIdUploadImageRoute,getStoreInventoryRoute,postStoreOrderRoute,getStoreOrderOrderIdRoute,deleteStoreOrderOrderIdRoute,postUserRoute,postUserCreateWithListRoute,getUserLoginRoute,getUserLogoutRoute,getUserUsernameRoute,putUserUsernameRoute,deleteUserUsernameRoute } from './routes/pet-store.ts';",
    ],
  },
]

describe('generateImportRoutes', () => {
  it.concurrent.each(importRoutesTestCases)(
    'generateImportRoutes($importsMap) -> $expected',
    ({ importsMap, expected }) => {
      const result = importRoutes(importsMap)
      expect(result).toEqual(expected)
    },
  )
})
