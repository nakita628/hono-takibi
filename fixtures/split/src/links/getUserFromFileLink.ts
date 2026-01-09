export const GetUserFromFileLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/owner/id' },
  description: 'Resolve file owner',
}
