import { SwaggerSchema } from "../docs/swagger/SwaggerSchema";

export const insertResultDescriptiveObject = new SwaggerSchema()
  .setType("object")
  .addProperty("insertId", new SwaggerSchema().setType("number"))
  .addProperty(
    "numInsertedOrUpdatedRows",
    new SwaggerSchema().setType("number")
  );
