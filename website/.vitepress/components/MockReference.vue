<script setup lang="ts">
import type { ApiReference as ApiReferenceComponent } from '@scalar/api-reference'
import { useData } from 'vitepress'
import { computed, defineAsyncComponent, ref, shallowRef, watch } from 'vue'

import {
  createMockServer,
  isMockLocale,
  isMockRequest,
  MOCK_LOCALES,
  MOCK_SERVER_URL,
  type MockLocale,
  type MockOptions,
  type MockServer,
  unavailableResponse,
} from '../lib'

const props = defineProps<{
  readonly document: { readonly [key: string]: unknown }
}>()

type Configuration = InstanceType<typeof ApiReferenceComponent>['$props']['configuration']

// @scalar/api-reference and its stylesheet stay behind this dynamic import so
// the page chunk never carries them; they load the first time the view opens.
const ApiReference = defineAsyncComponent(async () => {
  const [scalar] = await Promise.all([
    import('@scalar/api-reference'),
    import('@scalar/api-reference/style.css'),
  ])
  return scalar.ApiReference
})

const { isDark } = useData()
const server = shallowRef<MockServer | null>(null)
const error = ref('')
const building = ref(true)
const build = { generation: 0 }

// The `mock` options of a hono-takibi config that change what the server
// answers, each as the form holds it: an empty number field means "not set".
const EXAMPLES = [
  { value: 'true', label: 'Response examples' },
  { value: 'all', label: 'All examples' },
  { value: 'false', label: 'Never' },
] as const
const examples = ref<(typeof EXAMPLES)[number]['value']>('true')
const locale = ref<MockLocale>('en')
const seed = ref('')
const delay = ref('')
const arrayMin = ref('')
const arrayMax = ref('')

// A number field as an option entry: `{}` when it is empty or not a count.
function integerOption<K extends string>(key: K, field: string): { readonly [key in K]?: number } {
  const value = Number.parseInt(field, 10)
  return Number.isNaN(value) || value < 0 ? {} : { [key]: value }
}

const options = computed<MockOptions & { readonly locale?: MockLocale }>(() => ({
  useExamples: examples.value === 'true' ? true : examples.value === 'all' ? 'all' : false,
  ...(locale.value === 'en' ? {} : { locale: locale.value }),
  ...integerOption('seed', seed.value),
  ...integerOption('delay', delay.value),
  ...integerOption('arrayMin', arrayMin.value),
  ...integerOption('arrayMax', arrayMax.value),
}))

function selectLocale(event: Event) {
  const value = event.target instanceof HTMLSelectElement ? event.target.value : ''
  if (isMockLocale(value)) locale.value = value
}

// Each document or option change rebuilds the server; a build that finishes
// after a newer one started is dropped so the reference never answers from a
// stale document.
async function rebuild([source, mockOptions]: readonly [
  { readonly [key: string]: unknown },
  MockOptions & { readonly locale?: MockLocale },
]) {
  build.generation += 1
  const generation = build.generation
  building.value = true
  const result = await createMockServer(source, mockOptions, server.value)
  if (generation !== build.generation) return
  building.value = false
  if (result.ok) {
    server.value = result.value
    error.value = ''
  } else {
    server.value = null
    error.value = result.error
  }
}

watch([() => props.document, options], rebuild, { immediate: true })

// Requests to this page's origin are answered in this page by the generated
// app; anything else (a server the visitor typed into the reference) goes to
// the network as it would from any API client.
async function customFetch(input: string | URL | Request, init?: RequestInit) {
  if (!isMockRequest(input)) return fetch(input, init)
  const current = server.value
  if (!current) {
    return unavailableResponse(
      building.value
        ? 'The mock server is still building.'
        : `The mock server failed to build: ${error.value}`,
    )
  }
  return current.fetch(input, init)
}

const configuration = computed<Configuration>(() => ({
  // Scalar annotates the document it is given (its selected server, for one);
  // a copy keeps those marks out of the document the generator reads.
  content: structuredClone(props.document),
  servers: [{ url: MOCK_SERVER_URL, description: 'hono-takibi mock (answered in this page)' }],
  customFetch,
  proxyUrl: '',
  forceDarkModeState: isDark.value ? 'dark' : 'light',
  hideDarkModeToggle: true,
  // Scalar's fonts come from its CDN; the site serves nothing third-party.
  withDefaultFonts: false,
  hideClientButton: true,
  hiddenClients: true,
  showSidebar: false,
  hideSearch: true,
  documentDownloadType: 'none',
  // The localhost-only developer toolbar and the hosted AI agent are Scalar's
  // own services; the pane shows the document and its Test Request only.
  showDeveloperTools: 'never',
  showToolbar: 'never',
  agent: { disabled: true },
  persistAuth: false,
  telemetry: false,
}))
</script>

<template>
  <div class="pg-mock flex min-h-0 flex-1 flex-col">
    <form
      class="pg-mock-options flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-(--vp-c-divider) px-3 py-2 text-[12px] text-(--vp-c-text-2)"
      @submit.prevent
    >
      <label class="flex items-center gap-1.5">
        Examples
        <select
          v-model="examples"
          class="pg-select rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
        >
          <option v-for="e in EXAMPLES" :key="e.value" :value="e.value">{{ e.label }}</option>
        </select>
      </label>
      <label class="flex items-center gap-1.5">
        Locale
        <select
          :value="locale"
          class="pg-select rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
          @change="selectLocale"
        >
          <option v-for="l in MOCK_LOCALES" :key="l" :value="l">{{ l }}</option>
        </select>
      </label>
      <label class="flex items-center gap-1.5">
        Seed
        <input
          v-model="seed"
          class="pg-input w-16 rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
          type="number"
          min="0"
          placeholder="none"
        />
      </label>
      <label class="flex items-center gap-1.5">
        Delay (ms)
        <input
          v-model="delay"
          class="pg-input w-16 rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
          type="number"
          min="0"
          placeholder="0"
        />
      </label>
      <label class="flex items-center gap-1.5">
        Array min
        <input
          v-model="arrayMin"
          class="pg-input w-14 rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
          type="number"
          min="0"
          placeholder="1"
        />
      </label>
      <label class="flex items-center gap-1.5">
        Array max
        <input
          v-model="arrayMax"
          class="pg-input w-14 rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
          type="number"
          min="0"
          placeholder="10"
        />
      </label>
      <span
        v-if="building"
        class="pg-mock-status text-(--vp-c-text-3)"
        role="status"
        aria-live="polite"
        >Building…</span
      >
    </form>
    <div
      v-if="error"
      class="pg-error max-h-[30%] overflow-auto border-b border-(--vp-c-divider) px-3 py-2 font-(family-name:--vp-font-family-mono) text-[12px] leading-[normal] whitespace-pre-wrap text-(--vp-c-danger-1)"
      >{{ error }}</div
    >
    <div class="pg-scalar min-h-0 flex-1 overflow-auto">
      <ApiReference :configuration="configuration" />
    </div>
  </div>
</template>
