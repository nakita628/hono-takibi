/**
 * Generates the `.refine()` chain for `unevaluatedProperties` per JSON Schema
 * 2020-12 §11.2. Used by both the dedicated `object()` generator and the
 * top-level allOf/anyOf/oneOf dispatch in `zodToOpenAPI` (so a schema like
 * `{ allOf: [...], unevaluatedProperties: false }` correctly enforces it).
 *
 * The generated refine:
 *   1. Pre-populates evaluated keys from own `properties` + `patternProperties`
 *      + `allOf` branches (which always validate)
 *   2. Conditionally adds keys from `anyOf`/`oneOf` branches whose `safeParse`
 *      succeeds at runtime
 *   3. Conditionally adds keys from `then`/`else` based on `if`'s runtime success
 *   4. Adds `dependentSchemas` keys when the dependency key is present in data
 */
import type { Schema } from '../../openapi/index.js'

export function buildUnevaluatedProperties(
  schema: Schema,
  errorArg: string,
  recurse: (s: Schema) => string,
): string {
  const up = schema.unevaluatedProperties
  if (up === undefined || up === true) return ''
  const stmts: string[] = ['const e=new Set()']
  if (schema.properties) {
    const keys = Object.keys(schema.properties)
    if (keys.length) stmts.push(`for(const k of ${JSON.stringify(keys)})e.add(k)`)
  }
  if (schema.patternProperties) {
    const patterns = Object.keys(schema.patternProperties)
    stmts.push(
      `for(const k of Object.keys(o)){for(const p of ${JSON.stringify(patterns)})if(new RegExp(p).test(k))e.add(k)}`,
    )
  }
  const collectAllOf = (list: readonly Schema[]) => {
    for (const sub of list) {
      if (sub.properties) {
        const keys = Object.keys(sub.properties)
        if (keys.length) stmts.push(`for(const k of ${JSON.stringify(keys)})e.add(k)`)
      }
      if (sub.patternProperties) {
        const patterns = Object.keys(sub.patternProperties)
        stmts.push(
          `for(const k of Object.keys(o)){for(const p of ${JSON.stringify(patterns)})if(new RegExp(p).test(k))e.add(k)}`,
        )
      }
      if (sub.allOf) collectAllOf(sub.allOf)
    }
  }
  if (schema.allOf) collectAllOf(schema.allOf)
  const conditionalBranch = (sub: Schema) => {
    if (!sub.properties && !sub.patternProperties) return
    const subZod = recurse(sub)
    const ifBody: string[] = []
    if (sub.properties) {
      const keys = Object.keys(sub.properties)
      if (keys.length) ifBody.push(`for(const k of ${JSON.stringify(keys)})e.add(k)`)
    }
    if (sub.patternProperties) {
      const patterns = Object.keys(sub.patternProperties)
      ifBody.push(
        `for(const k of Object.keys(o)){for(const p of ${JSON.stringify(patterns)})if(new RegExp(p).test(k))e.add(k)}`,
      )
    }
    if (ifBody.length) stmts.push(`if(${subZod}.safeParse(o).success){${ifBody.join(';')}}`)
  }
  if (schema.anyOf) for (const sub of schema.anyOf) conditionalBranch(sub)
  if (schema.oneOf) for (const sub of schema.oneOf) conditionalBranch(sub)
  if (schema.if) {
    const ifZod = recurse(schema.if)
    stmts.push(`const ifOk=${ifZod}.safeParse(o).success`)
    if (schema.if.properties) {
      const keys = Object.keys(schema.if.properties)
      if (keys.length) stmts.push(`if(ifOk)for(const k of ${JSON.stringify(keys)})e.add(k)`)
    }
    if (schema.then?.properties) {
      const keys = Object.keys(schema.then.properties)
      if (keys.length) stmts.push(`if(ifOk)for(const k of ${JSON.stringify(keys)})e.add(k)`)
    }
    if (schema.else?.properties) {
      const keys = Object.keys(schema.else.properties)
      if (keys.length) stmts.push(`if(!ifOk)for(const k of ${JSON.stringify(keys)})e.add(k)`)
    }
  }
  if (schema.dependentSchemas) {
    for (const [key, sub] of Object.entries(schema.dependentSchemas)) {
      if (sub.properties) {
        const keys = Object.keys(sub.properties)
        if (keys.length)
          stmts.push(
            `if(${JSON.stringify(key)} in o)for(const k of ${JSON.stringify(keys)})e.add(k)`,
          )
      }
    }
  }
  if (up === false) {
    stmts.push(`return Object.keys(o).every((k)=>e.has(k))`)
  } else {
    const subZod = recurse(up)
    stmts.push(`return Object.entries(o).every(([k,v])=>e.has(k)||${subZod}.safeParse(v).success)`)
  }
  return `.refine((o)=>{${stmts.join(';')}}${errorArg})`
}
