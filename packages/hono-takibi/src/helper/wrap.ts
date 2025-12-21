import type { Components } from '../openapi/index.js'

export function wrap(zod: string, components: Components) {
  if (components.schemas || components.parameters || components.headers) {
    if (components.schemas) {
      const { schemas } = components.schemas
      const formatLiteral = (v: unknown): string => {
        /* boolean true or false */
        if (typeof v === 'boolean') {
          return `${v}`
        }
        /* number */
        if (typeof v === 'number') {
          if (schemas.format === 'int64') {
            return `${v}n`
          }
          if (schemas.format === 'bigint') {
            return `BigInt(${v})`
          }
          return `${v}`
        }
        /* date */
        if (schemas.type === 'date' && typeof v === 'string') {
          return `new Date(${JSON.stringify(v)})`
        }
        /* string */
        if (typeof v === 'string') {
          return JSON.stringify(v)
        }
        /* other */
        return JSON.stringify(v)
      }

      /* why schema.default !== undefined becasue schema.default === 0  // → falsy */
      const s =
        schemas.default !== undefined ? `${zod}.default(${formatLiteral(schemas.default)})` : zod

      const isNullable =
        schemas.nullable === true ||
        (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null')

      const z = isNullable ? `${s}.nullable()` : s

      if (components.parameters) {
        const openapiProps = [
          // param
          components.parameters.in && components.parameters.name
            ? (() => {
                const required = !!components.parameters.required
                return `param:{in:"${components.parameters.in}",name:${JSON.stringify(components.parameters.name)},required:${required}}`
              })()
            : undefined,
          // example
          'example' in schemas && schemas.example !== undefined
            ? `example:${JSON.stringify(schemas.example)}`
            : undefined,
          // examples
          'examples' in schemas && Array.isArray(schemas.examples) && schemas.examples.length > 0
            ? `examples:${JSON.stringify(schemas.examples)}`
            : undefined,
          // description
          'description' in schemas && schemas.description !== undefined
            ? `description:${JSON.stringify(schemas.description)}`
            : undefined,
        ].filter((v) => v !== undefined)

        return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
      }
    }

    if (components.parameters) {
      const { schemas } = components.parameters
      const formatLiteral = (v: unknown): string => {
        /* boolean true or false */
        if (typeof v === 'boolean') {
          return `${v}`
        }
        /* number */
        if (typeof v === 'number') {
          return `${v}`
        }
        // parameter is not format
        /* string */
        if (typeof v === 'string') {
          return JSON.stringify(v)
        }
        /* other */
        return JSON.stringify(v)
      }

      // /* why schema.default !== undefined becasue schema.default === 0  // → falsy */
      // const s =
      //   schemas.default !== undefined ? `${zod}.default(${formatLiteral(schemas.default)})` : zod

      // const isNullable =
      //   schemas.nullable === true ||
      //   (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null')

      // const z = isNullable ? `${s}.nullable()` : s

      const z = zod

      if (components.parameters) {
        const openapiProps = [
          // param
          components.parameters.in && components.parameters.name
            ? (() => {
                const required = !!components.parameters.required
                return `param:{in:"${components.parameters.in}",name:${JSON.stringify(components.parameters.name)},required:${required}}`
              })()
            : undefined,
          // example
          'example' in schemas && schemas.example !== undefined
            ? `example:${JSON.stringify(schemas.example)}`
            : undefined,
          // examples
          'examples' in schemas && Array.isArray(schemas.examples) && schemas.examples.length > 0
            ? `examples:${JSON.stringify(schemas.examples)}`
            : undefined,
          // description
          'description' in schemas && schemas.description !== undefined
            ? `description:${JSON.stringify(schemas.description)}`
            : undefined,
        ].filter((v) => v !== undefined)

        return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
      }
    }

    if (components.headers) {
      const { schemas } = components.headers
      const formatLiteral = (v: unknown): string => {
        /* boolean true or false */
        if (typeof v === 'boolean') {
          return `${v}`
        }
        /* number */
        // if (typeof v === 'number') {
        //   if (schemas.format === 'int64') {
        //     return `${v}n`
        //   }
        //   if (schemas.format === 'bigint') {
        //     return `BigInt(${v})`
        //   }
        //   return `${v}`
        // }
        /* date */
        // if (schemas.type === 'date' && typeof v === 'string') {
        //   return `new Date(${JSON.stringify(v)})`
        // }
        /* string */
        if (typeof v === 'string') {
          return JSON.stringify(v)
        }
        /* other */
        return JSON.stringify(v)
      }

      /* why schema.default !== undefined becasue schema.default === 0  // → falsy */
      // const s =
      //   schemas.default !== undefined ? `${zod}.default(${formatLiteral(schemas.default)})` : zod

      // const isNullable =
      //   schemas.nullable === true ||
      //   (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null')

      // const z = isNullable ? `${s}.nullable()` : s

      const z = zod

      if (components.parameters) {
        const openapiProps = [
          // param
          components.headers.name && components.headers.description
            ? (() => {
                // const required = !!components.headers.required
                return `header:{name:${JSON.stringify(components.headers.name)},description:${JSON.stringify(components.headers.description)}}`
              })()
            : undefined,
          // example
          'example' in schemas && schemas.example !== undefined
            ? `example:${JSON.stringify(schemas.example)}`
            : undefined,
          // examples
          'examples' in schemas && Array.isArray(schemas.examples) && schemas.examples.length > 0
            ? `examples:${JSON.stringify(schemas.examples)}`
            : undefined,
          // description
          'description' in schemas && schemas.description !== undefined
            ? `description:${JSON.stringify(schemas.description)}`
            : undefined,
        ].filter((v) => v !== undefined)

        return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
      }
    }
  }
}
