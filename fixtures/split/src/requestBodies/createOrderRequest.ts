import { OrderSchema } from '../schemas'
import { OrderExampleExample } from '../examples'

export const CreateOrderRequestRequestBody = {
  content: {
    'application/json': { schema: OrderSchema, examples: { sample: OrderExampleExample } },
  },
  required: true,
}
