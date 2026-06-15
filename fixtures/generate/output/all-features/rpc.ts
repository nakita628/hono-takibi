import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getMinimalHealth(options?: ClientRequestOptions) {
  return await client.minimal.health.$get(undefined, options)
}

export async function getAllExportsUsers(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.allExports.users.$get(args, options)
}

export async function postAllExportsUsers(
  args: InferRequestType<typeof client.allExports.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.allExports.users.$post(args, options)
}

export async function getAllExportsUsersId(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.allExports.users[':id'].$get(args, options)
}

export async function getCircularRefsTree(options?: ClientRequestOptions) {
  return await client.circularRefs.tree.$get(undefined, options)
}

export async function postCircularRefsTree(
  args: InferRequestType<typeof client.circularRefs.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await client.circularRefs.tree.$post(args, options)
}

export async function getCircularRefsGraph(options?: ClientRequestOptions) {
  return await client.circularRefs.graph.$get(undefined, options)
}

export async function getSecuritySchemesPublic(options?: ClientRequestOptions) {
  return await client.securitySchemes.public.$get(undefined, options)
}

export async function getSecuritySchemesBearerProtected(options?: ClientRequestOptions) {
  return await client.securitySchemes['bearer-protected'].$get(undefined, options)
}

export async function getSecuritySchemesApiKeyProtected(options?: ClientRequestOptions) {
  return await client.securitySchemes['api-key-protected'].$get(undefined, options)
}

export async function getSecuritySchemesBasicProtected(options?: ClientRequestOptions) {
  return await client.securitySchemes['basic-protected'].$get(undefined, options)
}

export async function getSecuritySchemesOauthProtected(options?: ClientRequestOptions) {
  return await client.securitySchemes['oauth-protected'].$get(undefined, options)
}

export async function getSecuritySchemesMultiAuth(options?: ClientRequestOptions) {
  return await client.securitySchemes['multi-auth'].$get(undefined, options)
}

export async function postContentTypesJson(
  args: InferRequestType<typeof client.contentTypes.json.$post>,
  options?: ClientRequestOptions,
) {
  return await client.contentTypes.json.$post(args, options)
}

export async function postContentTypesForm(
  args: InferRequestType<typeof client.contentTypes.form.$post>,
  options?: ClientRequestOptions,
) {
  return await client.contentTypes.form.$post(args, options)
}

export async function postContentTypesUpload(
  args: InferRequestType<typeof client.contentTypes.upload.$post>,
  options?: ClientRequestOptions,
) {
  return await client.contentTypes.upload.$post(args, options)
}

export async function postContentTypesText(
  args: InferRequestType<typeof client.contentTypes.text.$post>,
  options?: ClientRequestOptions,
) {
  return await client.contentTypes.text.$post(args, options)
}

export async function postContentTypesMultiContent(
  args: InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.contentTypes['multi-content'].$post(args, options)
}

export async function getParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.parametersMerge.items[':itemId'].$get(args, options)
}

export async function putParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.parametersMerge.items[':itemId'].$put(args, options)
}

export async function deleteParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.parametersMerge.items[':itemId'].$delete(args, options)
}

export async function getParametersMergeItems(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.parametersMerge.items.$get(args, options)
}

export async function postSchemaEdgeCasesNullable(
  args: InferRequestType<typeof client.schemaEdgeCases.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await client.schemaEdgeCases.nullable.$post(args, options)
}

export async function postSchemaEdgeCasesDiscriminated(
  args: InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await client.schemaEdgeCases.discriminated.$post(args, options)
}

export async function getSchemaEdgeCasesComposed(options?: ClientRequestOptions) {
  return await client.schemaEdgeCases.composed.$get(undefined, options)
}

export async function getSchemaEdgeCasesDeepNested(options?: ClientRequestOptions) {
  return await client.schemaEdgeCases['deep-nested'].$get(undefined, options)
}

export async function getSchemaEdgeCasesAdditionalProps(options?: ClientRequestOptions) {
  return await client.schemaEdgeCases['additional-props'].$get(undefined, options)
}

