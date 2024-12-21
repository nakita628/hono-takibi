import { Format } from '../../types'

/**
 * Mapping of OpenAPI formats to Zod validation methods
 *
 * @remarks
 * - String formats map to string validation methods
 * - Number formats map to number type
 * - Empty string for unrecognized formats
 */
const FORMAT_TO_ZOD_VALIDATION: Record<Format, string> = {
  max: '.max()',
  min: '.min()',
  length: '.length()',
  email: '.email()',
  uri: '.url()',
  emoji: '.emoji()',
  uuid: '.uuid()',
  cuid: '.cuid()',
  cuid2: '.cuid2()',
  ulid: '.ulid()',
  'date-time': '.datetime()',
  ip: '.ip()',
  cidr: '.cidr()',
  trim: '.trim()',
  toLowerCase: '.toLowerCase()',
  toUpperCase: '.toUpperCase()',
  date: '.date()',
  time: '.time()',
  duration: '.duration()',
  base64: '.base64()',
  int32: 'z.number()',
  int64: 'z.number()',
  float: 'z.number()',
  double: 'z.number()',
  binary: 'z.instanceof(Uint8Array)',
} as const

/**
 * Converts OpenAPI format to Zod validation method
 *
 * @function getZodFormatString
 * @param format - OpenAPI format type
 * @returns Zod validation method string
 *
 * @example
 * // String validations
 * getZodFormatString('email')      // Returns: '.email()'
 * getZodFormatString('uri')        // Returns: '.url()'
 * getZodFormatString('uuid')       // Returns: '.uuid()'
 * getZodFormatString('date-time')  // Returns: '.datetime()'
 *
 * @example
 * // Number types
 * getZodFormatString('int32')      // Returns: 'z.number()'
 * getZodFormatString('float')      // Returns: 'z.number()'
 *
 * @example
 * // Unknown format
 * getZodFormatString('unknown')    // Returns: ''
 *
 * @remarks
 * - Returns the corresponding Zod validation method for known formats
 * - Returns empty string for unrecognized formats
 * - Used in schema generation for request/response validation
 */
export function getZodFormatString(format: Format): string {
  return FORMAT_TO_ZOD_VALIDATION[format]
}
