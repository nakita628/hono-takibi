import { defineConfig } from 'vitepress'
// group icons
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hono Takibi",
  description: "Hono Takibi is a CLI tool that generates Hono routes from OpenAPI specifications.",
  // dark mode
  appearance: 'force-dark',

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Hono Takibi', link: '/docs' },
        ]
      },
      {
        text: 'Settings',
        items: [
          { text: 'hono-takibi.json', link: '/docs/settings' },
        ]
      },
      {
        text: 'Zod',
        items: [
          { text: 'Primitives', link: '/docs/zod/primitives' },
          { text: 'Strings', link: '/docs/zod/strings' },
          { text: 'Numbers', link: '/docs/zod/numbers' },
          { text: 'BigInts', link: '/docs/zod/bigints' },
          { text: 'Arrays', link: '/docs/zod/arrays' },
          { text: 'Schema methods', link: '/docs/zod/schema-methods' },
        ]
      },
      {
        text: 'Other',
        items: [
          { text: 'Query Parameters', link: '/docs/other/query-parameters' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nakita628/hono-takibi' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/hono-takibi' }
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Copyright © 2024-present Hono Takibi contributors.',
    },
  }
})
