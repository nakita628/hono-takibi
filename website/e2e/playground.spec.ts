import { promisify } from 'node:util'
import { deflateRaw } from 'node:zlib'

import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const TYPESPEC_SOURCE = `import "@typespec/http";

using Http;

@service(#{ title: "Hono Takibi API" })
namespace HonoTakibi;

@example(#{ message: "Hono Takibi🔥" })
model Message {
  message: string;
}

@summary("Welcome")
@doc("Returns a welcome message from Hono Takibi.")
@returnsDoc("OK")
@get op welcome(): Message;
`

const YAML_SOURCE = `openapi: 3.0.0
info:
  title: Hono Takibi API
  version: 0.0.0
paths:
  /:
    get:
      operationId: welcome
      summary: Welcome
      description: Returns a welcome message from Hono Takibi.
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Message'
components:
  schemas:
    Message:
      type: object
      required:
        - message
      properties:
        message:
          type: string
      example:
        message: Hono Takibi🔥
`

// The three samples are one spec: the YAML and JSON are the OpenAPI the TypeSpec
// sample emits, so every mode generates this same code.
const EXPECTED = `import { createRoute, z } from '@hono/zod-openapi'

const MessageSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'], example: { message: 'Hono Takibi🔥' } })
  .openapi('Message')

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Welcome',
  description: 'Returns a welcome message from Hono Takibi.',
  operationId: 'welcome',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: MessageSchema } } },
  },
})
`

async function encodeShare(payload: { readonly mode: string; readonly source: string }) {
  const deflated = await promisify(deflateRaw)(payload.source)
  return `z=${payload.mode}.${deflated.toString('base64url')}`
}

// The uncompressed form links shared before compression still use.
function encodeLegacyShare(payload: { readonly mode: string; readonly source: string }) {
  return `code=${Buffer.from(JSON.stringify(payload), 'utf8').toString('base64')}`
}

