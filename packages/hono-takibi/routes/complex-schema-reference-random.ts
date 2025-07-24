import { createRoute, z } from '@hono/zod-openapi'

const CSchema = z
  .object({ value: z.number(), meta: z.object({ source: z.string() }).partial() })
  .partial()
  .openapi('C')

const BSchema = z.object({ name: z.string(), createdAt: z.iso.datetime() }).partial().openapi('B')

const ASchema = z
  .object({ id: z.string(), tags: z.array(z.string()) })
  .partial()
  .openapi('A')

const GSchema = z
  .object({
    summary: z.string(),
    attributes: z.object({ weight: z.number(), visible: z.boolean() }).partial(),
  })
  .partial()
  .openapi('G')

const FSchema = z
  .object({ code: z.string(), labels: z.array(z.string()) })
  .partial()
  .openapi('F')

const ESchema = z
  .object({ status: z.string(), detail: z.object({ count: z.int() }).partial() })
  .partial()
  .openapi('E')

const DSchema = z
  .object({ flag: z.boolean(), notes: z.array(z.string()) })
  .partial()
  .openapi('D')

const RootSchema = z
  .object({
    flatRefs: z
      .object({
        A: ASchema,
        B: BSchema,
        C: CSchema,
        D: DSchema,
        E: ESchema,
        F: FSchema,
        G: GSchema,
      })
      .partial(),
    nestedGroups: z
      .object({
        group1: z.object({ a: ASchema, b: BSchema, c: CSchema }).partial(),
        group2: z.object({ d: DSchema, e: ESchema }).partial(),
        group3: z.object({ f: FSchema, g: GSchema }).partial(),
      })
      .partial(),
    deepChain: z
      .object({
        A: z.intersection(
          ASchema,
          z
            .object({
              B: z.intersection(
                BSchema,
                z
                  .object({
                    C: z.intersection(
                      CSchema,
                      z
                        .object({
                          D: z.intersection(
                            DSchema,
                            z
                              .object({
                                E: z.intersection(
                                  ESchema,
                                  z
                                    .object({
                                      F: z.intersection(
                                        FSchema,
                                        z.object({ G: GSchema }).partial(),
                                      ),
                                    })
                                    .partial(),
                                ),
                              })
                              .partial(),
                          ),
                        })
                        .partial(),
                    ),
                  })
                  .partial(),
              ),
            })
            .partial(),
        ),
      })
      .partial(),
    oneOfRefs: z.union([ASchema, DSchema, GSchema]),
    anyOfRefs: z.union([CSchema, z.object({ nested: FSchema }).partial()]),
    allOfRefs: z.intersection(BSchema, ESchema, z.object({ extra: GSchema }).partial()),
    arrayRefs: z.array(z.union([FSchema, GSchema])),
    recursiveStructure: z
      .object({
        nodes: z.array(
          z.intersection(
            ASchema,
            z
              .object({
                children: z.array(z.intersection(BSchema, z.object({ sub: CSchema }).partial())),
              })
              .partial(),
          ),
        ),
      })
      .partial(),
  })
  .partial()
  .openapi('Root')

export const getTestRoute = createRoute({
  method: 'get',
  path: '/test',
  summary: 'Returns complex structure using schemas A–G',
  responses: {
    200: {
      description: 'Deeply structured response (A–G only)',
      content: { 'application/json': { schema: RootSchema } },
    },
  },
})
