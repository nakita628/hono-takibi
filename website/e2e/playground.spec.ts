import { expect, type Page, test } from '@playwright/test'

const TYPESPEC_SOURCE = `import "@typespec/http";

using Http;

@service(#{ title: "Hono Takibi API" })
namespace HonoTakibi;

@example(#{ message: "Hono Takibi🔥" })
model Message {
  message: string;
}

@get op welcome(): Message;
`

const YAML_SOURCE = `openapi: 3.1.0
info:
  title: Hono Takibi API
  version: '1.0.0'
paths:
  /:
    get:
      summary: Welcome
      description: Returns a welcome message from Hono Takibi.
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Hono Takibi🔥
                required:
                  - message
`

const TYPESPEC_EXPECTED = `import { createRoute, z } from '@hono/zod-openapi'

const MessageSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], example: { message: 'Hono Takibi🔥' } })
  .openapi('Message')

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  operationId: 'welcome',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: MessageSchema } },
    },
  },
})
`

const YAML_EXPECTED = `import { createRoute, z } from '@hono/zod-openapi'

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Welcome',
  description: 'Returns a welcome message from Hono Takibi.',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono Takibi🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
`

const JSON_EXPECTED = `import { createRoute, z } from '@hono/zod-openapi'

const MessageSchema = z
  .object({ message: z.string().openapi({ example: 'Hono Takibi🔥' }) })
  .openapi({ required: ['message'] })
  .openapi('Message')

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Welcome',
  description: 'Returns a welcome message from Hono Takibi.',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: MessageSchema } } },
  },
})
`

function encodeShare(payload: { readonly mode: string; readonly source: string }) {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64')
}

async function expectCopiedOutput(page: Page, expected: string) {
  await page.locator('.pg-button', { hasText: /^(Copy|Copied!)$/ }).click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()), { timeout: 30_000 })
    .toBe(expected)
}

test.describe('Playground', () => {
  test('renders the toolbar and both editors', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-select')).toBeVisible()
    await expect(page.locator('.pg-select option')).toHaveText([
      'TypeSpec',
      'OpenAPI (YAML)',
      'OpenAPI (JSON)',
    ])
    await expect(page.locator('.pg-button', { hasText: 'Share' })).toBeVisible()
    await expect(page.locator('.pg-button', { hasText: 'Copy' })).toBeVisible()
    await expect(page.locator('.pg-pane .monaco-editor')).toHaveCount(2)
  })

  test('generates Hono code from the default TypeSpec sample', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expectCopiedOutput(page, TYPESPEC_EXPECTED)
  })

  test('generates Hono code from the OpenAPI (YAML) sample', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expectCopiedOutput(page, YAML_EXPECTED)
  })

  test('generates Hono code from the OpenAPI (JSON) sample', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (JSON)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expectCopiedOutput(page, JSON_EXPECTED)
  })

  test('shows an error and keeps stale output for non-document YAML input', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('oops')
    await expect(page.locator('.pg-error')).toHaveText('Input must be an OpenAPI document (object)')
    await expect(page.locator('.pg-pane').nth(1)).toHaveClass(/pg-stale/)
  })

  test('recovers from an error when the input becomes valid again', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('oops')
    await expect(page.locator('.pg-error')).toHaveText('Input must be an OpenAPI document (object)')
    await page.evaluate((source) => navigator.clipboard.writeText(source), YAML_SOURCE)
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('ControlOrMeta+v')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expect(page.locator('.pg-pane').nth(1)).not.toHaveClass(/pg-stale/)
    await expectCopiedOutput(page, YAML_EXPECTED)
  })

  test('shows a parse error for invalid JSON input', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (JSON)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('oops')
    await expect(page.locator('.pg-error')).toBeVisible()
    await expect(page.locator('.pg-error')).not.toHaveClass(/pg-hint/)
    await expect(page.locator('.pg-pane').nth(1)).toHaveClass(/pg-stale/)
  })

  test('shows the compile hint for invalid TypeSpec input', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('oops')
    await expect(page.locator('.pg-error')).toHaveText(
      'TypeSpec compile failed — fix the errors highlighted in the editor',
    )
    await expect(page.locator('.pg-error')).toHaveClass(/pg-hint/)
    await expect(page.locator('.pg-pane').nth(1)).toHaveClass(/pg-stale/)
  })

  test('Share copies a URL that encodes the current mode and source', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-button', { hasText: 'Share' }).click()
    await expect(page.locator('.pg-button', { hasText: 'Copied URL!' })).toBeVisible()
    const url = await page.evaluate(() => navigator.clipboard.readText())
    expect(url).toBe(
      `http://localhost:4173/playground#code=${encodeShare({
        mode: 'typespec',
        source: TYPESPEC_SOURCE,
      })}`,
    )
    await page.goto(url)
    // Navigating to the same path with only a hash change is a same-document
    // navigation; reload so the playground decodes the shared payload on setup.
    await page.reload()
    await expect(page.locator('.pg-select')).toHaveValue('TypeSpec')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await expectCopiedOutput(page, TYPESPEC_EXPECTED)
  })

  test('restores mode and source from a shared URL', async ({ page }) => {
    const hash = encodeShare({ mode: 'yaml', source: YAML_SOURCE })
    await page.goto(`/playground#code=${hash}`)
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expectCopiedOutput(page, YAML_EXPECTED)
  })
})
