import type { Kysely, Selectable, Insertable, Updateable } from "kysely";
import type { Page, Pagable } from "./Pagable";
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
  find?(query: Query, options?: QueryOptions): Promise<Selectable<Table>>;

  /**
   * Find multiple records with pagable.
   *
   * @param pagable
   * @param options
   */
  findAll?(
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
}

export class KyselyBaseDAO<DB = any, TableName extends string = "">
  implements IDAOKysely<TableName>
{
  protected dbClient!: Kysely<DB>;
  protected tableName!: TableName;

  constructor(dbClient: Kysely<DB>, tableName: TableName) {
    this.dbClient = dbClient;
    this.tableName = tableName;
  }

  async count(): Promise<number> {
    try {
      let queryBuilder = this.dbClient.selectFrom(this.tableName as any);
      queryBuilder = (queryBuilder.select as any)((eb: any) =>
        eb.fn.countAll().as("count")
      );

      const result = (await queryBuilder.executeTakeFirstOrThrow()) as any;

      return result.count || 0;
    } catch (error) {
      return 0;
    }
  }
}
