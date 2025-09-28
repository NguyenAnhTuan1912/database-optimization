import type {
  SelectQueryBuilder,
  UpdateQueryBuilder,
  DeleteQueryBuilder,
} from "kysely";

export type WhereCapableBuilder<DB = any> =
  | SelectQueryBuilder<DB, any, any>
  | UpdateQueryBuilder<DB, any, any, any>
  | DeleteQueryBuilder<DB, any, any>;
