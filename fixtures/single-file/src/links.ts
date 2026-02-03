export const GetUserLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/id' },
  description: 'Follow to get the same user',
}

export const GetCompanyLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/id' },
}

export const GetOrderLink = {
  operationId: 'getOrderById',
  parameters: { orderId: '$response.body#/id' },
}

export const ListUsersLink = {
  operationId: 'listUsers',
  description: 'Jump to users list after token',
}

export const ListUsersNextPageLink = {
  operationId: 'listUsers',
  parameters: { cursor: '$response.body#/nextCursor' },
}

export const ListOrdersNextPageLink = {
  operationId: 'listOrders',
  parameters: { cursor: '$response.body#/nextCursor' },
}

export const GetCompanyFromUserLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/company/id' },
  description: "Resolve user's company",
}

export const ListOrdersForUserLink = {
  operationId: 'listOrders',
  parameters: { buyerId: '$response.body#/id' },
  description: 'List orders by user id',
}

export const GetUserFromOrderLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/buyer/id' },
  description: 'Resolve order buyer',
}

export const GetUserFromFileLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/owner/id' },
  description: 'Resolve file owner',
}
