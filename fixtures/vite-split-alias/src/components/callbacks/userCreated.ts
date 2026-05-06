import { UserSchema } from '~/components/schemas'

export const UserCreatedCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'userCreatedCallback',
      requestBody: { content: { 'application/json': { schema: UserSchema } } },
      responses: { 200: { description: 'Callback processed' } },
    },
  },
}
