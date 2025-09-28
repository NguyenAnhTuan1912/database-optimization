import { QuoteDAO } from "../data-model/dao";
import { Query } from "../../../db/Query";
import { Pagable } from "../../../db/Pagable";
import { ResponsePayload } from "../../../context/ReponsePayload";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Get quotes with limit and offset.
 *
 * @param ctx
 * @returns
 */
export async function paginateQuotes(ctx: RuntimeContext) {
  const query = (await ctx.getQuery()) as any;

  const dao = new QuoteDAO();

  const selectQuery = new Query();
  const pagable = new Pagable(query.page, query.size);

  if (query.userId) {
    selectQuery.addFilter(
      Query.createFilter().consider("userId").equal(query.userId)
    );
  }

  const result = await dao.paginate(selectQuery, pagable);

  return result;
}
