import { RuntimeContext } from "../../../context/runtime-context";
import { ClientError } from "../../../error";

/**
 * Check if user id is in header or not.
 *
 * @param ctx
 * @returns
 */
export async function checkUserIdInHeader(ctx: RuntimeContext) {
  const headers = (await ctx.getHeaders()) as any;
  const userId = headers["x-user-id"];

  if (!userId) {
    const msg = "User Id is not found in Request Headers";
    return new ClientError(msg).asHTTPError("BadRequest");
  }

  return userId;
}
