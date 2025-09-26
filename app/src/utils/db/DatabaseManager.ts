import { Kysely, Dialect } from "kysely";

import { AppError } from "../../core/error";

// Import utils
import { LoggerBuilder } from "../logger";

/**
 * A class represents database client instance with Kysely.
 */
export abstract class DatabaseManager<DB = unknown> {
  protected dialectInstance!: Dialect;
  protected client!: Kysely<DB>;

  protected database!: string;
  protected host!: string;
  protected user!: string;
  protected password!: string;
  protected port!: number;
  protected connectionLimit!: number;

  constructor(
    database?: string,
    host?: string,
    port?: string | number,
    user?: string,
    password?: string,
    connectionLimit?: number
  ) {
    this.config(database, host, port, user, password, connectionLimit);
    this.init();
  }

  config(
    database?: string,
    host?: string,
    port?: string | number,
    user?: string,
    password?: string,
    connectionLimit?: number
  ) {
    try {
      if (!database) {
        const msg = "Name of database is not set";
        throw new Error(msg);
      }

      if (!host) {
        const msg = "Hostname of database is not set";
        throw new Error(msg);
      }

      if (!port) {
        const msg = "Name of database is not set";
        throw new Error(msg);
      }

      if (!user) {
        const msg = "User of database is not set";
        throw new Error(msg);
      }

      if (!password) {
        const msg = "Password of database is not set";
        throw new Error(msg);
      }

      if (!connectionLimit) {
        const msg = "Connection Limit of client to database is not set";
        throw new Error(msg);
      }

      this.database = database;
      this.host = host;
      this.port = typeof port === "string" ? parseInt(port) : port;
      this.user = user;
      this.password = password;
      this.connectionLimit = connectionLimit;
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
   * @returns instance of database client with Kysely.
   */
  getClient(): Kysely<DB> {
    try {
      if (!this.dialectInstance) {
        const msg = "Dialect of database client is not set";
        LoggerBuilder.Logger.error(LoggerBuilder.buildNormalLog(msg));
        throw new Error(msg);
      }

      if (!this.client) {
        this.client = new Kysely<DB>({
          dialect: this.dialectInstance,
        });
      }

      return this.client;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
