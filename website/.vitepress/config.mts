import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
// group icons
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config

export default withMermaid(
  defineConfig({
    title: 'Hono Takibi',
    description:
      'Hono Takibi is a CLI tool that generates Hono routes from OpenAPI specifications.',
    head: [
      [
        'meta',
        {
          property: 'og:image',
          content: 'title.png',
        },
      ],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'twitter:domain', content: 'hono-takibi.dev' }],
      [
        'meta',
        {
          property: 'twitter:image',
          content: 'title.png',
        },
      ],
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
      ['link', { rel: 'icon', href: 'logo.png' }],
    ],
    // dark mode
    appearance: 'force-dark',

    markdown: {
      config(md) {
        md.use(groupIconMdPlugin)
      },
    },
    vite: {
      plugins: [groupIconVitePlugin()],
    },

    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [{ text: 'Docs', link: '/docs' }],

      sidebar: [
        {
          text: 'Getting Started',
          items: [{ text: 'Hono Takibi', link: '/docs' }],
        },
        {
          text: 'Purpose',
          items: [{ text: 'Why Hono Takibi?', link: '/docs/purpose' }],
        },
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/nakita628/hono-takibi' },
        { icon: 'npm', link: 'https://www.npmjs.com/package/hono-takibi' },
      ],

      search: {
        provider: 'local',
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present Hono Takibi contributors.',
      },
    },
  }),
)
