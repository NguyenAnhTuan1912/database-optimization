import Joi from "joi";

import { SwaggerSchema } from "../../../docs/swagger/SwaggerSchema";
import { toDescriptiveObject } from "../../../validation/joi/helper";

// Field cơ bản
export const idSchema = Joi.number().integer().positive();

export const roleIdSchema = Joi.number().integer().positive().required();

export const usernameSchema = Joi.string().max(32).required().messages({
  "string.base": "Username must be a string",
  "string.empty": "Username cannot be empty",
  "string.max": "Username must be at most 32 characters",
  "any.required": "Username is required",
});

export const emailSchema = Joi.string().email().max(256).required().messages({
  "string.email": "Email must be a valid email address",
  "string.max": "Email must be at most 256 characters",
  "any.required": "Email is required",
});

export const userHashSchema = Joi.string().max(60).required().messages({
  "string.base": "User hash must be a string",
  "string.empty": "User hash cannot be empty",
  "string.max": "User hash must be at most 60 characters",
  "any.required": "User hash is required",
});

// Nullable fields
export const fullNameSchema = Joi.string()
  .max(64)
  .allow(null)
  .optional()
  .messages({
    "string.max": "Full name must be at most 64 characters",
  });

export const phoneSchema = Joi.string()
  .max(20)
  .allow(null)
  .optional()
  .messages({
    "string.max": "Phone number must be at most 20 characters",
  });

export const birthDateSchema = Joi.date().allow(null).optional().messages({
  "date.base": "Birth date must be a valid date",
});

export const bioSchema = Joi.string().max(255).allow(null).optional().messages({
  "string.max": "Bio must be at most 255 characters",
});

// Tạo user mới
export const createUserSchema = Joi.object({
  roleId: roleIdSchema,
  username: usernameSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  phone: phoneSchema,
  birthDate: birthDateSchema,
  bio: bioSchema,
});

// Cập nhật user
export const updateUserSchema = Joi.object({
  roleId: roleIdSchema.optional(),
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  fullName: fullNameSchema,
  phone: phoneSchema,
  birthDate: birthDateSchema,
  bio: bioSchema,
});

// Object đơn lẻ
export const userDescriptiveObject = new SwaggerSchema()
  .setType("object")
  .addProperty("id", new SwaggerSchema().setType("number"))
  .addProperty("roleId", new SwaggerSchema().setType("number"))
  .addProperty("username", new SwaggerSchema().setType("string"))
  .addProperty("email", new SwaggerSchema().setType("string"))
  .addProperty("fullName", new SwaggerSchema().setType("string"))
  .addProperty("phone", new SwaggerSchema().setType("string"))
  .addProperty("birthDate", new SwaggerSchema().setType("string"))
  .addProperty("bio", new SwaggerSchema().setType("string"));

// Danh sách user
export const usersDescriptiveObject = new SwaggerSchema()
  .setType("array")
  .setItems(userDescriptiveObject);

// Tự động từ Joi
export const createUserDescriptiveObject =
  toDescriptiveObject(createUserSchema);
export const updateUserDescriptiveObject =
  toDescriptiveObject(updateUserSchema);
