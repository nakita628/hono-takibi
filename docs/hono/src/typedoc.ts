// generate-docs.ts
import { Application } from 'typedoc'

const app = await Application.bootstrapWithPlugins({
  entryPoints: ['../../packages/**/*.ts'],
  exclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.test.ts',
    '**/*.d.ts',
    'packages/hono-takibi/routes/*.ts',
    'packages/hono-takibi/vite.config.ts',
    'packages/hono-takibi/vitest.config.ts',
    '**/test/**',
    '**/tests/**',
    '**/coverage/**',
  ],
  out: 'public',
  skipErrorChecking: true,
  tsconfig: 'tsconfig.json',
  plugin: ['typedoc-plugin-mermaid'],
})

const project = await app.convert()
if (!project) {
  throw new Error('convert failed')
}
await app.generateDocs(project, 'public')
