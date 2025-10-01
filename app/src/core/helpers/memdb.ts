/**
 * Get general key, allow get shared resources.
 *
 * @returns
 */
export function getGeneralKey() {
  return "shared-resources";
}

/**
 * Generate isolation key for in memory database.
 *
 * @param userId
 * @returns
 */
export function generateIsolationKey(userId: string) {
  return `users:${userId}:session`;
}

export const resourceToKeyDict = {
  /**
   * Get key for quote.
   *
   * @param quoteId
   * @returns
   */
  quote(quoteId: string) {
    return `quotes:${quoteId}`;
  },

  /**
   * Get key for quotes.
   *
   * @param page
   * @param size
   * @returns
   */
  quotes(page: string | number, size: string | number) {
    return `quotes?page=${page}&size=${size}`;
  },

  /**
   * Get key for user.
   *
   * @param userId
   * @returns
   */
  user(userId: string) {
    return `user:${userId}`;
  },

  /**
   * Get key for users.
   *
   * @param page
   * @param size
   * @returns
   */
  users(page: string | number, size: string | number) {
    return `users?page=${page}&size=${size}`;
  },
};
