export const GetCompanyLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/id' },
}
