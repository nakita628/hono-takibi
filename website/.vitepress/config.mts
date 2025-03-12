import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config

export default withMermaid(
  defineConfig({
    title: 'Hono Takibi',
    description:
      'Hono Takibi is a CLI tool that generates Hono routes from OpenAPI specifications.',
    base: '/hono-takibi/',
    sitemap: {
      hostname: 'https://nakita628.github.io/hono-takibi/',
      lastmodDateOnly: false,
      transformItems: (items) => {
        return items.map((item) => ({
          ...item,
          changefreq: 'weekly',
          priority: 0.8
        }))
      }
    },
    head: [
      ['meta',{property: 'og:image',content: 'title.png',},],
      ['meta', { property: 'og:type', content: 'website' }],
      ['link', { rel: 'icon', href: 'favicon.png' }],
      // twitter
      ['meta', { name: 'twitter:title', content: 'Hono Takibi - Zod OpenAPI Hono Code Generator' }],
      ['meta', { name: 'twitter:description', content: 'Generate type-safe Hono routes and Zod schemas from OpenAPI specifications' }],
      ['meta', { property: 'twitter:domain', content: 'https://nakita628.github.io/hono-takibi/' }],
      ['meta', {property: 'twitter:image',content: 'title.png',},],
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ],
    // dark mode
    appearance: 'force-dark',

    markdown: {
      config(md) {
        md.use(groupIconMdPlugin)
      },
    },
    vite: {
      plugins: [groupIconVitePlugin() as any],
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
          text: 'Settings',
          items: [{ text: 'hono-takibi.json', link: '/docs/settings' }],
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
