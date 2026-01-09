import { z } from '@hono/zod-openapi'
import { EntitySchema, type Entity } from './entity'
import { CompanySchema, type Company } from './company'
import { MoneySchema, type Money } from './money'

type ProductType = Entity & {
  name: string
  supplier?: Company
  relatedProducts?: ProductType[]
  price?: Money
}

export const ProductSchema: z.ZodType<ProductType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string(),
          supplier: CompanySchema.exactOptional(),
          relatedProducts: z.array(ProductSchema).exactOptional(),
          price: MoneySchema.exactOptional(),
        })
        .openapi({ required: ['name'] }),
    ),
  )
  .openapi('Product')

export type Product = z.infer<typeof ProductSchema>
