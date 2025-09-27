import { Kysely } from "kysely";

import { KyselyBaseDAO } from "../../../db/kysely-dao";
import { DBOPManager } from "../../../db/DBOPManager";

import type { IDAOKysely } from "../../../db/kysely-dao";
import type { DPOPDatabase, QuotesTable } from "../../../db/type/dbop";

export class QuoteDAO extends KyselyBaseDAO<DPOPDatabase, "Quotes"> {
  constructor(dbClient = new DBOPManager().getClient()) {
    super(dbClient, "Quotes");
  }
}
