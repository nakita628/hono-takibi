import { createRoute, z } from '@hono/zod-openapi'

const NSchema = z.object({ number: z.int() }).partial().openapi('N')

const MSchema = z.object({ meta: z.string() }).partial().openapi('M')

const ZSchema = z.object({ zone: z.string() }).partial().openapi('Z')

const YSchema = z.object({ yield: z.string() }).partial().openapi('Y')

const XSchema = z.object({ xFactor: z.string() }).partial().openapi('X')

const WSchema = z.object({ weight: z.number() }).partial().openapi('W')

const VSchema = z.object({ volume: z.number() }).partial().openapi('V')

const USchema = z.object({ unit: z.string() }).partial().openapi('U')

const BSchema = z.object({ id: z.string() }).partial().openapi('B')

const ASchema = z.object({ name: z.string() }).partial().openapi('A')

const ESchema = z.object({ flag: z.boolean() }).partial().openapi('E')

const DSchema = z.object({ description: z.string() }).partial().openapi('D')

const CSchema = z.object({ value: z.number() }).partial().openapi('C')

const TSchema = z.object({ time: z.string() }).partial().openapi('T')

const SSchema = z.object({ status: z.string() }).partial().openapi('S')

const RSchema = z.object({ rating: z.number() }).partial().openapi('R')

const QSchema = z.object({ quantity: z.int() }).partial().openapi('Q')

const PSchema = z.object({ price: z.number() }).partial().openapi('P')

const OSchema = z.object({ option: z.string() }).partial().openapi('O')

const LSchema = z.object({ label: z.string() }).partial().openapi('L')

const KSchema = z.object({ key: z.string() }).partial().openapi('K')

const JSchema = z.object({ code: z.string() }).partial().openapi('J')

const ISchema = z.object({ data: z.string() }).partial().openapi('I')

const HSchema = z.object({ info: z.string() }).partial().openapi('H')

const GSchema = z.object({ summary: z.string() }).partial().openapi('G')

const FSchema = z.object({ title: z.string() }).partial().openapi('F')

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
