// Import from cores
import { jsonResponse } from "../../../../core/docs/swagger/helpers";
import { SwaggerSchema } from "../../../../core/docs/swagger/SwaggerSchema";

// Import schemas
import {
  createQuoteDescriptiveObject,
  quoteDescriptiveObject,
  quotesDescriptiveObject,
  updateQuoteDescriptiveObject,
} from "../../../../core/modules/quotes/data-model/schema";
import { insertResultDescriptiveObject } from "../../../../core/db/schema";

// Import pipelines
import {
  countQuotesPipeline,
  getQuotePipeline,
  paginateQuotePipeline,
  createQuotePipeline,
  updateQuotePipeline,
  deleteQuotePipeline,
} from "../../../../core/modules/quotes/ports";

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
  {
    method: "get",
    path: "/quotes",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await paginateQuotePipeline.run(ctx);
    },
    summary: "Lấy nhiều quotes",
    description: "Lấy nhiều quotes theo từng trang",
    tags: [quotesTag],
    parameters: [
      {
        name: "page",
        in: "query",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Số trang thông tin danh sách các quotes",
      },
      {
        name: "size",
        in: "query",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Số lượng tối đa các quotes trong một trang",
      },
    ],
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", quotesDescriptiveObject)
      ),
    },
  },
  {
    method: "get",
    path: "/quotes/:id",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await getQuotePipeline.run(ctx);
    },
    summary: "Lấy quote",
    description: "Lấy một quote cụ thể theo id",
    tags: [quotesTag],
    parameters: [
      {
        name: "id",
        in: "path",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Id của quote",
      },
    ],
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", quoteDescriptiveObject)
      ),
    },
  },
  {
    method: "post",
    path: "/quotes",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await createQuotePipeline.run(ctx);
    },
    summary: "Tạo quote",
    description: "Tạo và thêm một quote mới vào trong cơ sở dữ liệu",
    tags: [quotesTag],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: createQuoteDescriptiveObject,
        },
      },
    },
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", quoteDescriptiveObject)
      ),
    },
  },
  {
    method: "patch",
    path: "/quotes/:id",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await updateQuotePipeline.run(ctx);
    },
    summary: "Sửa quote",
    description: "Sửa một quote đã tồn tại trong databse",
    tags: [quotesTag],
    parameters: [
      {
        name: "id",
        in: "path",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Id của quote",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: updateQuoteDescriptiveObject,
        },
      },
    },
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", quoteDescriptiveObject)
      ),
    },
  },
  {
    method: "delete",
    path: "/quotes/:id",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await deleteQuotePipeline.run(ctx);
    },
    summary: "Xoá quote",
    description: "Xoá một quote đã tồn tại trong database",
    tags: [quotesTag],
    parameters: [
      {
        name: "id",
        in: "path",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Id của quote",
      },
    ],
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", new SwaggerSchema("boolean"))
      ),
    },
  },
];
