/**
 * Core module re-exports.
 *
 * @module core
 */
export * from './components/index.js'
// Shared query module
export {
  makeQueryHooks,
  type QueryFrameworkConfig,
  SVELTE_QUERY_CONFIG,
  TANSTACK_QUERY_CONFIG,
  VUE_QUERY_CONFIG,
} from './query/index.js'
// Generation functions
export { route } from './route/index.js'
export { rpc } from './rpc/index.js'
export { svelteQuery } from './svelte-query/index.js'
export { swr } from './swr/index.js'
export { takibi } from './takibi/index.js'
export { tanstackQuery } from './tanstack-query/index.js'
export { type } from './type/index.js'
export { vueQuery } from './vue-query/index.js'
