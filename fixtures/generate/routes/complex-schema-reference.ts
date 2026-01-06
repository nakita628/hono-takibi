import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z.object({ name: z.string().exactOptional() }).openapi('A')

const BSchema = z.object({ id: z.string().exactOptional() }).openapi('B')

const CSchema = z.object({ value: z.number().exactOptional() }).openapi('C')

const DSchema = z.object({ description: z.string().exactOptional() }).openapi('D')

const ESchema = z.object({ flag: z.boolean().exactOptional() }).openapi('E')

const FSchema = z.object({ title: z.string().exactOptional() }).openapi('F')

const GSchema = z.object({ summary: z.string().exactOptional() }).openapi('G')

const HSchema = z.object({ info: z.string().exactOptional() }).openapi('H')

const ISchema = z.object({ data: z.string().exactOptional() }).openapi('I')

const JSchema = z.object({ code: z.string().exactOptional() }).openapi('J')

const KSchema = z.object({ key: z.string().exactOptional() }).openapi('K')

const LSchema = z.object({ label: z.string().exactOptional() }).openapi('L')

const MSchema = z.object({ meta: z.string().exactOptional() }).openapi('M')

const NSchema = z.object({ number: z.int().exactOptional() }).openapi('N')

const OSchema = z.object({ option: z.string().exactOptional() }).openapi('O')

const PSchema = z.object({ price: z.number().exactOptional() }).openapi('P')

const QSchema = z.object({ quantity: z.int().exactOptional() }).openapi('Q')

const RSchema = z.object({ rating: z.number().exactOptional() }).openapi('R')

const SSchema = z.object({ status: z.string().exactOptional() }).openapi('S')

const TSchema = z.object({ time: z.string().exactOptional() }).openapi('T')

const USchema = z.object({ unit: z.string().exactOptional() }).openapi('U')

const VSchema = z.object({ volume: z.number().exactOptional() }).openapi('V')

const WSchema = z.object({ weight: z.number().exactOptional() }).openapi('W')

const XSchema = z.object({ xFactor: z.string().exactOptional() }).openapi('X')

const YSchema = z.object({ yield: z.string().exactOptional() }).openapi('Y')

const ZSchema = z.object({ zone: z.string().exactOptional() }).openapi('Z')

