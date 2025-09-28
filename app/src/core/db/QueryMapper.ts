import { LoggerBuilder } from "../../utils/logger";

import type { Query } from "./Query";

/**
 * Asbtract class for query mapper.
 */
export abstract class QueryMapper {
  /**
   * Select all filters in query.
   *
   * @param qb
   * @param query
   * @returns
   */
  processFilters<QB = any>(qb: QB, query: Query) {
    if (!query.filters) return qb;

    for (const filter of query.filters) {
      if (!filter.field) {
        LoggerBuilder.Logger.warn(
          LoggerBuilder.buildNormalLog(
            "Skip this filter because name of field in filter is not set"
          )
        );
        continue;
      }

      if (!filter.value) {
        LoggerBuilder.Logger.warn(
          LoggerBuilder.buildNormalLog(
            "Skip this filter because value is not set"
          )
        );
        continue;
      }

      switch (filter.op) {
        case "=": {
          qb = this.equal(qb, filter.field, filter.value);
          break;
        }

        case "!=": {
          qb = this.not(qb, filter.field, filter.value);
          break;
        }

        case "<": {
          qb = this.less(qb, filter.field, filter.value);
          break;
        }

        case ">": {
          qb = this.greater(qb, filter.field, filter.value);
          break;
        }

        case "<=": {
          qb = this.lessOrEqual(qb, filter.field, filter.value);
          break;
        }

        case ">=": {
          qb = this.greaterOrEqual(qb, filter.field, filter.value);
          break;
        }

        case "in": {
          qb = this.in(qb, filter.field, filter.value);
          break;
        }

        case "like": {
          qb = this.like(qb, filter.field, filter.value);
          break;
        }

        case "between": {
          qb = this.between(qb, filter.field, filter.value);
          break;
        }

        default:
          continue;
      }
    }

    return qb;
  }

  /**
   * Map `equal` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract equal<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `not` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract not<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `greater` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract greater<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `less` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract less<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `greaterOrEqual` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract greaterOrEqual<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `lessOrEqual` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract lessOrEqual<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `in` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract in<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `like` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract like<QB = any>(qb: QB, field: string, value: any): QB;

  /**
   * Map `between` to native method, operator of query builder.
   *
   * @param qb
   * @param field
   * @param value
   */
  abstract between<QB = any>(qb: QB, field: string, value: any): QB;
}
