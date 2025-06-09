import { createRoute, z } from '@hono/zod-openapi'

const SantaStatusSchema = z
  .object({
    location: z.string().openapi({
      description: 'Current location of Santa (e.g., "North Pole", "En route to Chicago").',
      example: 'En route to Chicago',
    }),
    status: z.string().openapi({
      description: 'Current status (e.g., "delivering", "resting", "in transit").',
      example: 'delivering',
    }),
    lastUpdate: z.string().datetime().openapi({
      description: 'Timestamp of the last status update.',
      example: '2025-12-24T22:00:00Z',
    }),
  })
  .openapi('SantaStatus')

const DeliverySchema = z
  .object({
    id: z
      .string()
      .openapi({ description: 'Unique identifier for the delivery.', example: 'delivery-001' }),
    recipient: z.string().openapi({ description: 'Name of the recipient.', example: 'John Doe' }),
    address: z
      .string()
      .openapi({ description: 'Delivery address.', example: '123 Candy Cane Lane, North Pole' }),
    present: z
      .string()
      .openapi({ description: 'Description of the Christmas present.', example: 'Toy Train Set' }),
    status: z.string().openapi({
      description: 'Delivery status (e.g., "scheduled", "in progress", "delivered", "canceled").',
      example: 'scheduled',
    }),
    scheduledTime: z.string().datetime().openapi({
      description: 'Scheduled time for the delivery.',
      example: '2025-12-25T08:00:00Z',
    }),
  })
  .openapi('Delivery')

const DeliveryRequestSchema = z
  .object({
    recipient: z.string().openapi({ description: 'Name of the recipient.', example: 'John Doe' }),
    address: z
      .string()
      .openapi({ description: 'Delivery address.', example: '123 Candy Cane Lane, North Pole' }),
    present: z
      .string()
      .openapi({ description: 'Description of the Christmas present.', example: 'Toy Train Set' }),
    scheduledTime: z
      .string()
      .datetime()
      .openapi({ description: 'Requested delivery time.', example: '2025-12-25T08:00:00Z' }),
  })
  .openapi('DeliveryRequest')

const DeliveryUpdateSchema = z
  .object({
    address: z.string().openapi({
      description: 'Updated delivery address.',
      example: '456 Reindeer Road, North Pole',
    }),
    scheduledTime: z.string().datetime().openapi({
      description: 'Updated scheduled delivery time.',
      example: '2025-12-25T09:00:00Z',
    }),
  })
  .openapi('DeliveryUpdate')

export const getSantaStatusRoute = createRoute({
  method: 'get',
  path: '/santa/status',
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
  summary: 'Get Delivery Details',
  description: 'Retrieve detailed information about a specific delivery using its ID.',
  request: {
    params: z.object({
      deliveryId: z.string().openapi({ param: { in: 'path', name: 'deliveryId' } }),
    }),
  },
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
  summary: 'Update Delivery Information',
  description: 'Update details of an existing delivery (e.g., change address or scheduled time).',
  request: {
    body: { required: true, content: { 'application/json': { schema: DeliveryUpdateSchema } } },
    params: z.object({
      deliveryId: z.string().openapi({ param: { in: 'path', name: 'deliveryId' } }),
    }),
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
  summary: 'Cancel a Delivery',
  description: 'Cancel an existing delivery request.',
  request: {
    params: z.object({
      deliveryId: z.string().openapi({ param: { in: 'path', name: 'deliveryId' } }),
    }),
  },
  responses: {
    204: { description: 'Delivery canceled successfully. No content returned.' },
    404: { description: 'Delivery not found.' },
  },
})
