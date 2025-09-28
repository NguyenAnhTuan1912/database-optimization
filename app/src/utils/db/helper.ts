/**
 * Format timestamp for MYSQL.
 * @param date
 * @returns
 */
export function formatTimestampForMySQL(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}
