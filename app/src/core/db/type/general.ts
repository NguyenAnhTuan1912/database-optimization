import type {
  InsertResult,
  UpdateResult,
  SelectQueryBuilder,
  UpdateQueryBuilder,
  DeleteQueryBuilder,
} from "kysely";
import type { TMutate } from "../../../type";

export type TWhereCapableBuilder<DB = any> =
  | SelectQueryBuilder<DB, any, any>
  | UpdateQueryBuilder<DB, any, any, any>
  | DeleteQueryBuilder<DB, any, any>;
