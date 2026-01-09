import { OrderSchema } from '../schemas'
import { OrderExample } from '../examples'

export const CreateOrderRequestRequestBody = {
  content: { 'application/json': { schema: OrderSchema, examples: { sample: OrderExample } } },
  required: true,
}
