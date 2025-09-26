import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export type UserTable = {
  id: Generated<number>;
  roleId: number;
  username: string;
  email: string;
  userHash: ColumnType<string | null>;

  // Nullable fields
  fullName: ColumnType<string | null>;
  phone: ColumnType<string | null>;
  birthDate: ColumnType<string | null>;
  bio: ColumnType<string | null>;

  // Audit fields
  createdAt: ColumnType<string | null>;
  updatedAt: ColumnType<string | null>;
  deletedAt: ColumnType<string | null>;
};

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type ModifiedUser = Updateable<UserTable>;

export type DPOPDatabase = {
  Users: UserTable;
};
