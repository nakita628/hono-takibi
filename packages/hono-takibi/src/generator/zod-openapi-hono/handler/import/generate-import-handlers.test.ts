import type { Config } from '../../../../config'
import { DEFAULT_CONFIG } from '../../../../config'
import { describe, expect, it } from 'vitest'
import { generateImportHandlers } from './generate-import-handlers'

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
    config: { ...DEFAULT_CONFIG },
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
