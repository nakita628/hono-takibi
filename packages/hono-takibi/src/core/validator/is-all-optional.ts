/**
 * Check if all properties in the object are optional
 * @param { string[] } objectProperties - An array of strings representing the object properties
 * @returns { boolean } A boolean indicating if all properties are optional
 */
export function isAllOptional(objectProperties: string[]): boolean {
  return objectProperties.every((prop) => prop.includes('.optional()'))
}
