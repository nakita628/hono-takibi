export const ListOrdersNextPageLink = {
  operationId: 'listOrders',
  parameters: { cursor: '$response.body#/nextCursor' },
}