export async function postCallbacksLinksSubscriptions(
  args: InferRequestType<typeof client.callbacksLinks.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await client.callbacksLinks.subscriptions.$post(args, options)
}

export async function getCallbacksLinksSubscriptionsId(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.callbacksLinks.subscriptions[':id'].$get(args, options)
}

export async function deleteCallbacksLinksSubscriptionsId(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.callbacksLinks.subscriptions[':id'].$delete(args, options)
}

export async function postCallbacksLinksWebhooksTest(
  args: InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await client.callbacksLinks.webhooks.test.$post(args, options)
}

export async function getCrudRefsPosts(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts.$get(args, options)
}

export async function postCrudRefsPosts(
  args: InferRequestType<typeof client.crudRefs.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts.$post(args, options)
}

export async function getCrudRefsPostsId(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts[':id'].$get(args, options)
}

export async function putCrudRefsPostsId(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts[':id'].$put(args, options)
}

export async function deleteCrudRefsPostsId(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts[':id'].$delete(args, options)
}

export async function getCrudRefsPostsIdComments(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts[':id'].comments.$get(args, options)
}

export async function postCrudRefsPostsIdComments(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.crudRefs.posts[':id'].comments.$post(args, options)
}

export async function getCrudRefsTags(options?: ClientRequestOptions) {
  return await client.crudRefs.tags.$get(undefined, options)
}

export async function getComprehensiveUsers(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.users.$get(args, options)
}

export async function postComprehensiveUsers(
  args: InferRequestType<typeof client.comprehensive.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.users.$post(args, options)
}

export async function getComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.users[':userId'].$get(args, options)
}

export async function putComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.users[':userId'].$put(args, options)
}

export async function deleteComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.users[':userId'].$delete(args, options)
}

export async function getComprehensiveProducts(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.products.$get(args, options)
}

export async function postComprehensiveProducts(
  args: InferRequestType<typeof client.comprehensive.products.$post>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.products.$post(args, options)
}

export async function getComprehensiveProductsProductId(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.products[':productId'].$get(args, options)
}

export async function putComprehensiveProductsProductId(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.products[':productId'].$put(args, options)
}

export async function getComprehensiveProductsProductIdReviews(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.products[':productId'].reviews.$get(args, options)
}

export async function postComprehensiveProductsProductIdReviews(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.products[':productId'].reviews.$post(args, options)
}

export async function getComprehensiveOrders(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.orders.$get(args, options)
}

export async function postComprehensiveOrders(
  args: InferRequestType<typeof client.comprehensive.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.orders.$post(args, options)
}

export async function getComprehensiveOrdersOrderId(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.orders[':orderId'].$get(args, options)
}

export async function getComprehensiveCategories(options?: ClientRequestOptions) {
  return await client.comprehensive.categories.$get(undefined, options)
}

export async function postComprehensiveUploadImage(
  args: InferRequestType<typeof client.comprehensive.upload.image.$post>,
  options?: ClientRequestOptions,
) {
  return await client.comprehensive.upload.image.$post(args, options)
}

export async function postCompositionKeywordsOneOf(
  args: InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.compositionKeywords['one-of'].$post(args, options)
}

export async function postCompositionKeywordsAnyOf(
  args: InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.compositionKeywords['any-of'].$post(args, options)
}

export async function postCompositionKeywordsAllOf(
  args: InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.compositionKeywords['all-of'].$post(args, options)
}

export async function postCompositionKeywordsNot(
  args: InferRequestType<typeof client.compositionKeywords.not.$post>,
  options?: ClientRequestOptions,
) {
  return await client.compositionKeywords.not.$post(args, options)
}

export async function getCompositionKeywordsNotRef(options?: ClientRequestOptions) {
  return await client.compositionKeywords['not-ref'].$get(undefined, options)
}

export async function getCompositionKeywordsNotEnum(options?: ClientRequestOptions) {
  return await client.compositionKeywords['not-enum'].$get(undefined, options)
}

