export const GetCompanyFromUserLinkLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/company/id' },
  description: "Resolve user's company",
}
