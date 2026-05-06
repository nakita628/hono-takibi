export const GetCompanyLinkLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/id' },
}
