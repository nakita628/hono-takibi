export const ListUsersNextPageLink = {
  operationId: 'listUsers',
  parameters: { cursor: '$response.body#/nextCursor' },
}
