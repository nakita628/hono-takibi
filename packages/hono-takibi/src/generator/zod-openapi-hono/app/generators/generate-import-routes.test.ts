import { describe, expect, it } from 'vitest'
import { generateImportRoutes } from './generate-import-routes'

const generateImportRoutesTestCases = [
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
  it.concurrent.each(generateImportRoutesTestCases)(
    'generateImportRoutes($importsMap) -> $expected',
    ({ importsMap, expected }) => {
      const result = generateImportRoutes(importsMap)
      expect(result).toEqual(expected)
    },
  )
})
