import { OrderExample } from '../examples'
import { OrderSchema } from '../schemas'

export const CreateOrderRequestRequestBody = {
  content: { 'application/json': { schema: OrderSchema, examples: { sample: OrderExample } } },
  required: true,
}
