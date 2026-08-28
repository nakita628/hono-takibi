// Node-only VitePress wiring for the TypeSpec bundles (mirrors the upstream
// playground's src/vite/ split). Never import this from browser code — it
// pulls in @typespec/bundler and esbuild.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { typespecBundlePlugin } from '@typespec/bundler/vite'

import { TYPESPEC_BUNDLES_DIR, TYPESPEC_LIBRARIES } from './index'

// Mirrors @typespec/bundler's createImportMap (the package does not export
// it): the emitted bundles reference each other with bare specifiers,
// including subpath exports (e.g. @typespec/compiler/typekit,
// @typespec/events/experimental), so the map needs one entry per subpath
// export of every bundled library.
const typespecImports = Object.fromEntries(
  TYPESPEC_LIBRARIES.flatMap((name) => {
    // oxlint-disable-next-line typescript/no-unsafe-assignment -- JSON.parse is typed any; the annotation narrows it and `?? {}` guards the only key read
    const pkg: { readonly exports?: { readonly [key: string]: unknown } } = JSON.parse(
      readFileSync(new URL(`../../../node_modules/${name}/package.json`, import.meta.url), 'utf8'),
    )
    const subpaths = Object.keys(pkg.exports ?? {}).filter(
      (key) =>
        key !== '.' &&
        key !== './testing' &&
        (!key.startsWith('./internals') || key === './internals/prettier-formatter'),
    )
    return [
      [name, `/${TYPESPEC_BUNDLES_DIR}/${name}/index.js`] as const,
      ...subpaths.map(
        (key) =>
          [`${name}${key.slice(1)}`, `/${TYPESPEC_BUNDLES_DIR}/${name}${key.slice(1)}.js`] as const,
      ),
    ]
  }),
)

// Injected ahead of the <html> element so it precedes every module script —
// VitePress renders `head` entries after its own script tags, which is too
// late for an importmap. transformIndexHtml covers dev, transformHtml covers
// the build (VitePress does not run transformIndexHtml at build time).
export const typespecImportMapTag = `<script type="importmap">${JSON.stringify({ imports: typespecImports })}</script>`

export function typespecBundle() {
  const plugin = typespecBundlePlugin({
    folderName: TYPESPEC_BUNDLES_DIR,
    libraries: [...TYPESPEC_LIBRARIES],
  })
  const hook = plugin.configResolved
  const handler = typeof hook === 'function' ? hook : hook?.handler
  const wrapped: ReturnType<typeof typespecBundlePlugin> = {
    ...plugin,
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace('<html', `${typespecImportMapTag}\n<html`),
    },
    apply: (_config, env) => !env.isSsrBuild,
    // The plugin resolves libraries from `config.root`/node_modules; pin it
    // to the site package root so resolution stays inside this package.
    configResolved(resolvedConfig) {
      return handler?.call(
        this,
        Object.assign(Object.create(resolvedConfig), {
          root: fileURLToPath(new URL('../../..', import.meta.url)),
        }),
      )
    },
  }
  return wrapped
}
