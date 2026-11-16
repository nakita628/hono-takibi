import { isMode } from '../openapi'

// A share link carries the whole source in the URL hash, so the site stays
// static. `#z=<mode>.<data>` is the current form: the source deflated, then
// base64url-encoded. `#code=<base64 JSON>` is the uncompressed form older
// links use; it is still read, never written.
const COMPRESSED_PREFIX = '#z='
const LEGACY_PREFIX = '#code='

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

function decodeLegacy(encoded: string) {
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

export async function encodeShare(payload: { readonly mode: string; readonly source: string }) {
  return `${COMPRESSED_PREFIX}${payload.mode}.${toBase64Url(await deflate(payload.source))}`
}

export async function decodeShare(hash: string) {
  try {
    if (hash.startsWith(LEGACY_PREFIX)) return decodeLegacy(hash.slice(LEGACY_PREFIX.length))
    if (!hash.startsWith(COMPRESSED_PREFIX)) return null
    const body = hash.slice(COMPRESSED_PREFIX.length)
    const separator = body.indexOf('.')
    const mode = body.slice(0, separator)
    if (separator === -1 || !isMode(mode)) return null
    return { mode, source: await inflate(fromBase64(body.slice(separator + 1))) }
  } catch {
    return null
  }
}
