import type { RouteHandler } from '@hono/zod-openapi'
import type {
  putPetRoute,
  postPetRoute,
  getPetFindByStatusRoute,
  getPetFindByTagsRoute,
  getPetPetIdRoute,
  postPetPetIdRoute,
  deletePetPetIdRoute,
  postPetPetIdUploadImageRoute,
} from '../petstore.ts'

export const putPetRouteHandler: RouteHandler<typeof putPetRoute> = async (c) => {}

export const postPetRouteHandler: RouteHandler<typeof postPetRoute> = async (c) => {}

export const getPetFindByStatusRouteHandler: RouteHandler<typeof getPetFindByStatusRoute> = async (
  c,
) => {}

export const getPetFindByTagsRouteHandler: RouteHandler<typeof getPetFindByTagsRoute> = async (
  c,
) => {}

export const getPetPetIdRouteHandler: RouteHandler<typeof getPetPetIdRoute> = async (c) => {}

export const postPetPetIdRouteHandler: RouteHandler<typeof postPetPetIdRoute> = async (c) => {}

export const deletePetPetIdRouteHandler: RouteHandler<typeof deletePetPetIdRoute> = async (c) => {}

export const postPetPetIdUploadImageRouteHandler: RouteHandler<
  typeof postPetPetIdUploadImageRoute
> = async (c) => {}
