export const ListOrdersNextPageLinkLink = {
  operationId: 'listOrders',
  parameters: { cursor: '$response.body#/nextCursor' },
}
