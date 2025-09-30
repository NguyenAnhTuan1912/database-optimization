import { AppError } from "../../core/error";

// Import utils
import { LoggerBuilder } from "../logger";

export abstract class InMemoryDBManager<TDatabaseClient> {
  protected client!: TDatabaseClient;

  protected host!: string;
  protected port!: number;

  constructor(host?: string, port?: string | number) {
    this.config(host, port);
    this.init();
  }

  /**
   * Save configuration for database client.
   *
   * @param host
   * @param port
   */
  config(host?: string, port?: string | number) {
    try {
      if (!host) {
        const msg = "Hostname of database is not set";
        throw new Error(msg);
      }

      if (!port) {
        const msg = "Name of database is not set";
        throw new Error(msg);
      }

      this.host = host;
      this.port = typeof port === "string" ? parseInt(port) : port;
    } catch (error: any) {
      LoggerBuilder.Logger.error(LoggerBuilder.buildNormalLog(error.message));
      throw new AppError(error.message);
    }
  }

  /**
   * Initialize new dialect for corresponding database client.
   */
  abstract init(): void;

  /**
   * Connect to database.
   */
  abstract connect(): Promise<any>;

  /**
   * @returns instance of database client.
   */
  getClient(): TDatabaseClient {
    try {
      if (!this.client) {
        const msg = "Database client is not set";
        throw new Error(msg);
      }

      return this.client;
    } catch (error: any) {
      LoggerBuilder.Logger.error(LoggerBuilder.buildNormalLog(error.message));
      throw new AppError(error.message);
    }
  }
}
