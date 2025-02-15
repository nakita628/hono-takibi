import SwaggerParser from '@apidevtools/swagger-parser'
import fs from 'node:fs'
import path from 'node:path'
import { generateZodOpenAPIHono } from '../generators/hono/openapi/generate-zod-openapi-hono'
import type { OpenAPISpec } from '../types'
import type { Config } from '../config'
import { getConfig } from '../config'
import { formatCode } from '../format'

export async function viteMode(config: Config = getConfig()) {
  try {
    if (config.input) {
      const openAPI = (await SwaggerParser.parse(config.input)) as OpenAPISpec
      const hono = generateZodOpenAPIHono(openAPI, config)
      const formattedCode = await formatCode(hono)
      if (config.output) {
        const outputDir = path.dirname(config.output)
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true })
        }
        fs.writeFileSync(config.output, formattedCode, { encoding: 'utf-8' })
        console.log(`Generated code written to ${config.output}`)
        return true
      }
    }
  } catch (e) {
    console.error('Usage: hono-takibi <input-file> [-o output-file]')
    return false
  }
}
