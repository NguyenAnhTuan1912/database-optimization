/**
 * Convert string, bigint, ... to number.
 *
 * @param value
 * @returns
 */
export function toNumber(value: any) {
  try {
    return parseInt(value);
  } catch (error: any) {
    return 0;
  }
}
