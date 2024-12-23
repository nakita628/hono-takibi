import { describe, expect, it } from 'vitest'
import { generateRouteCode } from './generate-route-code'
import type { OpenAPIPaths } from '../../../types'
import { petStoreOpenAPI } from '../../../data/pet-store-openapi'

const generateRouteCodeTestCases: { openAPIPaths: OpenAPIPaths; expected: string }[] = [
  {
    openAPIPaths: petStoreOpenAPI.paths,
    expected: `export const putPetRoute=createRoute({tags:["pet"],method:'put',path:'/pet',description:'Update an existing pet by Id',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:true,content:{'application/json':{schema:petSchema,},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Pet not found',},422:{description:'Validation exception',},}})

export const postPetRoute=createRoute({tags:["pet"],method:'post',path:'/pet',description:'Add a new pet to the store',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:true,content:{'application/json':{schema:petSchema,},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid input',},422:{description:'Validation exception',},}})

export const getPetFindByStatusRoute=createRoute({tags:["pet"],method:'get',path:'/pet/findByStatus',description:'Multiple status values can be provided with comma separated strings',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({status:z.enum(["available","pending","sold"]).optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.array(petSchema),},},},400:{description:'Invalid status value',},}})

export const getPetFindByTagsRoute=createRoute({tags:["pet"],method:'get',path:'/pet/findByTags',description:'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({tags:z.array(z.string()).optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.array(petSchema),},},},400:{description:'Invalid tag value',},}})

export const getPetPetIdRoute=createRoute({tags:["pet"],method:'get',path:'/pet/{petId}',description:'Returns a single pet',security:[{"api_key":[]},{"petstore_auth":["write:pets","read:pets"]}],request:{params:z.object({petId:z.number().int()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Pet not found',},}})

export const postPetPetIdRoute=createRoute({tags:["pet"],method:'post',path:'/pet/{petId}',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({name:z.string().optional(),status:z.string().optional()}),params:z.object({petId:z.number().int()})},responses:{400:{description:'Invalid input',},}})

export const deletePetPetIdRoute=createRoute({tags:["pet"],method:'delete',path:'/pet/{petId}',description:'delete a pet',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{params:z.object({petId:z.number().int()}),headers:z.object({api_key:z.string().optional()})},responses:{400:{description:'Invalid pet value',},}})

export const postPetPetIdUploadImageRoute=createRoute({tags:["pet"],method:'post',path:'/pet/{petId}/uploadImage',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({additionalMetadata:z.string().optional()}),params:z.object({petId:z.number().int()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:apiResponseSchema,},},},}})

export const getStoreInventoryRoute=createRoute({tags:["store"],method:'get',path:'/store/inventory',description:'Returns a map of status codes to quantities',security:[{"api_key":[]}],responses:{200:{description:'successful operation',content:{'application/json':{schema:z.record(z.string(), z.number().int()),},},},}})

export const postStoreOrderRoute=createRoute({tags:["store"],method:'post',path:'/store/order',description:'Place a new order in the store',request:{body:{required:false,content:{'application/json':{schema:orderSchema,},},},},responses:{200:{description:'successful operation',content:{'application/json':{schema:orderSchema,},},},400:{description:'Invalid input',},422:{description:'Validation exception',},}})

export const getStoreOrderOrderIdRoute=createRoute({tags:["store"],method:'get',path:'/store/order/{orderId}',description:'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',request:{params:z.object({orderId:z.number().int()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:orderSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Order not found',},}})

export const deleteStoreOrderOrderIdRoute=createRoute({tags:["store"],method:'delete',path:'/store/order/{orderId}',description:'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',request:{params:z.object({orderId:z.number().int()})},responses:{400:{description:'Invalid ID supplied',},404:{description:'Order not found',},}})

export const postUserRoute=createRoute({tags:["user"],method:'post',path:'/user',description:'This can only be done by the logged in user.',request:{body:{required:false,content:{'application/json':{schema:userSchema,},},},},responses:{default:{description:'successful operation',content:{'application/json':{schema:userSchema,},},},}})

export const postUserCreateWithListRoute=createRoute({tags:["user"],method:'post',path:'/user/createWithList',description:'Creates list of users with given input array',request:{body:{required:false,content:{'application/json':{schema:z.array(userSchema),},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:userSchema,},},},default:{description:'successful operation',},}})

export const getUserLoginRoute=createRoute({tags:["user"],method:'get',path:'/user/login',request:{query:z.object({username:z.string().optional(),password:z.string().optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.string(),},},},400:{description:'Invalid username/password supplied',},}})

export const getUserLogoutRoute=createRoute({tags:["user"],method:'get',path:'/user/logout',responses:{default:{description:'successful operation',},}})

export const getUserUsernameRoute=createRoute({tags:["user"],method:'get',path:'/user/{username}',request:{params:z.object({username:z.string()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:userSchema,},},},400:{description:'Invalid username supplied',},404:{description:'User not found',},}})

export const putUserUsernameRoute=createRoute({tags:["user"],method:'put',path:'/user/{username}',description:'This can only be done by the logged in user.',request:{body:{required:false,content:{'application/json':{schema:userSchema,},},},params:z.object({username:z.string()})},responses:{default:{description:'successful operation',},}})

export const deleteUserUsernameRoute=createRoute({tags:["user"],method:'delete',path:'/user/{username}',description:'This can only be done by the logged in user.',request:{params:z.object({username:z.string()})},responses:{400:{description:'Invalid username supplied',},404:{description:'User not found',},}})`,
  },
]

describe('generateRouteCode', () => {
  it.concurrent.each(generateRouteCodeTestCases)(
    'generateRouteCode($openAPIPaths) -> $expected',
    async ({ openAPIPaths, expected }) => {
      const result = generateRouteCode(openAPIPaths)
      expect(result).toBe(expected)
    },
  )
})
