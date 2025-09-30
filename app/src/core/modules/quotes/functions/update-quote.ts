import { QuoteDAO } from "../data-model/dao";
import { Query } from "../../../db/Query";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Update an existing quote in database.
 *
 * @param ctx
 * @returns
 */
export async function updateQuote(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const body = (await ctx.getBody()) as any;
  const query = (await ctx.getQuery()) as any;

  const dao = new QuoteDAO();
  const updateQuery = new Query();

  if (params.quoteId) {
    updateQuery.addFilter(
      Query.createFilter().consider("id").equal(params.quoteId)
    );
  }

  const result = await dao.update(updateQuery, body);

  return result;
}
