// Import from cores
import { jsonResponse } from "../../../../core/docs/swagger/helpers";
import { SwaggerSchema } from "../../../../core/docs/swagger/SwaggerSchema";

// Import pipelines
import { countQuotesPipeline } from "../../../../core/modules/quotes/ports";

// Import from runtimes
import { ExpressRuntimeContext } from "../../adapters/context";

// Import types
import type { TSwaggerRouteDefinition } from "../../../../core/docs/swagger/type";

export const quotesTag = "Quotes";
export const quotesRoutes: Array<TSwaggerRouteDefinition> = [
  {
    method: "get",
    path: "/quotes/count",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await countQuotesPipeline.run(ctx);
    },
    summary: "Đếm số lượng quotes",
    description: "Đếm toàn bộ số các quotes có trong cơ sở dữ liệu",
    tags: [quotesTag],
    parameters: [],
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", new SwaggerSchema("number"))
      ),
    },
  },
];
