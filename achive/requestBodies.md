# requestBodies

-  [x] requestBodies

## References

- [Request Body Object](https://spec.openapis.org/oas/v3.2.0.html#request-body-object)

```ts
export type RequestBody = {
  readonly description?: string
  readonly content?: {
    readonly [k: string]: Media | Reference
  }
  readonly required?: boolean
}
```

## Generator

```ts
export function requestBodies(components: Components, exportRequestBodies: boolean): string {
  const requestBodies = components.requestBodies
  if (!requestBodies) return ''

  const isComponentsRef = (ref: unknown): ref is `#/components/${string}/${string}` =>
    typeof ref === 'string' && ref.startsWith('#/components/')

  return Object.entries(requestBodies)
    .map(([k, body]) => {
      if (body.content) {
        const content = Object.entries(body.content)
          .map(([k, mediaOrReference]) => {
            if ('schema' in mediaOrReference) {
              return `${JSON.stringify(k)}:{schema:${zodToOpenAPI(mediaOrReference.schema)}}`
            }
            if ('$ref' in mediaOrReference && isComponentsRef(mediaOrReference.$ref)) {
              return `${JSON.stringify(k)}:${refSchema(mediaOrReference.$ref)}`
            }
            return undefined
          })
          .filter((v) => v !== undefined)
          .join(',')

        const props = [
          body.description ? `description:${JSON.stringify(body.description)}` : undefined,
          `content:{${content}}`,
          body.required ? `required:${body.required}` : undefined,
        ]
          .filter((v) => v !== undefined)
          .join(',')

        return `${exportRequestBodies ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'RequestBody'))}={${props}}`
      }
      return undefined
    })
    .join('\n\n')
}
```

