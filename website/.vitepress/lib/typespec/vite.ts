// Node-only VitePress wiring for the TypeSpec bundles. Never import this from
// browser code — it pulls in @typespec/bundler and esbuild.
import { fileURLToPath } from 'node:url'

import { typespecBundlePlugin } from '@typespec/bundler/vite'

import { TYPESPEC_BUNDLES_DIR, TYPESPEC_LIBRARIES } from './index'

// The plugin writes its importmap with page-relative URLs (`./typespec-bundles/…`).
// VitePress navigates between pages client-side, so a visitor arriving at the
// playground from a nested docs page would resolve them against the wrong base;
// root-relative URLs hold for every page.
function absolutizeImportMap(html: string) {
  return html.replaceAll(`"./${TYPESPEC_BUNDLES_DIR}/`, `"/${TYPESPEC_BUNDLES_DIR}/`)
}

export function typespecBundle() {
  const plugin = typespecBundlePlugin({
    folderName: TYPESPEC_BUNDLES_DIR,
    libraries: [...TYPESPEC_LIBRARIES],
  })
  const configHook = plugin.configResolved
  const configHandler = typeof configHook === 'function' ? configHook : configHook?.handler
  const htmlHook = plugin.transformIndexHtml
  const htmlHandler = typeof htmlHook === 'function' ? htmlHook : htmlHook?.handler
  const wrapped: ReturnType<typeof typespecBundlePlugin> = {
    ...plugin,
    apply: (_config, env) => !env.isSsrBuild,
    // The plugin resolves libraries from `config.root`/node_modules; pin it
    // to the site package root so resolution stays inside this package.
    configResolved(resolvedConfig) {
      return configHandler?.call(
        this,
        Object.assign(Object.create(resolvedConfig), {
          root: fileURLToPath(new URL('../../..', import.meta.url)),
        }),
      )
    },
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        const result = await htmlHandler?.call(this, html, ctx)
        return typeof result === 'string' ? absolutizeImportMap(result) : result
      },
    },
  }
  return wrapped
}

// Dev: Vite runs the plugin's transformIndexHtml. Build: VitePress does not,
// but its own transformHtml hook runs after the client build, once the plugin
// has bundled the libraries and knows every subpath they export — so the same
// hook is replayed there.
export async function injectTypeSpecImportMap(
  plugin: ReturnType<typeof typespecBundle>,
  html: string,
) {
  const hook = plugin.transformIndexHtml
  const handler = typeof hook === 'function' ? hook : hook?.handler
  if (!handler) return html
  const result = await handler.call(plugin, html, { path: '/', filename: 'index.html' })
  return typeof result === 'string' ? result : html
}
