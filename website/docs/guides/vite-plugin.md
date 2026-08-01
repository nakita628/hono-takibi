---
title: Vite Plugin
prev: 
  text: 'Vendor'
  link: '/docs/guides/vendor'
next:
  text: 'Docs'
  link: '/docs'
---

# Vite Plugin

Watches your OpenAPI spec and `hono-takibi.config.ts` for changes, then auto-regenerates code on save.

Requires `hono-takibi.config.ts` in your project root.

```ts
// vite.config.ts
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honoTakibiVite()],
})
```

## Demo

![](../../public/vite/hono-takibi-vite.gif)