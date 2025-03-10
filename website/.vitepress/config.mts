import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import dotenv from 'dotenv'

// https://vitepress.dev/reference/site-config

dotenv.config()

if (!process.env.CONTENT) {
  throw new Error('CONTENT is not set')
}

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
      ['meta', {
        name: 'google-site-verification',
        content: process.env.CONTENT
      }],
      [
        'meta',
        {
          property: 'og:image',
          content: 'title.png',
        },
      ],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'twitter:domain', content: 'https://nakita628.github.io/hono-takibi/' }],
      [
        'meta',
        {
          property: 'twitter:image',
          content: 'title.png',
        },
      ],
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
      ['link', { rel: 'icon', href: 'favicon.png' }],
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
