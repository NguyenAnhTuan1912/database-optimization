import { UserDAO } from "../data-model/dao";
import { Query } from "../../../db/Query";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Delete (soft) and existing user in database.
 *
 * @param ctx
 * @returns
 */
export async function deleteUser(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const query = (await ctx.getQuery()) as any;

  const dao = new UserDAO();
  const deleteQuery = new Query();

  if (params.id) {
    deleteQuery.addFilter(Query.createFilter().consider("id").equal(params.id));
  }

  const result = await dao.delete(deleteQuery);

  return result;
}
