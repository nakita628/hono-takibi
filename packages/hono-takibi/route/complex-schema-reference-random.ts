import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z.object({ name: z.string() }).partial().openapi('A')

const BSchema = z.object({ id: z.string() }).partial().openapi('B')

const CSchema = z.object({ value: z.number() }).partial().openapi('C')

const DSchema = z.object({ description: z.string() }).partial().openapi('D')

const ESchema = z.object({ flag: z.boolean() }).partial().openapi('E')

const FSchema = z.object({ title: z.string() }).partial().openapi('F')

const GSchema = z.object({ summary: z.string() }).partial().openapi('G')

const HSchema = z.object({ info: z.string() }).partial().openapi('H')

const ISchema = z.object({ data: z.string() }).partial().openapi('I')

const JSchema = z.object({ code: z.string() }).partial().openapi('J')

const KSchema = z.object({ key: z.string() }).partial().openapi('K')

const LSchema = z.object({ label: z.string() }).partial().openapi('L')

const MSchema = z.object({ meta: z.string() }).partial().openapi('M')

const NSchema = z.object({ number: z.number().int() }).partial().openapi('N')

const OSchema = z.object({ option: z.string() }).partial().openapi('O')

const PSchema = z.object({ price: z.number() }).partial().openapi('P')

const QSchema = z.object({ quantity: z.number().int() }).partial().openapi('Q')

const RSchema = z.object({ rating: z.number() }).partial().openapi('R')

const SSchema = z.object({ status: z.string() }).partial().openapi('S')

const TSchema = z.object({ time: z.string() }).partial().openapi('T')

const USchema = z.object({ unit: z.string() }).partial().openapi('U')

const VSchema = z.object({ volume: z.number() }).partial().openapi('V')

const WSchema = z.object({ weight: z.number() }).partial().openapi('W')

const XSchema = z.object({ xFactor: z.string() }).partial().openapi('X')

const YSchema = z.object({ yield: z.string() }).partial().openapi('Y')

