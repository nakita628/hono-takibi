import { describe, expect, it } from 'vitest'
import { petStoreOpenAPI } from '../../data/pet-store-openapi'
import { generateZodOpenAPIHono } from './generate-zod-openapi-hono'

const generateZodOpenAPIHonoTestCases = [
  {
    openAPISpec: petStoreOpenAPI,
    expected: `import { createRoute, z } from '@hono/zod-openapi';

const orderSchema = z.object({id:z.number().int().openapi({example:10}).optional(),petId:z.number().int().openapi({example:198772}).optional(),quantity:z.number().int().openapi({example:7}).optional(),shipDate:z.string().datetime().optional(),status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}).optional(),complete:z.boolean().optional()})

const addressSchema = z.object({street:z.string().openapi({example:"437 Lytton"}).optional(),city:z.string().openapi({example:"Palo Alto"}).optional(),state:z.string().openapi({example:"CA"}).optional(),zip:z.string().openapi({example:"94301"}).optional()})

const customerSchema = z.object({id:z.number().int().openapi({example:100000}).optional(),username:z.string().openapi({example:"fehguy"}).optional(),address:z.array(addressSchema).optional()})

const categorySchema = z.object({id:z.number().int().openapi({example:1}).optional(),name:z.string().openapi({example:"Dogs"}).optional()})

const userSchema = z.object({id:z.number().int().openapi({example:10}).optional(),username:z.string().openapi({example:"theUser"}).optional(),firstName:z.string().openapi({example:"John"}).optional(),lastName:z.string().openapi({example:"James"}).optional(),email:z.string().openapi({example:"john@email.com"}).optional(),password:z.string().openapi({example:"12345"}).optional(),phone:z.string().openapi({example:"12345"}).optional(),userStatus:z.number().int().openapi({example:1}).optional()})

const tagSchema = z.object({id:z.number().int().optional(),name:z.string().optional()})

const petSchema = z.object({id:z.number().int().openapi({example:10}).optional(),name:z.string().openapi({example:"doggie"}),category:categorySchema.optional(),photoUrls:z.array(z.string()),tags:z.array(tagSchema).optional(),status:z.enum(["available","pending","sold"]).optional()})

const apiResponseSchema = z.object({code:z.number().int().optional(),type:z.string().optional(),message:z.string().optional()})

export const schemas = {
orderSchema,
addressSchema,
customerSchema,
categorySchema,
userSchema,
tagSchema,
petSchema,
apiResponseSchema
}

export const putPetRoute=createRoute({tags:["pet"],method:'put',path:'/pet',description:'Update an existing pet by Id',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:true,content:{'application/json':{schema:petSchema,},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Pet not found',},422:{description:'Validation exception',},}})

export const postPetRoute=createRoute({tags:["pet"],method:'post',path:'/pet',description:'Add a new pet to the store',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:true,content:{'application/json':{schema:petSchema,},},},},responses:{200:{description:'Successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid input',},422:{description:'Validation exception',},}})

export const getPetFindByStatusRoute=createRoute({tags:["pet"],method:'get',path:'/pet/findByStatus',description:'Multiple status values can be provided with comma separated strings',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({status:z.enum(["available","pending","sold"]).optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.array(petSchema),},},},400:{description:'Invalid status value',},}})

export const getPetFindByTagsRoute=createRoute({tags:["pet"],method:'get',path:'/pet/findByTags',description:'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({tags:z.array(z.string()).optional()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:z.array(petSchema),},},},400:{description:'Invalid tag value',},}})

export const getPetPetIdRoute=createRoute({tags:["pet"],method:'get',path:'/pet/{petId}',description:'Returns a single pet',security:[{"api_key":[]},{"petstore_auth":["write:pets","read:pets"]}],request:{params:z.object({petId:z.number().int()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:petSchema,},},},400:{description:'Invalid ID supplied',},404:{description:'Pet not found',},}})

export const postPetPetIdRoute=createRoute({tags:["pet"],method:'post',path:'/pet/{petId}',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{query:z.object({name:z.string().optional(),status:z.string().optional()}),params:z.object({petId:z.number().int()})},responses:{400:{description:'Invalid input',},}})

export const deletePetPetIdRoute=createRoute({tags:["pet"],method:'delete',path:'/pet/{petId}',description:'delete a pet',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{params:z.object({petId:z.number().int()}),headers:z.object({api_key:z.string().optional()})},responses:{400:{description:'Invalid pet value',},}})

export const postPetPetIdUploadImageRoute=createRoute({tags:["pet"],method:'post',path:'/pet/{petId}/uploadImage',security:[{"petstore_auth":["write:pets","read:pets"]}],request:{body:{required:false,content:{'application/octet-stream':{schema:z.string(),},},},query:z.object({additionalMetadata:z.string().optional()}),params:z.object({petId:z.number().int()})},responses:{200:{description:'successful operation',content:{'application/json':{schema:apiResponseSchema,},},},}})

export const getStoreInventoryRoute=createRoute({tags:["store"],method:'get',path:'/store/inventory',description:'Returns a map of status codes to quantities',security:[{"api_key":[]}],responses:{200:{description:'successful operation',content:{'application/json':{schema:z.record(z.string(),z.number().int()),},},},}})

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

describe('generateZodOpenAPIHono', () => {
  it.concurrent.each(generateZodOpenAPIHonoTestCases)(
    'generateZodOpenAPIHono($openAPISpec) -> $expected',
    async ({ openAPISpec, expected }) => {
      const result = generateZodOpenAPIHono(openAPISpec)
      expect(result).toBe(expected)
    },
  )
})
