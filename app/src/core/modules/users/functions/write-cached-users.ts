import { RuntimeContext } from "../../../context/runtime-context";
import { RedisManager } from "../../../db/RedisManager";

import { getGeneralKey, resourceToKeyDict } from "../../../helpers";

/**
 * Write cached user to memory database.
 * @param ctx
 */
export async function writeCachedUsers(ctx: RuntimeContext) {
  const query = (await ctx.getQuery()) as any;
  const headers = (await ctx.getHeaders()) as any;
  const prevResult = ctx.prevResult as any;
  const rm = new RedisManager();

  await rm.connect();

  const redisClient = rm.getClient();
  const generalKey = getGeneralKey();
  const resourceKey = resourceToKeyDict.users(query.page, query.size);

  if (await redisClient.exists([generalKey, resourceKey])) {
    return prevResult;
  }

  // console.log("Has Result, save resource of:", generalKey, resourceKey);
  await redisClient.hSet(generalKey, resourceKey, JSON.stringify(prevResult));

  return prevResult;
}
