export const GetUserLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/id' },
  description: 'Follow to get the same user',
}
