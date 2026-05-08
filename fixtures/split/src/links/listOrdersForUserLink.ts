export const ListOrdersForUserLinkLink = {
  operationId: 'listOrders',
  parameters: { buyerId: '$response.body#/id' },
  description: 'List orders by user id',
}
