import type { InferRequestType } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export async function getEntities() {
  return await client.entities.$get()
}

/**
 * POST /process
 */
export async function postProcess(arg: InferRequestType<typeof client.process.$post>) {
  return await client.process.$post(arg)
}

/**
 * GET /graph
 */
export async function getGraph() {
  return await client.graph.$get()
}

/**
 * POST /transform
 */
export async function postTransform(arg: InferRequestType<typeof client.transform.$post>) {
  return await client.transform.$post(arg)
}
