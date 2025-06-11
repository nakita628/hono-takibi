import { describe, expect, it } from 'vitest'
import { generateImportHandlers } from './generate-import-handlers'
import type { Config } from '../../../../config'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/handler/import/generate-import-handlers.test.ts

const generateImportHandlersTestCases: {
  handlerImportsMap: { [fileName: string]: string[] }
  config: Config
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
    config: {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: [
      "import { putPetRouteHandler,postPetRouteHandler,getPetFindByStatusRouteHandler,getPetFindByTagsRouteHandler,getPetPetIdRouteHandler,postPetPetIdRouteHandler,deletePetPetIdRouteHandler,postPetPetIdUploadImageRouteHandler } from 'handler/pet_handler.ts';",
      "import { getStoreInventoryRouteHandler,postStoreOrderRouteHandler,getStoreOrderOrderIdRouteHandler,deleteStoreOrderOrderIdRouteHandler } from 'handler/store_handler.ts';",
      "import { postUserRouteHandler,postUserCreateWithListRouteHandler,getUserLoginRouteHandler,getUserLogoutRouteHandler,getUserUsernameRouteHandler,putUserUsernameRouteHandler,deleteUserUsernameRouteHandler } from 'handler/user_handler.ts';",
    ],
  },
]

describe('generateImportHandlers', () => {
  it.concurrent.each(generateImportHandlersTestCases)(
    'generateImportHandlers($handlerImportsMap, $config) -> $expected',
    ({ handlerImportsMap, config, expected }) => {
      const result = generateImportHandlers(handlerImportsMap, config)
      expect(result).toEqual(expected)
    },
  )
})
