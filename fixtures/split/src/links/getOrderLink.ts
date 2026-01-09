export const GetOrderLink = {
  operationId: 'getOrderById',
  parameters: { orderId: '$response.body#/id' },
}
