import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export type UsersTable = {
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

export type QuotesTable = {
  id: Generated<number>;
  userId: number;
  title: string;
  description: string;

  // Audit fields
  createdAt: ColumnType<string | null>;
  updatedAt: ColumnType<string | null>;
  deletedAt: ColumnType<string | null>;
};

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type ModifiedUser = Updateable<UsersTable>;

export type Quote = Selectable<QuotesTable>;
export type NewQuote = Insertable<QuotesTable>;
export type ModifiedQuote = Updateable<QuotesTable>;

export type DPOPDatabase = {
  Users: UsersTable;
  Quotes: QuotesTable;
};
