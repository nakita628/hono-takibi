import { z } from '@hono/zod-openapi'
import { CurrencySchema } from './currency'
import { TraceContextSchema, type TraceContext } from './traceContext'

type MoneyType = { currency: z.infer<typeof CurrencySchema>; amount: number; trace?: TraceContext }

export const MoneySchema: z.ZodType<MoneyType> = z
  .object({
    currency: CurrencySchema,
    amount: z.number().multipleOf(0.01),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['currency', 'amount'] })
  .openapi('Money')

export type Money = z.infer<typeof MoneySchema>
