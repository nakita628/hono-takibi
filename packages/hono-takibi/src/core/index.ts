/**
 * Core module re-exports.
 *
 * @module core
 */

// Shared query module
export { makeQueryHooks } from '../helper/query.js'
export * from './components/index.js'
// Generation functions
export { docs } from './docs/index.js'
export { mock } from './mock/index.js'
export { route } from './route/index.js'
export { rpc } from './rpc/index.js'
export { svelteQuery } from './svelte-query/index.js'
export { swr } from './swr/index.js'
export { makeTemplate, takibi } from './takibi/index.js'
export { tanstackQuery } from './tanstack-query/index.js'
export { test } from './test/index.js'
export { type } from './type/index.js'
export { vueQuery } from './vue-query/index.js'
export { webhooks } from './webhooks/index.js'
