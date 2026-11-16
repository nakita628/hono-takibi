import { isMode } from '../openapi'
import type { MODES } from '../openapi'

// A share link carries everything in the URL hash, so the site stays static.
// - `#z=<mode>.<data>`: the source deflated, then base64url-encoded.
// - `#url=<address>`: the address the source is fetched from, so the link stays
//   short however large the source is. The host must allow cross-origin reads.
// - `#code=<base64 JSON>`: the uncompressed form older links use; it is still
//   read, never written.
const COMPRESSED_PREFIX = '#z='
const URL_PREFIX = '#url='
const LEGACY_PREFIX = '#code='

type Mode = (typeof MODES)[number]
type Share = { readonly mode: Mode; readonly source: string; readonly url?: string }
type Decoded =
  | { readonly ok: true; readonly value: Share }
  | { readonly ok: false; readonly error: string }

function toBase64Url(bytes: Uint8Array) {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/[=]+$/u, '')
}

function fromBase64(text: string) {
  return Uint8Array.from(atob(text.replaceAll('-', '+').replaceAll('_', '/')), (char) =>
    char.charCodeAt(0),
  )
}

async function deflate(text: string) {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('deflate-raw'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

function inflate(bytes: Uint8Array<ArrayBuffer>) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
  return new Response(stream).text()
}

function decodeLegacy(encoded: string): Share | null {
  const payload: unknown = JSON.parse(new TextDecoder().decode(fromBase64(encoded)))
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
}

async function decodeCompressed(body: string): Promise<Share | null> {
  const separator = body.indexOf('.')
  const mode = body.slice(0, separator)
  if (separator === -1 || !isMode(mode)) return null
  return { mode, source: await inflate(fromBase64(body.slice(separator + 1))) }
}

// The file extension decides the mode; an address without a telling one falls
// back on the content, where only JSON starts with a brace.
function inferMode(pathname: string, source: string): Mode {
  if (/\.tsp$/iu.test(pathname)) return 'typespec'
  if (/\.json$/iu.test(pathname)) return 'json'
  if (/\.ya?ml$/iu.test(pathname)) return 'yaml'
  return source.trimStart().startsWith('{') ? 'json' : 'yaml'
}

async function fetchShare(address: string): Promise<Decoded> {
  const url = URL.canParse(address) ? new URL(address) : null
  if (!url || !/^https?:$/u.test(url.protocol)) {
    return { ok: false, error: `Cannot load ${address}: not an http(s) URL` }
  }
  try {
    const response = await fetch(url, { credentials: 'omit' })
    if (!response.ok) {
      return { ok: false, error: `Cannot load ${url.href}: HTTP ${response.status}` }
    }
    const source = await response.text()
    return { ok: true, value: { mode: inferMode(url.pathname, source), source, url: url.href } }
  } catch {
    return {
      ok: false,
      error: `Cannot load ${url.href}: the request failed. The host must allow cross-origin requests.`,
    }
  }
}

export async function encodeShare(payload: { readonly mode: string; readonly source: string }) {
  return `${COMPRESSED_PREFIX}${payload.mode}.${toBase64Url(await deflate(payload.source))}`
}

export function encodeUrlShare(url: string) {
  return `${URL_PREFIX}${url}`
}

// `null` means the hash holds no share, or one too broken to read.
export async function decodeShare(hash: string): Promise<Decoded | null> {
  if (hash.startsWith(URL_PREFIX)) return fetchShare(hash.slice(URL_PREFIX.length))
  try {
    const share = hash.startsWith(LEGACY_PREFIX)
      ? decodeLegacy(hash.slice(LEGACY_PREFIX.length))
      : hash.startsWith(COMPRESSED_PREFIX)
        ? await decodeCompressed(hash.slice(COMPRESSED_PREFIX.length))
        : null
    return share && { ok: true, value: share }
  } catch {
    return null
  }
}
