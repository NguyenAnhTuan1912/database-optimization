import { Kysely } from "kysely";

import { KyselyBaseDAO } from "../../../db/KyselyDAO";
import { DBOPManager } from "../../../db/DBOPManager";

import type { IDAOKysely } from "../../../db/KyselyDAO";
import type { DPOPDatabase, UsersTable } from "../../../db/type/dbop";

export class UserDAO extends KyselyBaseDAO<DPOPDatabase, "Users"> {
  constructor(dbClient = new DBOPManager().getClient()) {
    super(dbClient, "Users");

    this.singularEntityName = "user";
    this.pluralEntityName = "users";
  }
}
