import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import { injectTypeSpecImportMap, typespecBundle } from './lib/typespec/vite'

const typespec = typespecBundle()

export default defineConfig({
  title: 'Hono Takibi',
  description: 'Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi',
  cleanUrls: true,
  transformHtml: (html) => injectTypeSpecImportMap(typespec, html),
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [groupIconVitePlugin(), tailwindcss(), typespec],
    build: {
      rolldownOptions: {
        external: ['@typespec/compiler'],
      },
    },
    resolve: {
      alias: [
        {
          find: /^prettier\/plugins\/yaml\.js$/,
          replacement: 'prettier/plugins/yaml',
        },
        {
          find: /^node:path$/,
          replacement: fileURLToPath(import.meta.resolve('pathe')),
        },
      ],
    },
  },
  themeConfig: {
    logo: '/website/logo.webp',
    nav: [
      { text: 'Docs', link: '/docs' },
      { text: 'Playground', link: '/playground' },
    ],
    sidebar: [
      {
        text: 'Docs',
        // collapsed: true,
        link: '/docs',
      },
      {
        text: 'Guides',
        // collapsed: true,
        items: [
          { text: 'Configuration', link: '/docs/guides/config' },
          { text: 'Vendor', link: '/docs/guides/vendor' },
          { text: 'Vite Plugin', link: '/docs/guides/vite-plugin' },
        ],
      },
      {
        text: 'Playground',
        // collapsed: true,
        link: '/playground',
      },
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
  head: [
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://hono-takibi.dev/web/og.webp',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'twitter:domain', content: 'hono-takibi.dev' }],
    [
      'meta',
      {
        property: 'twitter:image',
        content: 'https://hono-takibi.dev/web/og.webp',
      },
    ],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
  ],
})