async function expectCopiedOutput(page: Page, expected: string) {
  await page.locator('.pg-button', { hasText: /^(Copy|Copied!)$/u }).click()
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

  test('switches both editors to the dark theme with the site appearance', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/playground')
    const editors = page.locator('.pg-pane .monaco-editor')
    await expect(editors).toHaveCount(2)
    await expect(editors.nth(0)).toHaveClass(/\bvs\b/u)
    await expect(editors.nth(1)).toHaveClass(/\bvs\b/u)
    await page.locator('.VPSwitchAppearance').click()
    await expect(page.locator('html')).toHaveClass(/\bdark\b/u)
    await expect(editors.nth(0)).toHaveClass(/\bvs-dark\b/u)
    await expect(editors.nth(1)).toHaveClass(/\bvs-dark\b/u)
  })

  test('generates Hono code from the default TypeSpec sample', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expectCopiedOutput(page, EXPECTED)
  })

  test('generates Hono code from the OpenAPI (YAML) sample', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expectCopiedOutput(page, EXPECTED)
  })

  test('generates Hono code from the OpenAPI (JSON) sample', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (JSON)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expect(page.locator('.pg-error')).toBeHidden()
    await expectCopiedOutput(page, EXPECTED)
  })

  test('shows an error and keeps stale output for non-document YAML input', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('oops')
    await expect(page.locator('.pg-error')).toHaveText('Input must be an OpenAPI document (object)')
    await expect(page.locator('.pg-pane').nth(1)).toHaveClass(/pg-stale/u)
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
    await expect(page.locator('.pg-pane').nth(1)).not.toHaveClass(/pg-stale/u)
    await expectCopiedOutput(page, EXPECTED)
  })

  test('shows a parse error for invalid JSON input', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (JSON)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.type('oops')
    await expect(page.locator('.pg-error')).toBeVisible()
    await expect(page.locator('.pg-error')).not.toHaveClass(/pg-hint/u)
    await expect(page.locator('.pg-pane').nth(1)).toHaveClass(/pg-stale/u)
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
    await expect(page.locator('.pg-error')).toHaveClass(/pg-hint/u)
    await expect(page.locator('.pg-pane').nth(1)).toHaveClass(/pg-stale/u)
  })

  test('Share copies a URL that encodes the current mode and source', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-button', { hasText: 'Share' }).click()
    await expect(page.locator('.pg-button', { hasText: 'Copied URL!' })).toBeVisible()
    const url = await page.evaluate(() => navigator.clipboard.readText())
    // The deflate bytes are the browser's own, so only the shape is pinned here;
    // the reload below proves the link round-trips.
    expect(url).toMatch(/^http:\/\/localhost:4173\/playground#z=typespec\.[\w-]+$/u)
    const legacy = encodeLegacyShare({ mode: 'typespec', source: TYPESPEC_SOURCE })
    expect(url.length).toBeLessThan(`http://localhost:4173/playground#${legacy}`.length)
    await page.goto(url)
    // Navigating to the same path with only a hash change is a same-document
    // navigation; reload so the playground decodes the shared payload on setup.
    await page.reload()
    await expect(page.locator('.pg-select')).toHaveValue('TypeSpec')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await expectCopiedOutput(page, EXPECTED)
  })

  test('Mock view answers a Test Request from the generated mock server', async ({ page }) => {
    // The request goes to `/` on the site's own origin and must never reach it: the
    // generated app answers in-page. (The playground itself lives under /playground.)
    await page.route('http://localhost:4173/', (route) => route.abort())
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-view', { hasText: 'Mock' }).click()
    await expect(page.locator('.pg-view', { hasText: 'Mock' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect(page.locator('.pg-scalar')).toContainText('Hono Takibi API')
    await expect(page.locator('.pg-scalar')).toContainText('hono-takibi mock')
    await expect(page.locator('.pg-scalar')).not.toContainText('http://')
    await expect(page.locator('.pg-error')).toBeHidden()
    await page.locator('.show-api-client-button').click()
    await expect(page.getByRole('button', { name: /^Send get request to/u })).toHaveAccessibleName(
      'Send get request to /',
    )
    await page.getByRole('button', { name: /^Send/u }).first().click()
    // The client's response pane; the reference's own "200 OK" entry is a button.
    const response = page.getByRole('region', { name: 'Response' })
    await expect(response.getByRole('link', { name: '200 OK' })).toBeVisible()
    await expect(response).toContainText('"message"')
  })

  test('Mock options reshape the answer: examples and seed', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    // The sample's example sits on the whole `Message` object, which the mock
    // never answers with; `'all'` reads the examples of properties, so move it.
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.evaluate(
      (source) => navigator.clipboard.writeText(source),
      YAML_SOURCE.replace(
        `        message:
          type: string
      example:
        message: Hono Takibi🔥
`,
        `        message:
          type: string
          example: Hono Takibi🔥
`,
      ),
    )
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('ControlOrMeta+v')
    await page.locator('.pg-view', { hasText: 'Mock' }).click()
    await expect(page.locator('.pg-scalar')).toContainText('Hono Takibi API')
    const response = page.getByRole('region', { name: 'Response' })
    const body = response.getByRole('textbox')
    const send = page.getByRole('button', { name: /^Send/u }).first()
    const close = page.getByRole('button', { name: 'Close Client' })
    // Every option change rebuilds the server; a request sent before that
    // finishes is answered by the previous one.
    async function sendWith(configure: () => Promise<void>) {
      await configure()
      await expect(page.locator('.pg-mock-status')).toBeHidden()
      await page.locator('.show-api-client-button').click()
      await send.click()
    }
    await sendWith(() => page.getByLabel('Examples').selectOption('All examples'))
    await expect(body).toContainText('Hono Takibi🔥')
    await close.click()
    // A seed fixes the generated body: another seed changes it, the same one brings it back.
    await sendWith(async () => {
      await page.getByLabel('Examples').selectOption('Never')
      await page.getByLabel('Seed').fill('42')
    })
    await expect(body).toContainText('"message"')
    await expect(body).not.toContainText('Hono Takibi🔥')
    const seeded = /"message":\s*"([^"]+)"/u.exec(await body.innerText())?.[1] ?? ''
    expect(seeded).not.toBe('')
    await close.click()
    await sendWith(() => page.getByLabel('Seed').fill('7'))
    await expect(body).not.toContainText(seeded)
    await close.click()
    await sendWith(() => page.getByLabel('Seed').fill('42'))
    await expect(body).toContainText(seeded)
  })

  test('Mock locale ja answers locale-aware fields in Japanese', async ({ page }) => {
    await page.goto('/playground')
    await page.locator('.pg-select').selectOption('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    // `name` is one of the properties the generator maps to a faker function
    // that follows the locale (`person.fullName()`); a plain string does not.
    await page.locator('.pg-pane').first().locator('.monaco-editor').click()
    await page.evaluate(
      (source) => navigator.clipboard.writeText(source),
      YAML_SOURCE.replace(
        `        message:
          type: string
`,
        `        message:
          type: string
        name:
          type: string
`,
      ).replace('        - message\n', '        - message\n        - name\n'),
    )
    await page.keyboard.press('ControlOrMeta+a')
    await page.keyboard.press('ControlOrMeta+v')
    await page.locator('.pg-view', { hasText: 'Mock' }).click()
    await expect(page.locator('.pg-scalar')).toContainText('Hono Takibi API')
    await page.getByLabel('Locale').selectOption('ja')
    await expect(page.locator('.pg-mock-status')).toBeHidden()
    await page.locator('.show-api-client-button').click()
    await page.getByRole('button', { name: /^Send/u }).first().click()
    const body = page.getByRole('region', { name: 'Response' }).getByRole('textbox')
    await expect(body).toContainText('"name"')
    await expect(body).toHaveText(/"name":\s*"[^"]*[\u3040-\u30FF\u4E00-\u9FFF]/u)
  })

  test('Mock view follows the site appearance while open', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-view', { hasText: 'Mock' }).click()
    await expect(page.locator('.pg-scalar')).toContainText('Hono Takibi API')
    // Scalar expresses its color mode as a class on <body>.
    await expect(page.locator('body')).toHaveClass(/\blight-mode\b/u)
    await page.locator('.VPSwitchAppearance').click()
    await expect(page.locator('html')).toHaveClass(/\bdark\b/u)
    await expect(page.locator('body')).toHaveClass(/\bdark-mode\b/u)
    await expect(page.locator('.pg-scalar')).toContainText('Hono Takibi API')
    await page.locator('.VPSwitchAppearance').click()
    await expect(page.locator('body')).toHaveClass(/\blight-mode\b/u)
  })

  test('Code view returns after the Mock view', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-view', { hasText: 'Mock' }).click()
    await expect(page.locator('.pg-scalar')).toContainText('Hono Takibi API')
    await page.locator('.pg-view', { hasText: 'Code' }).click()
    await expect(page.locator('.pg-pane .monaco-editor')).toHaveCount(2)
    await expectCopiedOutput(page, EXPECTED)
  })

  test('restores mode and source from a shared URL', async ({ page }) => {
    const hash = await encodeShare({ mode: 'yaml', source: YAML_SOURCE })
    await page.goto(`/playground#${hash}`)
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expectCopiedOutput(page, EXPECTED)
  })

  test('still restores an uncompressed shared URL', async ({ page }) => {
    const hash = encodeLegacyShare({ mode: 'yaml', source: YAML_SOURCE })
    await page.goto(`/playground#${hash}`)
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expectCopiedOutput(page, EXPECTED)
  })

  test('restores a share pasted into an open playground', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    const hash = await encodeShare({ mode: 'yaml', source: YAML_SOURCE })
    await page.evaluate((next) => {
      location.hash = next
    }, hash)
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expectCopiedOutput(page, EXPECTED)
  })

  test('loads the source a #url= link points at and shares that link back', async ({ page }) => {
    await page.route('https://spec.example/openapi.yaml', (route) =>
      route.fulfill({
        body: YAML_SOURCE,
        contentType: 'text/yaml',
        headers: { 'access-control-allow-origin': '*' },
      }),
    )
    await page.goto('/playground#url=https://spec.example/openapi.yaml')
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expectCopiedOutput(page, EXPECTED)
    await page.locator('.pg-button', { hasText: 'Share' }).click()
    await expect(page.locator('.pg-button', { hasText: 'Copied URL!' })).toBeVisible()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'http://localhost:4173/playground#url=https://spec.example/openapi.yaml',
    )
  })

  test('opens the address typed into the toolbar and puts the link in the address bar', async ({
    page,
  }) => {
    await page.route('https://spec.example/openapi.yaml', (route) =>
      route.fulfill({
        body: YAML_SOURCE,
        contentType: 'text/yaml',
        headers: { 'access-control-allow-origin': '*' },
      }),
    )
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-url').fill('https://spec.example/openapi.yaml')
    await page.locator('.pg-url').press('Enter')
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page).toHaveURL(
      'http://localhost:4173/playground#url=https://spec.example/openapi.yaml',
    )
    // Opening the same address again changes no hash, and still reloads it.
    await page.locator('.pg-select').selectOption('TypeSpec')
    await expect(page.locator('.pg-pane').first()).toContainText('@service')
    await page.locator('.pg-button', { hasText: 'Open' }).click()
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
  })

  test('reads a GitHub file page address from the raw host', async ({ page }) => {
    await page.route(
      'https://raw.githubusercontent.com/owner/repo/main/api/openapi.yaml',
      (route) =>
        route.fulfill({
          body: YAML_SOURCE,
          contentType: 'text/plain',
          headers: { 'access-control-allow-origin': '*' },
        }),
    )
    await page.goto('/playground#url=https://github.com/owner/repo/blob/main/api/openapi.yaml')
    await expect(page.locator('.pg-select')).toHaveValue('OpenAPI (YAML)')
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('Welcome')
    await expectCopiedOutput(page, EXPECTED)
  })

  test('reports a #url= link that cannot be loaded', async ({ page }) => {
    await page.route('https://spec.example/missing.yaml', (route) =>
      route.fulfill({ status: 404, headers: { 'access-control-allow-origin': '*' } }),
    )
    await page.goto('/playground#url=https://spec.example/missing.yaml')
    await expect(page.locator('.pg-error')).toHaveText(
      'Cannot load https://spec.example/missing.yaml: HTTP 404',
    )
    await expect(page.locator('.pg-select')).toHaveValue('TypeSpec')
  })

  test('Share warns when the URL is long enough to be cut off', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('.pg-pane').nth(1)).toContainText('welcome')
    await page.locator('.pg-button', { hasText: 'Share' }).click()
    await expect(page.locator('.pg-button', { hasText: 'Copied URL!' })).toBeVisible()
    await expect(page.locator('.pg-share-note')).toHaveCount(0)

    // Hashes do not compress, so this source keeps its share URL long.
    const digests = await Promise.all(
      Array.from({ length: 60 }, async (_, index) => {
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${index}`))
        return Buffer.from(digest).toString('hex')
      }),
    )
    const source = `${YAML_SOURCE}${digests.map((digest) => `# ${digest}\n`).join('')}`
    await page.evaluate(
      (next) => {
        location.hash = next
      },
      await encodeShare({ mode: 'yaml', source }),
    )
    await expect(page.locator('.pg-pane').first()).toContainText('openapi:')
    await page.locator('.pg-button', { hasText: /^(Share|Copied URL!)$/u }).click()
    await expect(page.locator('.pg-share-note')).toContainText(
      'a link this long can be cut off where you paste it. For a short one, host the file and open it by URL.',
    )
  })
})
