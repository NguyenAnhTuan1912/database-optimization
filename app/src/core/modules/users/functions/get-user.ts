import { UserDAO } from "../data-model/dao";
import { Query } from "../../../db/Query";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Get a users.
 *
 * @param ctx
 * @returns
 */
export async function getUser(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const query = (await ctx.getQuery()) as any;

  const dao = new UserDAO();
  const selectQuery = new Query();

  if (query.userId) {
    selectQuery.addFilter(
      Query.createFilter().consider("userId").equal(query.userId)
    );
  }

  const result = await dao.find(selectQuery);

  return result;
}
