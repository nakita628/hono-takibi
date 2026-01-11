import { z } from '@hono/zod-openapi'
import { EntitySchema } from './entity'
import { CompanySchema } from './company'
import { MoneySchema } from './money'

type ProductType = z.infer<typeof EntitySchema> & {
  name: string
  supplier?: z.infer<typeof CompanySchema>
  relatedProducts?: ProductType[]
  price?: z.infer<typeof MoneySchema>
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
