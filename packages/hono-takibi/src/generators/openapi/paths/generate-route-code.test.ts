import { describe, expect, it } from 'vitest'
import { generateRouteCode } from './generate-route-code'
import type { OpenAPIPaths } from '../../../types'
import { petStoreOpenAPI } from '../../../data/pet-store-openapi'
import { honoRestOpenAPI } from '../../../data/hono-rest-openapi'

const generateRouteCodeTestCases: { openAPIPaths: OpenAPIPaths; expected: string }[] = [
  {
    openAPIPaths: petStoreOpenAPI.paths,
    expected: `export const putPetRoute=createRoute({tags:["pet"],method:'put',path:'/pet',description:'Update an existing pet by Id',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:true,content:{'application/json':{schema:petSchema,},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Pet not found',},422:{description:'Validation exception',},}})

export const postPetRoute=createRoute({tags:["pet"],method:'post',path:'/pet',description:'Add a new pet to the store',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:true,content:{'application/json':{schema:petSchema,},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid input',},422:{description:'Validation exception',},}})

export const getPetFindByStatusRoute=createRoute({tags:["pet"],method:'get',path:'/pet/findByStatus',description:'Multiple status values can be provided with comma separated strings',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({status:z.enum(["available","pending","sold"]).optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.array(petSchema),},},},400:{description:'Invalid status value',},}})

export const getPetFindByTagsRoute=createRoute({tags:["pet"],method:'get',path:'/pet/findByTags',description:'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({tags:z.array(z.string()).optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.array(petSchema),},},},400:{description:'Invalid tag value',},}})

export const getPetPetIdRoute=createRoute({tags:["pet"],method:'get',path:'/pet/{petId}',description:'Returns a single pet',security:[{"api_key":[]},{"petstore_auth":["write:pets","read:pets"]}],request:{params:z.object({petId:z.string().pipe(z.coerce.number().int())})},responses:{200:{description:'successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Pet not found',},}})

export const postPetPetIdRoute=createRoute({tags:["pet"],method:'post',path:'/pet/{petId}',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({name:z.string().optional(),status:z.string().optional()}),params:z.object({petId:z.string().pipe(z.coerce.number().int())})},responses:{400:{description:'Invalid input',},}})

export const deletePetPetIdRoute=createRoute({tags:["pet"],method:'delete',path:'/pet/{petId}',description:'delete a pet',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{params:z.object({petId:z.string().pipe(z.coerce.number().int())}),headers:z.object({api_key:z.string().optional()})},responses:{400:{description:'Invalid pet value',},}})

export const postPetPetIdUploadImageRoute=createRoute({tags:["pet"],method:'post',path:'/pet/{petId}/uploadImage',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({additionalMetadata:z.string().optional()}),params:z.object({petId:z.string().pipe(z.coerce.number().int())})},responses:{200:{description:'successful operation',content:{'application/json':{schema:apiResponseSchema,},},},}})

export const getStoreInventoryRoute=createRoute({tags:["store"],method:'get',path:'/store/inventory',description:'Returns a map of status codes to quantities',security:[{"api_key":[]}],responses:{200:{description:'successful operation',content:{'application/json':{schema:z.record(z.string(),z.number().int()),},},},}})

export const postStoreOrderRoute=createRoute({tags:["store"],method:'post',path:'/store/order',description:'Place a new order in the store',request:{body:{required:false,content:{'application/json':{schema:orderSchema,},},},},responses:{200:{description:'successful operation',content:{'application/json':{schema:orderSchema,},},},400:{description:'Invalid input',},422:{description:'Validation exception',},}})

export const getStoreOrderOrderIdRoute=createRoute({tags:["store"],method:'get',path:'/store/order/{orderId}',description:'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',request:{params:z.object({orderId:z.string().pipe(z.coerce.number().int())})},responses:{200:{description:'successful operation',content:{'application/json':{schema:orderSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Order not found',},}})

export const deleteStoreOrderOrderIdRoute=createRoute({tags:["store"],method:'delete',path:'/store/order/{orderId}',description:'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',request:{params:z.object({orderId:z.string().pipe(z.coerce.number().int())})},responses:{400:{description:'Invalid ID supplied',},404:{description:'Order not found',},}})

export const postUserRoute=createRoute({tags:["user"],method:'post',path:'/user',description:'This can only be done by the logged in user.',request:{body:{required:false,content:{'application/json':{schema:userSchema,},},},},responses:{default:{description:'successful operation',content:{'application/json':{schema:userSchema,},},},}})

export const postUserCreateWithListRoute=createRoute({tags:["user"],method:'post',path:'/user/createWithList',description:'Creates list of users with given input array',request:{body:{required:false,content:{'application/json':{schema:z.array(userSchema),},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:userSchema,},},},default:{description:'successful operation',},}})

export const getUserLoginRoute=createRoute({tags:["user"],method:'get',path:'/user/login',request:{query:z.object({username:z.string().optional(),password:z.string().optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.string(),},},},400:{description:'Invalid username/password supplied',},}})

export const getUserLogoutRoute=createRoute({tags:["user"],method:'get',path:'/user/logout',responses:{default:{description:'successful operation',},}})

export const getUserUsernameRoute=createRoute({tags:["user"],method:'get',path:'/user/{username}',request:{params:z.object({username:z.string()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:userSchema,},},},400:{description:'Invalid username supplied',},404:{description:'User not found',},}})

export const putUserUsernameRoute=createRoute({tags:["user"],method:'put',path:'/user/{username}',description:'This can only be done by the logged in user.',request:{body:{required:false,content:{'application/json':{schema:userSchema,},},},params:z.object({username:z.string()})},responses:{default:{description:'successful operation',},}})

export const deleteUserUsernameRoute=createRoute({tags:["user"],method:'delete',path:'/user/{username}',description:'This can only be done by the logged in user.',request:{params:z.object({username:z.string()})},responses:{400:{description:'Invalid username supplied',},404:{description:'User not found',},}})`,
  },
  {
    openAPIPaths: honoRestOpenAPI.paths,
    expected: `export const getRoute=createRoute({tags:["Hono"],method:'get',path:'/',description:'Retrieve a simple welcome message from the Hono API.',responses:{200:{description:'Successful response with a welcome message.',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})}),},},},}})

export const postPostsRoute=createRoute({tags:["Post"],method:'post',path:'/posts',description:'Submit a new post with a maximum length of 140 characters.',request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},},responses:{201:{description:'Post successfully created.',content:{'application/json':{schema:errorSchema,},},},400:{description:'Invalid request due to bad input.',content:{'application/json':{schema:errorSchema,},},},500:{description:'Internal server error.',content:{'application/json':{schema:errorSchema,},},},}})

export const getPostsRoute=createRoute({tags:["Post"],method:'get',path:'/posts',description:'Retrieve a paginated list of posts. Specify the page number and the number of posts per page.',request:{query:z.object({page:z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({example:1})),rows:z.string().pipe(z.coerce.number().int().min(0).default(10).openapi({example:10}))})},responses:{200:{description:'Successfully retrieved a list of posts.',content:{'application/json':{schema:z.array(postSchema),},},},400:{description:'Invalid request due to bad input.',content:{'application/json':{schema:errorSchema,},},},500:{description:'Internal server error.',content:{'application/json':{schema:errorSchema,},},},}})

export const putPostsIdRoute=createRoute({tags:["Post"],method:'put',path:'/posts/{id}',description:'Update the content of an existing post identified by its unique ID.',request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},params:z.object({id:z.string().uuid()})},responses:{204:{description:'Post successfully updated.',},400:{description:'Invalid input.',content:{'application/json':{schema:errorSchema,},},},500:{description:'Internal server error.',content:{'application/json':{schema:errorSchema,},},},}})

export const deletePostsIdRoute=createRoute({tags:["Post"],method:'delete',path:'/posts/{id}',description:'Delete an existing post identified by its unique ID.',request:{params:z.object({id:z.string().uuid()})},responses:{204:{description:'Post successfully deleted.',},400:{description:'Invalid input.',content:{'application/json':{schema:errorSchema,},},},500:{description:'Internal server error.',content:{'application/json':{schema:errorSchema,},},},}})`,
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
