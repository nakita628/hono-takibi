---
title: Vite Plugin
prev:
  text: 'Vendor Extensions'
  link: '/docs/guides/vendor'
next: false
---

# Vite Plugin

Runs `hono-takibi.config.ts` from the Vite dev server. Saving the spec or the config regenerates the code.

```ts
// vite.config.ts
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honoTakibiVite()],
})
```

The config file must be at the project root. See [Configuration](/docs/guides/config) for its contents.

## Demo

![Vite plugin regenerating code on save](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)
