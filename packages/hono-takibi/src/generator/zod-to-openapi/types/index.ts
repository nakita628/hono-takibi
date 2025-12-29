import type { Schema } from "../../../openapi/index.js";

export function zodType(schema: Schema) {
    const type = schema.$ref ? schema.$ref.split('/').pop() : undefined

    return `type `

}