/**
 * Generates import statements for the routes.
 *
 * @function generateImportRoutes
 * @param importsMap - A map of import paths to the names of the routes.
 * @returns An array of import statements.
 */
export function generateImportRoutes(importsMap: { [importPath: string]: string[] }) {
  const importRoutes: string[] = []
  for (const [importPath, names] of Object.entries(importsMap)) {
    const uniqueNames = Array.from(new Set(names))
    if (importPath.includes('index.ts')) {
      const normalizedPath = importPath.replace('index.ts', '')
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${normalizedPath}';`)
    } else {
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${importPath}';`)
    }
  }
  return importRoutes
}