const RootSchema = z
  .object({
    flatRefs: z
      .object({
        A: ASchema.exactOptional(),
        B: BSchema.exactOptional(),
        C: CSchema.exactOptional(),
        D: DSchema.exactOptional(),
        E: ESchema.exactOptional(),
        F: FSchema.exactOptional(),
        G: GSchema.exactOptional(),
        H: HSchema.exactOptional(),
        I: ISchema.exactOptional(),
        J: JSchema.exactOptional(),
        K: KSchema.exactOptional(),
        L: LSchema.exactOptional(),
        M: MSchema.exactOptional(),
        N: NSchema.exactOptional(),
        O: OSchema.exactOptional(),
        P: PSchema.exactOptional(),
        Q: QSchema.exactOptional(),
        R: RSchema.exactOptional(),
        S: SSchema.exactOptional(),
        T: TSchema.exactOptional(),
        U: USchema.exactOptional(),
        V: VSchema.exactOptional(),
        W: WSchema.exactOptional(),
        X: XSchema.exactOptional(),
        Y: YSchema.exactOptional(),
        Z: ZSchema.exactOptional(),
      })
      .exactOptional(),
    nestedRefs: z
      .object({
        group1: z
          .object({
            A: ASchema.exactOptional(),
            M: MSchema.exactOptional(),
            Z: ZSchema.exactOptional(),
          })
          .exactOptional(),
        group2: z
          .object({
            B: BSchema.exactOptional(),
            N: NSchema.exactOptional(),
            Y: YSchema.exactOptional(),
          })
          .exactOptional(),
      })
      .exactOptional(),
    chainRefs: z
      .object({
        A: ASchema.and(
          z.object({
            B: BSchema.and(
              z.object({
                C: CSchema.and(
                  z.object({
                    D: DSchema.and(
                      z.object({
                        E: ESchema.and(
                          z.object({
                            F: FSchema.and(
                              z.object({
                                G: GSchema.and(
                                  z.object({
                                    H: HSchema.and(
                                      z.object({
                                        I: ISchema.and(
                                          z.object({
                                            J: JSchema.and(
                                              z.object({
                                                K: KSchema.and(
                                                  z.object({
                                                    L: LSchema.and(
                                                      z.object({
                                                        M: MSchema.and(
                                                          z.object({
                                                            N: NSchema.and(
                                                              z.object({
                                                                O: OSchema.and(
                                                                  z.object({
                                                                    P: PSchema.and(
                                                                      z.object({
                                                                        Q: QSchema.and(
                                                                          z.object({
                                                                            R: RSchema.and(
                                                                              z.object({
                                                                                S: SSchema.and(
                                                                                  z.object({
                                                                                    T: TSchema.and(
                                                                                      z.object({
                                                                                        U: USchema.and(
                                                                                          z.object({
                                                                                            V: VSchema.and(
                                                                                              z.object(
                                                                                                {
                                                                                                  W: WSchema.and(
                                                                                                    z.object(
                                                                                                      {
                                                                                                        X: XSchema.and(
                                                                                                          z.object(
                                                                                                            {
                                                                                                              Y: YSchema.and(
                                                                                                                z.object(
                                                                                                                  {
                                                                                                                    Z: ZSchema.exactOptional(),
                                                                                                                  },
                                                                                                                ),
                                                                                                              ).exactOptional(),
                                                                                                            },
                                                                                                          ),
                                                                                                        ).exactOptional(),
                                                                                                      },
                                                                                                    ),
                                                                                                  ).exactOptional(),
                                                                                                },
                                                                                              ),
                                                                                            ).exactOptional(),
                                                                                          }),
                                                                                        ).exactOptional(),
                                                                                      }),
                                                                                    ).exactOptional(),
                                                                                  }),
                                                                                ).exactOptional(),
                                                                              }),
                                                                            ).exactOptional(),
                                                                          }),
                                                                        ).exactOptional(),
                                                                      }),
                                                                    ).exactOptional(),
                                                                  }),
                                                                ).exactOptional(),
                                                              }),
                                                            ).exactOptional(),
                                                          }),
                                                        ).exactOptional(),
                                                      }),
                                                    ).exactOptional(),
                                                  }),
                                                ).exactOptional(),
                                              }),
                                            ).exactOptional(),
                                          }),
                                        ).exactOptional(),
                                      }),
                                    ).exactOptional(),
                                  }),
                                ).exactOptional(),
                              }),
                            ).exactOptional(),
                          }),
                        ).exactOptional(),
                      }),
                    ).exactOptional(),
                  }),
                ).exactOptional(),
              }),
            ).exactOptional(),
          }),
        ).exactOptional(),
      })
      .exactOptional(),
    oneOfRefs: z.xor([CSchema, z.object({ D: DSchema.exactOptional() })]).exactOptional(),
    anyOfRefs: z.union([ESchema, z.object({ A: ASchema.exactOptional() })]).exactOptional(),
    allOfRefs: ASchema.and(z.object({ B: BSchema.exactOptional() })).exactOptional(),
    arrayRefs: z.array(USchema).exactOptional(),
    chainRefsExtended: z
      .object({
        V: VSchema.and(
          z.object({
            W: WSchema.and(
              z.object({
                X: XSchema.and(
                  z.object({
                    Y: YSchema.and(z.object({ Z: ZSchema.exactOptional() })).exactOptional(),
                  }),
                ).exactOptional(),
              }),
            ).exactOptional(),
          }),
        ).exactOptional(),
      })
      .exactOptional(),
    mixedComplex: z
      .object({
        data: z.array(z.xor([MSchema, z.object({ N: NSchema.exactOptional() })])).exactOptional(),
      })
      .exactOptional(),
  })
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
