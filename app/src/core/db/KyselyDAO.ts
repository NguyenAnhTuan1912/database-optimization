// Import core
import { AppError } from "../error";
import { Page } from "./Pagable";
import { KyselyQueryMapper } from "./KyselyQueryMapper";
import { AppInsertResult } from "./AppInsertResult";
import { AppUpdateResult } from "./AppUpdateResult";

// Import utils
import { formatTimestampForMySQL } from "../../utils/db/helper";
import { LoggerBuilder } from "../../utils/logger";
import { toNumber } from "../../utils/number";

// Import types
import type {
  Kysely,
  Selectable,
  Insertable,
  Updateable,
  InsertResult,
  UpdateResult,
} from "kysely";
import { Pagable } from "./Pagable";
import { Filter, Query } from "./Query";
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
  ): Promise<Array<Selectable<Table>> | undefined>;

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
  ): Promise<Selectable<Table> | undefined>;

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

  /**
   * Re-make insert result.
   *
   * @param result
   * @returns
   */
  static remakeInsertResult(result: InsertResult) {
    return new AppInsertResult(
      result.insertId,
      toNumber(result.numInsertedOrUpdatedRows)
    );
  }

  /**
   * Re-make update result.
   *
   * @param result
   * @returns
   */
  static remakeUpdateResult(updateId: any, result: UpdateResult) {
    return new AppUpdateResult(
      updateId,
      toNumber(result.numUpdatedRows),
      toNumber(result.numChangedRows)
    );
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

      const result = await qb.execute();

      let inqb = this.dbClient.selectFrom(this.tableName as any);
      let selectQuery = new Query();

      selectQuery.addFilter(
        new Filter().consider("id").in(result.map((r) => r.insertId))
      );
      inqb = this.queryMapper.processFilters(inqb, selectQuery).selectAll();

      const newData = await inqb.execute();

      return newData as unknown as Promise<Array<Selectable<DB[TableName]>>>;
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

      await qb.executeTakeFirstOrThrow();
      const updatedData = await this.queryMapper
        .processFilters(this.dbClient.selectFrom(this.tableName as any), query)
        .selectAll()
        .executeTakeFirstOrThrow();

      return updatedData as unknown as Promise<Selectable<DB[TableName]>>;
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
