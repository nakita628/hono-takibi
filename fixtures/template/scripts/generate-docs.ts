import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'yaml'
import widdershins from 'widdershins'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const spec = yaml.parse(fs.readFileSync(path.join(root, 'openapi.yaml'), 'utf8'))

const options = {
  language_tabs: [{ shell: 'Shell' }],
  codeSamples: true,
  httpsnippet: false,
  tocSummary: true,
  headings: 2,
  omitBody: false,
  expandBody: true,
  sample: true,
  resolve: true,
}

const markdown = await widdershins.convert(spec, options)
const output = path.join(root, 'src', 'api-reference.md')
fs.writeFileSync(output, markdown, 'utf8')
console.log(`Generated: ${output}`)
