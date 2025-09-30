import { RuntimeContext } from "../../../context/runtime-context";
import { RedisManager } from "../../../db/RedisManager";

/**
 * Write cached quote to memory database.
 * @param ctx
 */
export async function writeCachedQuote(ctx: RuntimeContext) {
  const params = (await ctx.getParams()) as any;
  const headers = (await ctx.getHeaders()) as any;
  const prevResult = ctx.prevResult as any;
  const rm = new RedisManager();

  await rm.connect();

  const redisClient = rm.getClient();
  const firstKey = `${headers["x-user-id"]}:session`;
  const secondKey = `quote:get-quote:${params.quoteId}`;

  await redisClient.hSet(firstKey, secondKey, JSON.stringify(prevResult));

  return prevResult;
}
