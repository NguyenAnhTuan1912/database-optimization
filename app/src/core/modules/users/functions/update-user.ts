import { UserDAO } from "../data-model/dao";
import { Query } from "../../../db/Query";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Update an existing user in database.
 *
 * @param ctx
 * @returns
 */
export async function updateUser(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const body = (await ctx.getBody()) as any;
  const query = (await ctx.getQuery()) as any;

  const dao = new UserDAO();
  const updateQuery = new Query();

  if (params.userId) {
    updateQuery.addFilter(
      Query.createFilter().consider("id").equal(params.userId)
    );
  }

  const result = await dao.update(updateQuery, body);

  return result;
}
