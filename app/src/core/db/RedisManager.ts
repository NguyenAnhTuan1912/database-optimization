import { createClient } from "redis";

// Import utils
import { Configs } from "../../utils/configs";
import { LoggerBuilder } from "../../utils/logger";
import { InMemoryDBManager } from "../../utils/db/InMemoryDBManager";

export class RedisManager extends InMemoryDBManager<
  ReturnType<typeof createClient>
> {
  constructor() {
    super(Configs.DBOPMemDBHost, Configs.DBOPMemDBPort);
  }

  init(): void {
    if (!this.client) {
      this.client = createClient({
        url: `redis://${this.host}:${this.port}`,
      });

      this.client.on("error", (err) => {
        LoggerBuilder.Logger.error(LoggerBuilder.buildNormalLog(err.message));
      });
    }
  }

  async connect(): Promise<any> {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    }
  }
}
