export const GetOrderLinkLink = {
  operationId: 'getOrderById',
  parameters: { orderId: '$response.body#/id' },
}
