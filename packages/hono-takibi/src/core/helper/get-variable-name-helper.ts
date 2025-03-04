import type { Config } from '../../config'
import { capitalize } from '../text/capitalize'
import { decapitalize } from '../text/decapitalize'

export const getVariableNameHelper = (name: string, config: Config) => {
  return config.type.name === 'camelCase' ? decapitalize(name) : capitalize(name)
}
