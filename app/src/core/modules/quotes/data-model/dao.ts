import { Kysely } from "kysely";

import { KyselyBaseDAO } from "../../../db/KyselyDAO";
import { DBOPManager } from "../../../db/DBOPManager";

import type { IDAOKysely } from "../../../db/KyselyDAO";
import type { DPOPDatabase, QuotesTable } from "../../../db/type/dbop";

export class QuoteDAO extends KyselyBaseDAO<DPOPDatabase, "Quotes"> {
  constructor(dbClient = new DBOPManager().getClient()) {
    super(dbClient, "Quotes");

    this.singularEntityName = "quote";
    this.pluralEntityName = "quotes";

    this.dbClient.updateTable("Quotes").set({});
  }
}
