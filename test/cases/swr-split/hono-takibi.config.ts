import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  swr: {
    split: true,
    output: '../../__generated__/swr-split',
    import: '../../hosts/users-client',
  },
})
