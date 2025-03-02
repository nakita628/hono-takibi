import type { FormatString } from '../../type'

/**
 * Mapping of OpenAPI formats to Zod validation methods
 *
 * @remarks
 * - String formats map to string validation methods
 * - Number formats map to number type
 * - Empty string for unrecognized formats
 */
const FORMAT_STRING_TO_ZOD_VALIDATION: Record<FormatString, string> = {
  // max: '.max()',
  // min: '.min()',
  // length: '.length()',
  email: '.email()',
  uri: '.url()',
  emoji: '.emoji()',
  uuid: '.uuid()',
  nanoid: '.nanoid()',
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
  binary: '.instanceof(Uint8Array)',
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
export function getZodFormatString(format: FormatString): string {
  return FORMAT_STRING_TO_ZOD_VALIDATION[format]
}
