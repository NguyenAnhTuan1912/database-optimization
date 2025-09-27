import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";

// Import from utils
import { Configs } from "../../utils/configs";
import { DatabaseManager } from "../../utils/db/DatabaseManager";

// Import types
import type { DPOPDatabase } from "./type/dbop";

export class DBOPManager extends DatabaseManager<
  Kysely<DPOPDatabase>,
  MysqlDialect
> {
  constructor() {
    super(
      Configs.DBOPDatabase,
      Configs.DBOPHost,
      Configs.DPOPPort,
      Configs.DBOPUser,
      Configs.DBOPPassword,
      Configs.DBOPConnectionLimit
    );
  }

  /**
   * @override
   */
  init(): void {
    this.dialectInstance = new MysqlDialect({
      pool: createPool({
        database: this.database,
        host: this.host,
        user: this.user,
        password: this.password,
        port: this.port,
        connectionLimit: this.connectionLimit,
      }),
    });

    this.client = new Kysely<DPOPDatabase>({
      dialect: this.dialectInstance,
    });
  }

  async connect(): Promise<any> {}
}