export async function getCompositionKeywordsNotConst(options?: ClientRequestOptions) {
  return await client.compositionKeywords['not-const'].$get(undefined, options)
}

export async function getCompositionKeywordsNotComposition(options?: ClientRequestOptions) {
  return await client.compositionKeywords['not-composition'].$get(undefined, options)
}

export async function getCompositionKeywordsAllOfSibling(options?: ClientRequestOptions) {
  return await client.compositionKeywords['all-of-sibling'].$get(undefined, options)
}

export async function getCompositionKeywordsNullableOneOf(options?: ClientRequestOptions) {
  return await client.compositionKeywords['nullable-one-of'].$get(undefined, options)
}

export async function getCompositionKeywordsAnyOfThree(options?: ClientRequestOptions) {
  return await client.compositionKeywords['any-of-three'].$get(undefined, options)
}

export async function getCompositionKeywordsAnyOfRef(options?: ClientRequestOptions) {
  return await client.compositionKeywords['any-of-ref'].$get(undefined, options)
}

export async function postCallbacksFieldOrders(
  args: InferRequestType<typeof client.callbacksField.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await client.callbacksField.orders.$post(args, options)
}

export async function postCallbacksFieldPayments(
  args: InferRequestType<typeof client.callbacksField.payments.$post>,
  options?: ClientRequestOptions,
) {
  return await client.callbacksField.payments.$post(args, options)
}

export async function getCallbacksFieldItems(options?: ClientRequestOptions) {
  return await client.callbacksField.items.$get(undefined, options)
}

export async function getArrayObjectConstraintsTags(options?: ClientRequestOptions) {
  return await client.arrayObjectConstraints.tags.$get(undefined, options)
}

export async function postArrayObjectConstraintsTags(
  args: InferRequestType<typeof client.arrayObjectConstraints.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await client.arrayObjectConstraints.tags.$post(args, options)
}

export async function getArrayObjectConstraintsSettings(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: ClientRequestOptions,
) {
  return await client.arrayObjectConstraints.settings.$get(args, options)
}

export async function putArrayObjectConstraintsSettings(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await client.arrayObjectConstraints.settings.$put(args, options)
}

export async function postArrayObjectConstraintsConfig(
  args: InferRequestType<typeof client.arrayObjectConstraints.config.$post>,
  options?: ClientRequestOptions,
) {
  return await client.arrayObjectConstraints.config.$post(args, options)
}

export async function postArrayObjectConstraintsPayment(
  args: InferRequestType<typeof client.arrayObjectConstraints.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await client.arrayObjectConstraints.payment.$post(args, options)
}

export async function getTrailingSlashApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await client.trailingSlash.api.reverseChiban.index.$get(undefined, options)
}

export async function getTrailingSlashApiReverseChiban(options?: ClientRequestOptions) {
  return await client.trailingSlash.api.reverseChiban.$get(undefined, options)
}

export async function getTrailingSlashPostsIndex(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await client.trailingSlash.posts.index.$get(args, options)
}

export async function postTrailingSlashPostsIndex(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await client.trailingSlash.posts.index.$post(args, options)
}

export async function getTrailingSlashUsersIdIndex(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.trailingSlash.users[':id'].index.$get(args, options)
}

export async function getTrailingSlashItemsIndex(options?: ClientRequestOptions) {
  return await client.trailingSlash.items.index.$get(undefined, options)
}

export async function getReadonlyRefUsers(options?: ClientRequestOptions) {
  return await client.readonlyRef.users.$get(undefined, options)
}

export async function postReadonlyRefUsers(
  args: InferRequestType<typeof client.readonlyRef.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.readonlyRef.users.$post(args, options)
}

export async function getReadonlyRefUsersId(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.readonlyRef.users[':id'].$get(args, options)
}

export async function putReadonlyRefUsersId(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.readonlyRef.users[':id'].$put(args, options)
}

export async function getReadonlyRefItems(options?: ClientRequestOptions) {
  return await client.readonlyRef.items.$get(undefined, options)
}

