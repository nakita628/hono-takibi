import { describe, expect, it } from 'vitest'
import { generateAppRouteHandler } from './generate-app-route-handler'

const generateAppRouteHandlerTestCases: {
  routeName: string
  handlerName: string
  expected: string
}[] = [
  {
    routeName: 'putPetRoute',
    handlerName: 'putPetRouteHandler',
    expected: '.openapi(putPetRoute, putPetRouteHandler)',
  },
  {
    routeName: 'postPetRoute',
    handlerName: 'postPetRouteHandler',
    expected: '.openapi(postPetRoute, postPetRouteHandler)',
  },
  {
    routeName: 'getPetFindByStatusRoute',
    handlerName: 'getPetFindByStatusRouteHandler',
    expected: '.openapi(getPetFindByStatusRoute, getPetFindByStatusRouteHandler)',
  },
]

describe('generateAppRouteHandler', () => {
  it.concurrent.each(generateAppRouteHandlerTestCases)(
    'generateAppRouteHandler($routeName, $handlerName) -> $expected',
    ({ routeName, handlerName, expected }) => {
      const result = generateAppRouteHandler(routeName, handlerName)
      console.log(result)
      expect(result).toBe(expected)
    },
  )
})
