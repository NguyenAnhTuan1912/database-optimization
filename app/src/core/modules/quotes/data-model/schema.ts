import Joi from "joi";

import { SwaggerSchema } from "../../../docs/swagger/SwaggerSchema";
import { toDescriptiveObject } from "../../../validation/joi/helper";

// Định nghĩa từng field
export const idSchema = Joi.number().integer().positive();

export const userIdSchema = Joi.number().integer().positive().required();

export const titleSchema = Joi.string().max(64).required().messages({
  "string.base": "Title must be a string",
  "string.empty": "Title cannot be empty",
  "string.max": "Title must be at most 64 characters",
  "any.required": "Title is required",
});

export const descriptionSchema = Joi.string().max(512).required().messages({
  "string.base": "Description must be a string",
  "string.empty": "Description cannot be empty",
  "string.max": "Description must be at most 512 characters",
  "any.required": "Description is required",
});

// Schema khi tạo mới quote
export const createQuoteSchema = Joi.object({
  userId: userIdSchema,
  title: titleSchema,
  description: descriptionSchema,
});

// Schema khi cập nhật quote
export const updateQuoteSchema = Joi.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
});

export const quoteDescriptiveObject = new SwaggerSchema()
  .setType("object")
  .addProperty("id", new SwaggerSchema().setType("number"))
  .addProperty("userId", new SwaggerSchema().setType("number"))
  .addProperty("title", new SwaggerSchema().setType("string"))
  .addProperty("description", new SwaggerSchema().setType("string"));

export const quotesDescriptiveObject = new SwaggerSchema()
  .setType("array")
  .setItems(quoteDescriptiveObject);

export const createQuoteDescriptiveObject =
  toDescriptiveObject(createQuoteSchema);

export const updateQuoteDescriptiveObject =
  toDescriptiveObject(updateQuoteSchema);
