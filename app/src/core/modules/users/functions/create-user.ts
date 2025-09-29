import { UserDAO } from "../data-model/dao";

// Import utils
import { toNumber } from "../../../../utils/number";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

/**
 * Create new user and insert to database.
 *
 * @param ctx
 * @returns
 */
export async function createUser(ctx: RuntimeContext) {
  const body = (await ctx.getBody()) as any;

  const dao = new UserDAO();

  const result = await dao.insert([body]);

  if (result) {
    return result[0];
  }

  return result;
}
