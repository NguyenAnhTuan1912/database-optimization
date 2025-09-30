import { QuoteDAO } from "../data-model/dao";
import { Query } from "../../../db/Query";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Get a quotes.
 *
 * @param ctx
 * @returns
 */
export async function getQuote(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const query = (await ctx.getQuery()) as any;

  const dao = new QuoteDAO();
  const selectQuery = new Query();

  if (params.quoteId) {
    selectQuery.addFilter(
      Query.createFilter().consider("id").equal(params.quoteId)
    );
  }

  if (query.userId) {
    selectQuery.addFilter(
      Query.createFilter().consider("userId").equal(query.userId)
    );
  }

  const result = await dao.find(selectQuery);

  return result;
}
