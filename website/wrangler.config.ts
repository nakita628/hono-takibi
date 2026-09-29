import { defineWranglerConfig } from 'wrangler/experimental-config'

// oxlint-disable-next-line import/no-default-export -- cf resolves the config through its default export
export default defineWranglerConfig({
  types: {
    generate: false,
  },
  assetsDirectory: './.vitepress/dist',
})
