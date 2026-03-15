import { UserListSchema } from './schemas'

export const UserListResponseResponse = {
  description: 'A list of users',
  content: { 'application/json': { schema: UserListSchema } },
}
