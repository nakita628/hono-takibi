import { describe, expect, it } from 'vitest'
import { importHandlers } from './import-handlers'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/generators/generate-import-handlers.test.ts

const generateImportHandlersTestCases: {
  handlerImportsMap: { [fileName: string]: string[] }
  expected: string[]
}[] = [
  {
    handlerImportsMap: {
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
    expected: [
      "import { putPetRouteHandler,postPetRouteHandler,getPetFindByStatusRouteHandler,getPetFindByTagsRouteHandler,getPetPetIdRouteHandler,postPetPetIdRouteHandler,deletePetPetIdRouteHandler,postPetPetIdUploadImageRouteHandler } from 'handler/pet_handler.ts';",
      "import { getStoreInventoryRouteHandler,postStoreOrderRouteHandler,getStoreOrderOrderIdRouteHandler,deleteStoreOrderOrderIdRouteHandler } from 'handler/store_handler.ts';",
      "import { postUserRouteHandler,postUserCreateWithListRouteHandler,getUserLoginRouteHandler,getUserLogoutRouteHandler,getUserUsernameRouteHandler,putUserUsernameRouteHandler,deleteUserUsernameRouteHandler } from 'handler/user_handler.ts';",
    ],
  },
]

describe('importHandlers', () => {
  it.concurrent.each(generateImportHandlersTestCases)(
    'importHandlers($handlerImportsMap, $config) -> $expected',
    ({ handlerImportsMap, expected }) => {
      const result = importHandlers(handlerImportsMap)
      expect(result).toEqual(expected)
    },
  )
})
