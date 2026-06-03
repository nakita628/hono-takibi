import * as tanstackQuery from './split/tanstack-query'
import * as swr from './split/swr'

export const _splitBarrels = [tanstackQuery, swr] as const
