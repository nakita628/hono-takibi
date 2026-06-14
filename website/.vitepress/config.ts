import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hono Takibi',
  description: 'Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi',

  cleanUrls: true,

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },

  vite: {
    plugins: [groupIconVitePlugin()],
  },

  themeConfig: {
    nav: [
      { text: 'Docs', link: '/docs/getting-started' },
      // { text: 'Playground', link: '/playground' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
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
})
