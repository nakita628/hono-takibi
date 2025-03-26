import { createRoute, z } from '@hono/zod-openapi'

const SantaStatusSchema = z
  .object({
    location: z.string().openapi({ example: 'En route to Chicago' }),
    status: z.string().openapi({ example: 'delivering' }),
    lastUpdate: z.string().datetime().openapi({ example: '2025-12-24T22:00:00Z' }),
  })
  .openapi('SantaStatus')

const DeliverySchema = z
  .object({
    id: z.string().openapi({ example: 'delivery-001' }),
    recipient: z.string().openapi({ example: 'John Doe' }),
    address: z.string().openapi({ example: '123 Candy Cane Lane, North Pole' }),
    present: z.string().openapi({ example: 'Toy Train Set' }),
    status: z.string().openapi({ example: 'scheduled' }),
    scheduledTime: z.string().datetime().openapi({ example: '2025-12-25T08:00:00Z' }),
  })
  .openapi('Delivery')

const DeliveryRequestSchema = z
  .object({
    recipient: z.string().openapi({ example: 'John Doe' }),
    address: z.string().openapi({ example: '123 Candy Cane Lane, North Pole' }),
    present: z.string().openapi({ example: 'Toy Train Set' }),
    scheduledTime: z.string().datetime().openapi({ example: '2025-12-25T08:00:00Z' }),
  })
  .openapi('DeliveryRequest')

const DeliveryUpdateSchema = z
  .object({
    address: z.string().openapi({ example: '456 Reindeer Road, North Pole' }),
    scheduledTime: z.string().datetime().openapi({ example: '2025-12-25T09:00:00Z' }),
  })
  .openapi('DeliveryUpdate')

export const getSantaStatusRoute = createRoute({
  method: 'get',
  path: '/santa/status',
  operationId: 'undefined',
  summary: "Get Santa's Current Status",
  description: "Retrieve Santa's current location and status during his Christmas journey.",
  responses: {
    200: {
      description: "Santa's current status information.",
      content: { 'application/json': { schema: SantaStatusSchema } },
    },
  },
})

export const getSantaDeliveriesRoute = createRoute({
  method: 'get',
  path: '/santa/deliveries',
  operationId: 'undefined',
  summary: 'List Scheduled Deliveries',
  description: 'Retrieve a list of all scheduled Christmas present deliveries.',
  responses: {
    200: {
      description: 'A list of scheduled deliveries.',
      content: { 'application/json': { schema: z.array(DeliverySchema) } },
    },
  },
})

export const postSantaDeliveriesRoute = createRoute({
  method: 'post',
  path: '/santa/deliveries',
  operationId: 'undefined',
  summary: 'Schedule a New Delivery',
  description: 'Request Santa to deliver a Christmas present by scheduling a delivery.',
  request: {
    body: { required: true, content: { 'application/json': { schema: DeliveryRequestSchema } } },
  },
  responses: {
    201: {
      description: 'Delivery scheduled successfully.',
      content: { 'application/json': { schema: DeliverySchema } },
    },
  },
})

export const getSantaDeliveriesDeliveryIdRoute = createRoute({
  method: 'get',
  path: '/santa/deliveries/{deliveryId}',
  operationId: 'undefined',
  summary: 'Get Delivery Details',
  description: 'Retrieve detailed information about a specific delivery using its ID.',
  request: { params: z.object({ deliveryId: z.string() }) },
  responses: {
    200: {
      description: 'Delivery details retrieved successfully.',
      content: { 'application/json': { schema: DeliverySchema } },
    },
    404: { description: 'Delivery not found.' },
  },
})

export const putSantaDeliveriesDeliveryIdRoute = createRoute({
  method: 'put',
  path: '/santa/deliveries/{deliveryId}',
  operationId: 'undefined',
  summary: 'Update Delivery Information',
  description: 'Update details of an existing delivery (e.g., change address or scheduled time).',
  request: {
    body: { required: true, content: { 'application/json': { schema: DeliveryUpdateSchema } } },
    params: z.object({ deliveryId: z.string() }),
  },
  responses: {
    200: {
      description: 'Delivery updated successfully.',
      content: { 'application/json': { schema: DeliverySchema } },
    },
    404: { description: 'Delivery not found.' },
  },
})

export const deleteSantaDeliveriesDeliveryIdRoute = createRoute({
  method: 'delete',
  path: '/santa/deliveries/{deliveryId}',
  operationId: 'undefined',
  summary: 'Cancel a Delivery',
  description: 'Cancel an existing delivery request.',
  request: { params: z.object({ deliveryId: z.string() }) },
  responses: {
    204: { description: 'Delivery canceled successfully. No content returned.' },
    404: { description: 'Delivery not found.' },
  },
})
