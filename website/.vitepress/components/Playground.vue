<script setup lang="ts">
import type { MonacoEditor } from '@guolao/vue-monaco-editor'
import { loader, VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { useData } from 'vitepress'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

import {
  configureTypeScriptDefaults,
  DEFAULT_GENERATE_OPTIONS,
  generate,
  initTypeSpecMonaco,
  isMode,
  loadMonaco,
  loadOutputEditorTypes,
  loadTypeSpecContext,
  MAIN_URI,
  registerTypeSpecLanguage,
  SAMPLES,
  TYPESPEC_COMPILE_FAILED_PREFIX,
} from '../lib'
const monacoRef = shallowRef<MonacoEditor | null>(null)
const monacoReady = ref(false)
const monacoSetup = { done: false }

function setupMonaco(monaco: MonacoEditor) {
  monacoRef.value = monaco
  if (monacoSetup.done) return
  monacoSetup.done = true

  registerTypeSpecLanguage(monaco)
  configureTypeScriptDefaults(monaco)
  void loadOutputEditorTypes(monaco)
  ensureTypeSpecLanguage()
}

const languageInit = { started: false }

function ensureTypeSpecLanguage() {
  const monaco = monacoRef.value
  if (languageInit.started || !monaco || activeSample.value.mode !== 'typespec') return
  languageInit.started = true
  void loadTypeSpecContext()
    .then((context) => initTypeSpecMonaco(monaco, context))
    .catch(() => {
      languageInit.started = false
    })
}

const { isDark } = useData()
const monacoTheme = computed(() => (isDark.value ? 'typespec-dark' : 'typespec'))

function decodeShare() {
  if (typeof location === 'undefined' || !location.hash.startsWith('#code=')) return null
  try {
    const bytes = Uint8Array.from(atob(location.hash.slice('#code='.length)), (c) =>
      c.charCodeAt(0),
    )
    const payload: unknown = JSON.parse(new TextDecoder().decode(bytes))
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'mode' in payload &&
      'source' in payload &&
      typeof payload.source === 'string' &&
      isMode(payload.mode)
    ) {
      return { mode: payload.mode, source: payload.source }
    }
    return null
  } catch {
    return null
  }
}

function encodeShare(payload: { readonly mode: string; readonly source: string }) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload))
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(''))
}

const firstSample = SAMPLES[0]
const decoded = decodeShare()
const initialSample = decoded
  ? (SAMPLES.find((s) => s.mode === decoded.mode) ?? firstSample)
  : firstSample
const sampleName = ref(initialSample.name)
const activeSample = computed(() => SAMPLES.find((s) => s.name === sampleName.value) ?? firstSample)
const input = ref(decoded?.source ?? firstSample.source)
const output = shallowRef('// Generating ...')
const error = ref('')
const errorIsHint = ref(false)
const outputStale = ref(false)
const copied = ref(false)
const shared = ref(false)

async function run() {
  const mode = activeSample.value.mode
  const result = await generate(input.value, mode, DEFAULT_GENERATE_OPTIONS)
  if (result.ok) {
    output.value = result.value
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
  const monaco = monacoRef.value
  if (activeSample.value.mode === 'typespec') {
    ensureTypeSpecLanguage()
  } else if (monaco) {
    const model = monaco.editor.getModel(monaco.Uri.parse(MAIN_URI))
    if (model) {
      monaco.editor.setModelMarkers(model, 'typespec', [])
    }
  }
})

onMounted(async () => {
  loader.config({ monaco: await loadMonaco() })
  monacoReady.value = true
  await run()
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
  const url = `${location.origin}${location.pathname}#code=${encodeShare(payload)}`
  await navigator.clipboard.writeText(url)
  shared.value = true
  setTimeout(() => {
    shared.value = false
  }, 1500)
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
  <div class="pg">
    <div class="pg-toolbar">
      <select v-model="sampleName" class="pg-select">
        <option v-for="s in SAMPLES" :key="s.name" :value="s.name">{{ s.name }}</option>
      </select>
      <span class="pg-spacer" />
      <button class="pg-button" type="button" @click="share">
        {{ shared ? 'Copied URL!' : 'Share' }}
      </button>
      <button class="pg-button" type="button" @click="copy">
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <div v-if="monacoReady" class="pg-split">
      <div class="pg-pane">
        <VueMonacoEditor
          v-model:value="input"
          :language="activeSample.language"
          :path="activeSample.path"
          :theme="monacoTheme"
          :options="editorOptions"
          @before-mount="setupMonaco"
        />
      </div>
      <div class="pg-pane" :class="{ 'pg-stale': outputStale }">
        <div v-if="error" class="pg-error" :class="{ 'pg-hint': errorIsHint }">{{ error }}</div>
        <VueMonacoEditor
          :value="output"
          language="typescript"
          path="file:///output.ts"
          :theme="monacoTheme"
          :options="outputOptions"
          @before-mount="setupMonaco"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pg {
  display: flex;
  flex-direction: column;
  height: calc(100dvh - var(--vp-nav-height));
}
.pg-toolbar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
}
.pg-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.pg-spacer {
  flex: 1;
}
.pg-button {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.pg-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.pg-split {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.pg-pane {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.pg-pane + .pg-pane {
  border-left: 1px solid var(--vp-c-divider);
}
.pg-stale {
  opacity: 0.55;
}
.pg-error {
  padding: 0.5rem 0.75rem;
  color: var(--vp-c-danger-1);
  white-space: pre-wrap;
  font: 12px var(--vp-font-family-mono);
  border-bottom: 1px solid var(--vp-c-divider);
  max-height: 30%;
  overflow: auto;
}
.pg-hint {
  color: var(--vp-c-text-2);
}
@media (max-width: 768px) {
  .pg-split {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .pg-pane + .pg-pane {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}
</style>
