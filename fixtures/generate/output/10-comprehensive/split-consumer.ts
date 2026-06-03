import * as swr from './split/swr'
import * as tanstackQuery from './split/tanstack-query'
import * as svelteQuery from './split/svelte-query'
import * as vueQuery from './split/vue-query'
import * as solidQuery from './split/solid-query'
import * as preactQuery from './split/preact-query'
import * as angularQuery from './split/angular-query'

export const _splitBarrels = [swr, tanstackQuery, svelteQuery, vueQuery, solidQuery, preactQuery, angularQuery] as const
