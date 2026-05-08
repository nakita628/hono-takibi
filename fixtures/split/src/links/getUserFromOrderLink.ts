export const GetUserFromOrderLinkLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/buyer/id' },
  description: 'Resolve order buyer',
}
