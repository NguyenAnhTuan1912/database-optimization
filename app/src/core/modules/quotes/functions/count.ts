import { QuoteDAO } from "../data-model/dao";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Count how many quotes in database.
 *
 * @param ctx
 * @returns
 */
export async function count(ctx: RuntimeContext) {
  const dao = new QuoteDAO();
  const result = await dao.count();

  return result;
}
