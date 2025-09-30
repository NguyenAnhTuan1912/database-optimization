import { RuntimeContext } from "../../../context/runtime-context";
import { RedisManager } from "../../../db/RedisManager";

/**
 * Get cached quote in memory database.
 * @param ctx
 */
export async function getCachedQuote(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const headers = (await ctx.getHeaders()) as any;
  const rm = new RedisManager();

  await rm.connect();

  const redisClient = rm.getClient();
  const firstKey = `${headers["x-user-id"]}:session`;
  const secondKey = `quote:get-quote:${params.quoteId}`;

  const result = await redisClient.hGet(firstKey, secondKey);

  if (!result) return;

  ctx.stop();
  return ctx.sendJson(JSON.parse(result));
}
