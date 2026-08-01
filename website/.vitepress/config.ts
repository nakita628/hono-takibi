import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import { typespecBundle, typespecImportMapTag } from './lib/typespec/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hono Takibi',
  description: 'Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi',

  cleanUrls: true,

  transformHtml: (html) => html.replace('<head>', `<head>${typespecImportMapTag}`),

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },

  vite: {
    plugins: [groupIconVitePlugin(), typespecBundle()],
    resolve: {
      alias: [
        // @typespec/compiler imports 'prettier/plugins/yaml.js' (extension-suffixed);
        // prettier's '"./*"' exports wildcard resolves it to the UMD build, which has
        // no `default` export under Vite dev. Re-map to the bare specifier so the
        // exports map resolves the ESM build instead.
        {
          find: /^prettier\/plugins\/yaml\.js$/,
          replacement: 'prettier/plugins/yaml',
        },
        // The hono-takibi generator chunk imports node:path (dirname/relative);
        // pathe provides a browser-safe implementation. The absolute path keeps
        // the alias resolvable from the workspace-linked hono-takibi package,
        // which lives outside this site's root.
        {
          find: /^node:path$/,
          replacement: fileURLToPath(import.meta.resolve('pathe')),
        },
      ],
    },
  },

  themeConfig: {
    nav: [
      { text: 'Docs', link: '/docs' },
      { text: 'Playground', link: '/playground' },
    ],
    sidebar: [
      {text: 'Docs', link: '/docs'},
      {text: 'Guides', link: '/guides'},
      {text: 'Playground', link: '/playground'},
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nakita628/hono-takibi' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/hono-takibi' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Hono Takibi contributors.',
    },
  },
})
