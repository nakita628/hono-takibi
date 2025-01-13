/**
 * Check if all properties in the object are optional
 * @param objectProperties - An array of strings representing the object properties
 * @returns A boolean indicating if all properties are optional
 */
export function isAllOptional(objectProperties: string[]) {
  return objectProperties.every((prop) => prop.includes('.optional()'))
}
