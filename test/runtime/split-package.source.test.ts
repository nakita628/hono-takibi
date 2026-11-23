// Split outputs across two packages (cases/split-package, generated from specs/split.yaml).
// The case typechecks, which proves every import resolves; this file proves the imports are
// the ones the rule asks for — by package across the boundary, relative inside it.
//
// 2 つのパッケージにまたがる分割出力の検証(cases/split-package。specs/split.yaml から生成)。
// ケースの typecheck は import がすべて解決することを、このファイルは import が規則どおりで
// あることを確認する。境界をまたぐなら package、内側なら相対パスである。
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const root = path.resolve(import.meta.dirname, '../__generated__/split-package')

// Every module the `.ts` files of the directories name in a `from '…'`, once each, sorted.
// ディレクトリの `.ts` ファイルが `from '…'` で指すすべてのモジュール。重複なしで並べる。
function specifiers(...directories: string[]) {
  const all = directories.flatMap((directory) =>
    readdirSync(path.join(root, directory))
      .filter((file) => file.endsWith('.ts'))
      .flatMap((file) =>
        Array.from(
          readFileSync(path.join(root, directory, file), 'utf8').matchAll(/from '([^']*)'/gu),
          (match) => match[1],
        ),
      ),
  )
  return [...new Set(all)].sort()
}

describe('split-package: what the generated files import', () => {
  // The server's files reach the schemas through their package, never by a path that
  // leaves the server.
  // サーバーのファイルは schemas に package で届き、サーバーの外へ出るパスは使わない。
  it('the server imports the schemas by their package', () => {
    expect(
      specifiers(
        ...['routes', 'parameters', 'headers', 'requestBodies', 'responses'].map(
          (directory) => `server/src/${directory}`,
        ),
      ),
    ).toStrictEqual([
      '../callbacks',
      '../examples',
      '../headers',
      '../links',
      '../parameters',
      '../requestBodies',
      '../responses',
      './buyerIdQueryParam',
      './companyIdPathParam',
      './companyResponse',
      './conflict',
      './createOrderRequest',
      './createUserRequest',
      './cursorQueryParam',
      './defaultError',
      './fileIdPathParam',
      './fileResponse',
      './getCompaniesCompanyId',
      './getFilesFileId',
      './getOrders',
      './getOrdersOrderId',
      './getUsers',
      './getUsersUserId',
      './includeQueryParam',
      './limitQueryParam',
      './notFound',
      './orderIdPathParam',
      './orderListResponse',
      './orderResponse',
      './patchUsersUserId',
      './postAuthToken',
      './postOrders',
      './postSubscriptions',
      './postUsers',
      './rateLimitLimitHeader',
      './rateLimitRemainingHeader',
      './rateLimitResetHeader',
      './rateLimited',
      './searchFilterQueryParam',
      './subscriptionRequest',
      './subscriptionResponse',
      './tokenRequest',
      './tokenResponse',
      './traceIdHeader',
      './traceIdHeaderParam',
      './unauthorized',
      './updateUserRequest',
      './userIdPathParam',
      './userListResponse',
      './userResponse',
      './validationError',
      './webhookEventRequest',
      './wwwAuthenticateHeader',
      '@fixtures/split-package-schemas',
      '@hono/zod-openapi',
    ])
  })

  // Inside the server, the outputs import one another relatively.
  // サーバーの内側では、出力どうしは相対パスで import する。
  it('the server imports its own outputs relatively', () => {
    expect(specifiers('server/src/routes')).toStrictEqual([
      '../callbacks',
      '../parameters',
      '../requestBodies',
      '../responses',
      './getCompaniesCompanyId',
      './getFilesFileId',
      './getOrders',
      './getOrdersOrderId',
      './getUsers',
      './getUsersUserId',
      './patchUsersUserId',
      './postAuthToken',
      './postOrders',
      './postSubscriptions',
      './postUsers',
      '@hono/zod-openapi',
    ])
  })

  // The schemas import nothing of the server.
  // schemas はサーバーのものを何も import しない。
  it('the schemas import nothing of the server', () => {
    expect(specifiers('schemas')).toStrictEqual([
      './address',
      './auditLog',
      './company',
      './companyFilter',
      './currency',
      './cursor',
      './entity',
      './entityRef',
      './event',
      './eventType',
      './fieldError',
      './file',
      './geoGraph',
      './geoPoint',
      './graphEdge',
      './graphNode',
      './id',
      './link',
      './locale',
      './meta',
      './money',
      './order',
      './orderEventPayload',
      './orderFilter',
      './orderItem',
      './orderStatus',
      './person',
      './problemDetails',
      './product',
      './resourceLinks',
      './searchFilter',
      './secretRef',
      './secretRotation',
      './systemEventPayload',
      './tokenRequest',
      './tokenResponse',
      './traceContext',
      './traceId',
      './ulid',
      './user',
      './userEventPayload',
      './userFilter',
      './userPreferences',
      './uuid',
      './validationProblemDetails',
      './webhookEvent',
      './webhookSubscription',
      '@hono/zod-openapi',
    ])
  })
})