export async function getTrailingSlashRealApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return await client.trailingSlashReal.api.reverseGeocode.index.$get(args, options)
}

export async function postTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndex(
  args: InferRequestType<
    typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
  >,
  options?: ClientRequestOptions,
) {
  return await client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post(
    args,
    options,
  )
}

export async function postTrailingSlashRealApiV2PublicBookingAccountRegisterEmail(
  args: InferRequestType<
    typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
  >,
  options?: ClientRequestOptions,
) {
  return await client.trailingSlashReal.api.v2.public.booking.account.register.email.$post(
    args,
    options,
  )
}

export async function postDefaultResponseItems(
  args: InferRequestType<typeof client.defaultResponse.items.$post>,
  options?: ClientRequestOptions,
) {
  return await client.defaultResponse.items.$post(args, options)
}

export async function getDefaultResponsePing(options?: ClientRequestOptions) {
  return await client.defaultResponse.ping.$get(undefined, options)
}

export async function postComplexSchemasExpressions(
  args: InferRequestType<typeof client.complexSchemas.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await client.complexSchemas.expressions.$post(args, options)
}

export async function postComplexSchemasShapes(
  args: InferRequestType<typeof client.complexSchemas.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await client.complexSchemas.shapes.$post(args, options)
}

export async function postComplexSchemasDocuments(
  args: InferRequestType<typeof client.complexSchemas.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await client.complexSchemas.documents.$post(args, options)
}

export async function postComplexSchemasConfigs(
  args: InferRequestType<typeof client.complexSchemas.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await client.complexSchemas.configs.$post(args, options)
}

export async function getComplexSchemasNullableUnion(options?: ClientRequestOptions) {
  return await client.complexSchemas['nullable-union'].$get(undefined, options)
}

export async function getComplexSchemasNestedCircular(options?: ClientRequestOptions) {
  return await client.complexSchemas['nested-circular'].$get(undefined, options)
}

export async function postVendorExtensionsUsers(
  args: InferRequestType<typeof client.vendorExtensions.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.users.$post(args, options)
}

export async function getVendorExtensionsUsersUserId(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.users[':userId'].$get(args, options)
}

export async function postVendorExtensionsPosts(
  args: InferRequestType<typeof client.vendorExtensions.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.posts.$post(args, options)
}

export async function postVendorExtensionsTransforms(
  args: InferRequestType<typeof client.vendorExtensions.transforms.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.transforms.$post(args, options)
}

export async function postVendorExtensionsCoerce(
  args: InferRequestType<typeof client.vendorExtensions.coerce.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.coerce.$post(args, options)
}

export async function postVendorExtensionsReplacements(
  args: InferRequestType<typeof client.vendorExtensions.replacements.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.replacements.$post(args, options)
}

export async function postVendorExtensionsFormats(
  args: InferRequestType<typeof client.vendorExtensions.formats.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.formats.$post(args, options)
}

export async function postVendorExtensionsCustom(
  args: InferRequestType<typeof client.vendorExtensions.custom.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.custom.$post(args, options)
}

export async function postVendorExtensionsMessages(
  args: InferRequestType<typeof client.vendorExtensions.messages.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.messages.$post(args, options)
}

export async function postVendorExtensionsComposition(
  args: InferRequestType<typeof client.vendorExtensions.composition.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.composition.$post(args, options)
}

export async function postVendorExtensionsConditional(
  args: InferRequestType<typeof client.vendorExtensions.conditional.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.conditional.$post(args, options)
}

export async function postVendorExtensionsApplicators(
  args: InferRequestType<typeof client.vendorExtensions.applicators.$post>,
  options?: ClientRequestOptions,
) {
  return await client.vendorExtensions.applicators.$post(args, options)
}

export async function getPaginationItems(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.pagination.items.$get(args, options)
}

export async function getPaginationFeeds(options?: ClientRequestOptions) {
  return await client.pagination.feeds.$get(undefined, options)
}

export async function getPaginationUsersUserIdPosts(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.pagination.users[':userId'].posts.$get(args, options)
}
