export const GetUserLinkLink = {
  operationId: 'getUserById',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created user',
}
