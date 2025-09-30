// Import from cores
import { jsonResponse } from "../../../../core/docs/swagger/helpers";
import { SwaggerSchema } from "../../../../core/docs/swagger/SwaggerSchema";

// Import schemas
import {
  createUserDescriptiveObject,
  userDescriptiveObject,
  usersDescriptiveObject,
  updateUserDescriptiveObject,
} from "../../../../core/modules/users/data-model/schema";
import { insertResultDescriptiveObject } from "../../../../core/db/schema";

// Import pipelines
import {
  countUsersPipeline,
  getUserPipeline,
  paginateUserPipeline,
  createUserPipeline,
  updateUserPipeline,
  deleteUserPipeline,
} from "../../../../core/modules/users/ports";

// Import from runtimes
import { ExpressRuntimeContext } from "../../adapters/context";

// Import types
import type { TSwaggerRouteDefinition } from "../../../../core/docs/swagger/type";

export const usersTag = "Users";
export const usersRoutes: Array<TSwaggerRouteDefinition> = [
  {
    method: "get",
    path: "/users/count",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await countUsersPipeline.run(ctx);
    },
    summary: "Đếm số lượng users",
    description: "Đếm toàn bộ số các users có trong cơ sở dữ liệu",
    tags: [usersTag],
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
    path: "/users",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await paginateUserPipeline.run(ctx);
    },
    summary: "Lấy nhiều users",
    description: "Lấy nhiều users theo từng trang",
    tags: [usersTag],
    parameters: [
      {
        $ref: "#/components/parameters/XUserIdHeader",
      },
      {
        name: "page",
        in: "query",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Số trang thông tin danh sách các users",
      },
      {
        name: "size",
        in: "query",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Số lượng tối đa các users trong một trang",
      },
    ],
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", usersDescriptiveObject)
      ),
    },
  },
  {
    method: "get",
    path: "/users/:userId",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await getUserPipeline.run(ctx);
    },
    summary: "Lấy user",
    description: "Lấy một user cụ thể theo id",
    tags: [usersTag],
    parameters: [
      {
        $ref: "#/components/parameters/XUserIdHeader",
      },
      {
        name: "userId",
        in: "path",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Id của user",
      },
    ],
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", userDescriptiveObject)
      ),
    },
  },
  {
    method: "post",
    path: "/users",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await createUserPipeline.run(ctx);
    },
    summary: "Tạo user",
    description: "Tạo và thêm một user mới vào trong cơ sở dữ liệu",
    tags: [usersTag],
    parameters: [
      {
        $ref: "#/components/parameters/XUserIdHeader",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: createUserDescriptiveObject,
        },
      },
    },
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", userDescriptiveObject)
      ),
    },
  },
  {
    method: "patch",
    path: "/users/:userId",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await updateUserPipeline.run(ctx);
    },
    summary: "Sửa user",
    description: "Sửa một user đã tồn tại trong databse",
    tags: [usersTag],
    parameters: [
      {
        $ref: "#/components/parameters/XUserIdHeader",
      },
      {
        name: "userId",
        in: "path",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Id của user",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: updateUserDescriptiveObject,
        },
      },
    },
    responses: {
      ...jsonResponse(
        "200",
        new SwaggerSchema()
          .setType("object")
          .addProperty("data", userDescriptiveObject)
      ),
    },
  },
  {
    method: "delete",
    path: "/users/:userId",
    handler: async (req, res, next) => {
      const ctx = new ExpressRuntimeContext(req, res, next);
      return await deleteUserPipeline.run(ctx);
    },
    summary: "Xoá user",
    description: "Xoá một user đã tồn tại trong database",
    tags: [usersTag],
    parameters: [
      {
        $ref: "#/components/parameters/XUserIdHeader",
      },
      {
        name: "userId",
        in: "path",
        required: false,
        schema: new SwaggerSchema().setType("number"),
        description: "Id của user",
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