const ZSchema = z.object({ zone: z.string() }).partial().openapi('Z')

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
        H: HSchema,
        I: ISchema,
        J: JSchema,
        K: KSchema,
        L: LSchema,
        M: MSchema,
        N: NSchema,
        O: OSchema,
        P: PSchema,
        Q: QSchema,
        R: RSchema,
        S: SSchema,
        T: TSchema,
        U: USchema,
        V: VSchema,
        W: WSchema,
        X: XSchema,
        Y: YSchema,
        Z: ZSchema,
      })
      .partial(),
    nestedRefs: z
      .object({
        group1: z.object({ A: ASchema, M: MSchema, Z: ZSchema }).partial(),
        group2: z.object({ B: BSchema, N: NSchema, Y: YSchema }).partial(),
      })
      .partial(),
    chainRefs: z
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
                                        z
                                          .object({
                                            G: z.intersection(
                                              GSchema,
                                              z
                                                .object({
                                                  H: z.intersection(
                                                    HSchema,
                                                    z
                                                      .object({
                                                        I: z.intersection(
                                                          ISchema,
                                                          z
                                                            .object({
                                                              J: z.intersection(
                                                                JSchema,
                                                                z
                                                                  .object({
                                                                    K: z.intersection(
                                                                      KSchema,
                                                                      z
                                                                        .object({
                                                                          L: z.intersection(
                                                                            LSchema,
                                                                            z
                                                                              .object({
                                                                                M: z.intersection(
                                                                                  MSchema,
                                                                                  z
                                                                                    .object({
                                                                                      N: z.intersection(
                                                                                        NSchema,
                                                                                        z
                                                                                          .object({
                                                                                            O: z.intersection(
                                                                                              OSchema,
                                                                                              z
                                                                                                .object(
                                                                                                  {
                                                                                                    P: z.intersection(
                                                                                                      PSchema,
                                                                                                      z
                                                                                                        .object(
                                                                                                          {
                                                                                                            Q: z.intersection(
                                                                                                              QSchema,
                                                                                                              z
                                                                                                                .object(
                                                                                                                  {
                                                                                                                    R: z.intersection(
                                                                                                                      RSchema,
                                                                                                                      z
                                                                                                                        .object(
                                                                                                                          {
                                                                                                                            S: z.intersection(
                                                                                                                              SSchema,
                                                                                                                              z
                                                                                                                                .object(
                                                                                                                                  {
                                                                                                                                    T: z.intersection(
                                                                                                                                      TSchema,
                                                                                                                                      z
                                                                                                                                        .object(
                                                                                                                                          {
                                                                                                                                            U: z.intersection(
                                                                                                                                              USchema,
                                                                                                                                              z
                                                                                                                                                .object(
                                                                                                                                                  {
                                                                                                                                                    V: z.intersection(
                                                                                                                                                      VSchema,
                                                                                                                                                      z
                                                                                                                                                        .object(
                                                                                                                                                          {
                                                                                                                                                            W: z.intersection(
                                                                                                                                                              WSchema,
                                                                                                                                                              z
                                                                                                                                                                .object(
                                                                                                                                                                  {
                                                                                                                                                                    X: z.intersection(
                                                                                                                                                                      XSchema,
                                                                                                                                                                      z
                                                                                                                                                                        .object(
                                                                                                                                                                          {
                                                                                                                                                                            Y: z.intersection(
                                                                                                                                                                              YSchema,
                                                                                                                                                                              z
                                                                                                                                                                                .object(
                                                                                                                                                                                  {
                                                                                                                                                                                    Z: ZSchema,
                                                                                                                                                                                  },
                                                                                                                                                                                )
                                                                                                                                                                                .partial(),
                                                                                                                                                                            ),
                                                                                                                                                                          },
                                                                                                                                                                        )
                                                                                                                                                                        .partial(),
                                                                                                                                                                    ),
                                                                                                                                                                  },
                                                                                                                                                                )
                                                                                                                                                                .partial(),
                                                                                                                                                            ),
                                                                                                                                                          },
                                                                                                                                                        )
                                                                                                                                                        .partial(),
                                                                                                                                                    ),
                                                                                                                                                  },
                                                                                                                                                )
                                                                                                                                                .partial(),
                                                                                                                                            ),
                                                                                                                                          },
                                                                                                                                        )
                                                                                                                                        .partial(),
                                                                                                                                    ),
                                                                                                                                  },
                                                                                                                                )
                                                                                                                                .partial(),
                                                                                                                            ),
                                                                                                                          },
                                                                                                                        )
                                                                                                                        .partial(),
                                                                                                                    ),
                                                                                                                  },
                                                                                                                )
                                                                                                                .partial(),
                                                                                                            ),
                                                                                                          },
                                                                                                        )
                                                                                                        .partial(),
                                                                                                    ),
                                                                                                  },
                                                                                                )
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
    oneOfRefs: z.union([CSchema, z.object({ D: DSchema }).partial()]),
    anyOfRefs: z.union([ESchema, z.object({ A: ASchema }).partial()]),
    allOfRefs: z.intersection(ASchema, z.object({ B: BSchema }).partial()),
    arrayRefs: z.array(USchema),
    chainRefsExtended: z
      .object({
        V: z.intersection(
          VSchema,
          z
            .object({
              W: z.intersection(
                WSchema,
                z
                  .object({
                    X: z.intersection(
                      XSchema,
                      z
                        .object({ Y: z.intersection(YSchema, z.object({ Z: ZSchema }).partial()) })
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
    mixedComplex: z
      .object({ data: z.array(z.union([MSchema, z.object({ N: NSchema }).partial()])) })
      .partial(),
  })
  .partial()
  .openapi('Root')

export const getTestRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/test',
  summary: 'Test endpoint for comprehensive schema references',
  responses: {
    200: {
      description: 'A complex response containing various schema references',
      content: { 'application/json': { schema: RootSchema } },
    },
  },
})
