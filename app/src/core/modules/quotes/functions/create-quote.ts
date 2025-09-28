import { QuoteDAO } from "../data-model/dao";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Create new quote and insert to database.
 *
 * @param ctx
 * @returns
 */
export async function createQuote(ctx: RuntimeContext) {
  const body = (await ctx.getBody()) as any;

  const dao = new QuoteDAO();

  const result = await dao.insert([body]);

  if (result) return result[0];

  return result;
}
