// Import core
import { AppError } from "../error";
import { Page } from "./Pagable";
import { KyselyQueryMapper } from "./KyselyQueryMapper";

// Import utils
import { formatTimestampForMySQL } from "../../utils/db/helper";
import { LoggerBuilder } from "../../utils/logger";

// Import types
import type {
  Kysely,
  Selectable,
  Insertable,
  Updateable,
  InsertResult,
  UpdateResult,
  TableExpressionOrList,
  TableExpression,
} from "kysely";
import type { Pagable } from "./Pagable";
import type { Query } from "./Query";
import type { QueryOptions } from "./QueryOptions";

export interface IDAOKysely<Table = any> {
  /**
   * @returns number of records in database.
   */
  count(): Promise<number>;

  /**
   * Receive `query` and `options` to get a record from database.
   *
   * @param query
   * @param options
   * @returns satisfied record.a
   */
  find?(
    query: Query,
    options?: QueryOptions
  ): Promise<Selectable<Table> | undefined>;

  /**
   * Find multiple records with pagable.
   *
   * @param pagable
   * @param options
   */
  paginate?(
    query: Query,
    pagable: Pagable,
    options?: QueryOptions
  ): Promise<Page<Selectable<Table>>>;

  /**
   * Find all records.
   *
   * @param query
   * @param options
   */
  findAll?(
    query: Query,
    options?: QueryOptions
  ): Promise<Array<Selectable<Table>>>;

  /**
   * Insert one or multiple records to database.
   *
   * @param items
   * @param options
   */
  insert?(
    items: Array<Insertable<Table>>,
    options?: QueryOptions
  ): Promise<Array<InsertResult> | undefined>;

  /**
   * Update a record in database.
   *
   * @param query
   * @param items
   * @param options
   */
  update?(
    query: Query,
    items: Updateable<Table>,
    options?: QueryOptions
  ): Promise<Array<UpdateResult> | undefined>;

  /**
   * Delete one or multiple records in database.
   *
   * @param query
   * @param options
   */
  delete?(query: Query, options?: QueryOptions): Promise<boolean>;
}

export abstract class KyselyBaseDAO<
  DB extends Record<string, any> = object,
  TableName extends keyof DB = string
> implements IDAOKysely<DB[TableName]>
{
  protected dbClient!: Kysely<DB>;
  protected tableName!: TableName;
  protected queryMapper!: KyselyQueryMapper;
  protected singularEntityName!: string;
  protected pluralEntityName!: string;

  constructor(dbClient: Kysely<DB>, tableName: TableName) {
    this.dbClient = dbClient;
    this.tableName = tableName;
    this.queryMapper = new KyselyQueryMapper();
  }

  async count(): Promise<number> {
    try {
      let queryBuilder = this.dbClient.selectFrom(this.tableName as any);
      queryBuilder = (queryBuilder.select as any)((eb: any) =>
        eb.fn.countAll().as("count")
      ).where("deleted", "!=", true);

      const result = (await queryBuilder.executeTakeFirstOrThrow()) as any;

      return result.count || 0;
    } catch (error: any) {
      return 0;
    }
  }

  async find(query: Query, options?: QueryOptions) {
    try {
      let qb = this.dbClient.selectFrom(this.tableName as any).selectAll();
      qb = this.queryMapper.processFilters(qb, query);

      console.log("SQL:", qb.compile().sql);

      const result = await qb.executeTakeFirstOrThrow();

      return result as Promise<Selectable<DB[TableName]>>;
    } catch (error: any) {
      const msg = `Cannot find ${this.singularEntityName}.`;

      LoggerBuilder.Logger.error(
        LoggerBuilder.buildNormalLog(msg, { reason: error.message })
      );

      if (options && options.canThrowError) {
        throw new AppError(msg);
      }

      return undefined;
    }
  }

  async findAll(query: Query, options?: QueryOptions) {
    try {
      let qb = this.dbClient.selectFrom(this.tableName as any).selectAll();
      qb = this.queryMapper.processFilters(qb, query);

      const result = await qb.execute();

      return result as unknown as Promise<Array<Selectable<DB[TableName]>>>;
    } catch (error: any) {
      const msg = `Cannot find ${this.pluralEntityName}.`;

      LoggerBuilder.Logger.error(
        LoggerBuilder.buildNormalLog(msg, { reason: error.message })
      );

      if (options && options.canThrowError) {
        throw new AppError(msg);
      }

      return [];
    }
  }

  async paginate(query: Query, pagable: Pagable, options?: QueryOptions) {
    try {
      let qb = this.dbClient.selectFrom(this.tableName as any).selectAll();
      qb = this.queryMapper.processFilters(qb, query);

      let { limit, offset } = pagable.toLimitOffset();
      qb = qb.limit(limit).offset(offset);

      const result = await qb.execute();

      return new Page(result, pagable.page);
    } catch (error: any) {
      const msg = `Cannot find ${this.pluralEntityName}.`;

      LoggerBuilder.Logger.error(
        LoggerBuilder.buildNormalLog(msg, { reason: error.message })
      );

      if (options && options.canThrowError) {
        throw new AppError(msg);
      }

      return new Page([], pagable.page);
    }
  }

  async insert(
    items: Array<Insertable<DB[TableName]>>,
    options?: QueryOptions
  ) {
    try {
      let qb = this.dbClient.insertInto(this.tableName as any).values(items);

      const result = await qb.returningAll().execute();

      return result as unknown as Promise<Array<InsertResult>>;
    } catch (error: any) {
      const msg = `Cannot insert ${this.singularEntityName}.`;

      LoggerBuilder.Logger.error(
        LoggerBuilder.buildNormalLog(msg, { reason: error.message })
      );

      if (options && options.canThrowError) {
        throw new AppError(msg);
      }

      return;
    }
  }

  async update(
    query: Query,
    item: Updateable<DB[TableName]>,
    options?: QueryOptions
  ) {
    try {
      let qb = this.dbClient.updateTable(this.tableName as any);
      qb = this.queryMapper.processFilters(qb, query);

      qb = (qb as any).set(item);

      const result = await qb.returningAll().executeTakeFirstOrThrow();

      return result as unknown as Promise<Array<UpdateResult>>;
    } catch (error: any) {
      const msg = `Cannot update ${this.singularEntityName}.`;

      LoggerBuilder.Logger.error(
        LoggerBuilder.buildNormalLog(msg, { reason: error.message })
      );

      if (options && options.canThrowError) {
        throw new AppError(msg);
      }

      return;
    }
  }

  async delete(query: Query, options?: QueryOptions) {
    try {
      let qb = this.dbClient.updateTable(this.tableName as any);
      qb = this.queryMapper.processFilters(qb, query);

      qb = (qb as any).set({
        deleted: true,
        deletedAt: formatTimestampForMySQL(new Date()),
      });

      const result = await qb.executeTakeFirstOrThrow();

      if (result.numChangedRows === 0n || result.numUpdatedRows === 0n) {
        return false;
      }

      return true;
    } catch (error: any) {
      const msg = `Cannot delete ${this.singularEntityName}.`;

      LoggerBuilder.Logger.error(
        LoggerBuilder.buildNormalLog(msg, { reason: error.message })
      );

      if (options && options.canThrowError) {
        throw new AppError(msg);
      }

      return false;
    }
  }
}
