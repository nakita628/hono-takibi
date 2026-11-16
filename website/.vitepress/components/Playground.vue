<script setup lang="ts">
import type { MonacoEditor } from '@guolao/vue-monaco-editor'
import { loader, VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { useData } from 'vitepress'
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

import {
  configureTypeScriptDefaults,
  decodeShare,
  DEFAULT_GENERATE_OPTIONS,
  encodeShare,
  encodeUrlShare,
  generate,
  loadMonaco,
  loadOutputEditorTypes,
  loadTypeSpecContext,
  MAIN_URI,
  SAMPLES,
  TYPESPEC_COMPILE_FAILED_PREFIX,
} from '../lib'
import type { TypeSpecMarker } from '../lib'
import MockReference from './MockReference.vue'

const monacoRef = shallowRef<MonacoEditor | null>(null)
const monacoReady = ref(false)
const monacoSetup = { done: false }

function setupMonaco(monaco: MonacoEditor) {
  monacoRef.value = monaco
  if (monacoSetup.done) return
  monacoSetup.done = true

  configureTypeScriptDefaults(monaco)
  void loadOutputEditorTypes(monaco)
}

// The language server paints only tag markers; error / warning squiggles come
// from the playground's own compilation (see lib/typespec).
function paintMarkers(markers: readonly TypeSpecMarker[]) {
  const monaco = monacoRef.value
  const model = monaco?.editor.getModel(monaco.Uri.parse(MAIN_URI))
  if (!monaco || !model) return
  const severity = {
    error: monaco.MarkerSeverity.Error,
    warning: monaco.MarkerSeverity.Warning,
  }
  monaco.editor.setModelMarkers(
    model,
    'typespec',
    markers.map((marker) => ({ ...marker, severity: severity[marker.severity] })),
  )
}

const { isDark } = useData()
const monacoTheme = computed(() => (isDark.value ? 'typespec-dark' : 'typespec'))

const firstSample = SAMPLES[0]
const sampleName = ref(firstSample.name)
const activeSample = computed(() => SAMPLES.find((s) => s.name === sampleName.value) ?? firstSample)
const input = ref(firstSample.source)
const output = shallowRef('// Generating ...')
// The last document that generated successfully; the Mock view runs its server.
const openAPIDocument = shallowRef<{ readonly [key: string]: unknown } | null>(null)
const VIEWS = [
  { id: 'code', label: 'Code' },
  { id: 'mock', label: 'Mock' },
] as const
const view = ref<(typeof VIEWS)[number]['id']>('code')
const error = ref('')
const errorIsHint = ref(false)
const outputStale = ref(false)
const copied = ref(false)
const shared = ref(false)
const shareNote = ref('')
// Past this length a link risks being cut off where it is pasted: chat apps
// cap a message at a few thousand characters.
const SHARE_URL_WARN_LENGTH = 2000
// What a `#url=` link loaded. While the input still matches it, Share hands
// that short link back instead of embedding the source.
const remote = shallowRef<{
  readonly url: string
  readonly mode: string
  readonly source: string
} | null>(null)

async function run() {
  const mode = activeSample.value.mode
  const result = await generate(input.value, mode, DEFAULT_GENERATE_OPTIONS)
  paintMarkers(result.markers)
  if (result.ok) {
    output.value = result.value
    openAPIDocument.value = result.document
    error.value = ''
    errorIsHint.value = false
    outputStale.value = false
  } else {
    outputStale.value = true
    errorIsHint.value =
      mode === 'typespec' && result.error.startsWith(TYPESPEC_COMPILE_FAILED_PREFIX)
    error.value = errorIsHint.value
      ? 'TypeSpec compile failed — fix the errors highlighted in the editor'
      : result.error
  }
}

const timer: { id?: ReturnType<typeof setTimeout> } = {}
watch(input, () => {
  clearTimeout(timer.id)
  timer.id = setTimeout(run, 300)
})

watch(sampleName, () => {
  input.value = activeSample.value.source
})

async function applyShare(restored: {
  readonly mode: string
  readonly source: string
  readonly url?: string
}) {
  // Selecting the sample resets the input to that sample's source, so let
  // that watcher flush before putting the shared source in.
  sampleName.value = SAMPLES.find((s) => s.mode === restored.mode)?.name ?? firstSample.name
  await nextTick()
  input.value = restored.source
  remote.value = restored.url
    ? { url: restored.url, mode: restored.mode, source: restored.source }
    : null
}

// A share link pasted into a tab that already shows the playground changes
// only the hash, so nothing remounts; the input watcher regenerates.
async function onHashChange() {
  const restored = await decodeShare(location.hash)
  if (!restored) return
  if (restored.ok) {
    await applyShare(restored.value)
  } else {
    error.value = restored.error
    errorIsHint.value = false
  }
}

onMounted(async () => {
  // The TypeSpec context registers the editor language and the `typespec` /
  // `typespec-dark` themes, so both editors wait for it alongside monaco.
  const [monaco, , restored] = await Promise.all([
    loadMonaco(),
    loadTypeSpecContext(),
    decodeShare(location.hash),
  ])
  if (restored?.ok) {
    await applyShare(restored.value)
    await nextTick()
    clearTimeout(timer.id)
  }
  loader.config({ monaco })
  monacoReady.value = true
  await run()
  // A successful run clears the error, so a failed share is reported after it.
  if (restored && !restored.ok) error.value = restored.error
  globalThis.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  globalThis.removeEventListener('hashchange', onHashChange)
})

async function copy() {
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

async function share() {
  const payload = { mode: activeSample.value.mode, source: input.value }
  const loaded = remote.value
  const hash =
    loaded && loaded.mode === payload.mode && loaded.source === payload.source
      ? encodeUrlShare(loaded.url)
      : await encodeShare(payload)
  const url = `${location.origin}${location.pathname}${hash}`
  await navigator.clipboard.writeText(url)
  shared.value = true
  setTimeout(() => {
    shared.value = false
  }, 1500)
  if (url.length > SHARE_URL_WARN_LENGTH) {
    shareNote.value = `${url.length.toLocaleString('en-US')} characters — a link this long can be cut off where you paste it`
    setTimeout(() => {
      shareNote.value = ''
    }, 6000)
  }
}

const editorOptions = {
  minimap: { enabled: false },
  fontSize: 13,
  automaticLayout: true,
  scrollBeyondLastLine: false,
  tabSize: 2,
  // Without this, registered semantic tokens providers are silently ignored
  // by the standalone editor.
  'semanticHighlighting.enabled': true,
}

const outputOptions = { ...editorOptions, readOnly: true }
</script>

<template>
  <div class="flex h-[calc(100dvh-var(--vp-nav-height))] flex-col">
    <div
      class="flex flex-wrap items-center gap-3 border-b border-(--vp-c-divider) px-3 py-2 text-[13px]"
    >
      <select
        v-model="sampleName"
        class="pg-select rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg) px-2 py-1 text-(--vp-c-text-1)"
      >
        <option v-for="s in SAMPLES" :key="s.name" :value="s.name">{{ s.name }}</option>
      </select>
      <div
        class="pg-views flex overflow-hidden rounded-md border border-(--vp-c-divider)"
        role="group"
        aria-label="Output view"
      >
        <button
          v-for="v in VIEWS"
          :key="v.id"
          class="pg-view px-3 py-1"
          :class="
            view === v.id
              ? 'bg-(--vp-c-brand-soft) text-(--vp-c-brand-1)'
              : 'bg-(--vp-c-bg-soft) text-(--vp-c-text-2) hover:text-(--vp-c-brand-1)'
          "
          type="button"
          :aria-pressed="view === v.id"
          @click="view = v.id"
        >
          {{ v.label }}
        </button>
      </div>
      <span class="flex-1" />
      <span v-if="shareNote" class="pg-share-note text-(--vp-c-text-2)">{{ shareNote }}</span>
      <button
        class="pg-button rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg-soft) px-3 py-1 text-(--vp-c-text-1) hover:border-(--vp-c-brand-1) hover:text-(--vp-c-brand-1)"
        type="button"
        @click="share"
      >
        {{ shared ? 'Copied URL!' : 'Share' }}
      </button>
      <button
        class="pg-button rounded-md border border-(--vp-c-divider) bg-(--vp-c-bg-soft) px-3 py-1 text-(--vp-c-text-1) hover:border-(--vp-c-brand-1) hover:text-(--vp-c-brand-1)"
        type="button"
        @click="copy"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <div
      v-if="monacoReady"
      class="grid min-h-0 flex-1 grid-cols-[1fr_1fr] narrow:grid-cols-[1fr] narrow:grid-rows-[1fr_1fr]"
    >
      <div class="pg-pane flex min-h-0 min-w-0 flex-col">
        <VueMonacoEditor
          v-model:value="input"
          :language="activeSample.language"
          :path="activeSample.path"
          :theme="monacoTheme"
          :options="editorOptions"
          @before-mount="setupMonaco"
        />
      </div>
      <div
        class="pg-pane flex min-h-0 min-w-0 flex-col border-l border-(--vp-c-divider) narrow:border-t narrow:border-l-0"
        :class="{ 'pg-stale opacity-55': outputStale }"
      >
        <div
          v-if="error"
          class="pg-error max-h-[30%] overflow-auto border-b border-(--vp-c-divider) px-3 py-2 font-(family-name:--vp-font-family-mono) text-[12px] leading-[normal] whitespace-pre-wrap"
          :class="errorIsHint ? 'pg-hint text-(--vp-c-text-2)' : 'text-(--vp-c-danger-1)'"
          >{{ error }}</div
        >
        <VueMonacoEditor
          v-if="view === 'code'"
          :value="output"
          language="typescript"
          path="file:///output.ts"
          :theme="monacoTheme"
          :options="outputOptions"
          @before-mount="setupMonaco"
        />
        <MockReference v-else-if="openAPIDocument" :document="openAPIDocument" />
      </div>
    </div>
  </div>
</template>
