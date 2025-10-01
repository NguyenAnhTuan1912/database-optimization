import { RuntimeContext } from "../../../context/runtime-context";
import { RedisManager } from "../../../db/RedisManager";

import { getGeneralKey, resourceToKeyDict } from "../../../helpers";

/**
 * Get cached quote in memory database.
 * @param ctx
 */
export async function getCachedQuotes(ctx: RuntimeContext) {
  const query = (await ctx.getQuery()) as any;
  const headers = (await ctx.getHeaders()) as any;
  const rm = new RedisManager();

  await rm.connect();

  const redisClient = rm.getClient();
  const generalKey = getGeneralKey();
  const resourceKey = resourceToKeyDict.quotes(query.page, query.size);

  const result = await redisClient.hGet(generalKey, resourceKey);

  if (!result) return;

  // console.log("Has Result, return resource of:", generalKey, resourceKey);

  ctx.stop();
  return ctx.sendJson(JSON.parse(result));
}
