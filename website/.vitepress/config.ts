import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import { injectTypeSpecImportMap, typespecBundle } from './lib/typespec/vite'

const typespec = typespecBundle()

export default defineConfig({
  title: 'Hono Takibi',
  description: 'Generate type-safe Hono code from OpenAPI and TypeSpec.',
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
    logo: '/web/logo.webp',
    nav: [
      { text: 'Docs', link: '/docs' },
      { text: 'Playground', link: '/playground' },
    ],
    sidebar: [
      { text: 'Getting Started', link: '/docs' },
      {
        text: 'Guides',
        items: [
          { text: 'Configuration', link: '/docs/guides/config' },
          { text: 'Template', link: '/docs/guides/template' },
          { text: 'Client', link: '/docs/guides/client' },
          { text: 'Test & Mock', link: '/docs/guides/test-mock' },
          { text: 'API Docs', link: '/docs/guides/api-docs' },
          { text: 'Vendor Extensions', link: '/docs/guides/vendor' },
          { text: 'Vite Plugin', link: '/docs/guides/vite-plugin' },
        ],
      },
      { text: 'Playground', link: '/playground' },
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
    ['link', { rel: 'icon', type: 'image/webp', href: '/web/logo.webp' }],
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
