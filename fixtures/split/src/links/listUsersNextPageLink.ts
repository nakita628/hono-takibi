export const ListUsersNextPageLinkLink = {
  operationId: 'listUsers',
  parameters: { cursor: '$response.body#/nextCursor' },
}
