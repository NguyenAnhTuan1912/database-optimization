export type UFilterOperators = (typeof Filter.FilterOperators)[number];

export class Filter {
  public field?: string;
  public value?: any;
  public op?: UFilterOperators;

  static FilterOperators = [
    "=",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "in",
    "like",
    "between",
  ] as const;

  constructor(field?: string, value?: any, op?: UFilterOperators) {
    this.field = field;
    this.value = value;
    this.op = op;
  }

  consider(field: string) {
    this.field = field;
    return this;
  }

  equal(value: any) {
    this.op = "=";
    this.value = value;
    return this;
  }

  not(value: any) {
    this.op = "!=";
    this.value = value;
    return this;
  }

  greater(value: any) {
    this.op = ">";
    this.value = value;
    return this;
  }

  less(value: any) {
    this.op = "<";
    this.value = value;
    return this;
  }

  greaterOrEqual(value: any) {
    this.op = ">=";
    this.value = value;
    return this;
  }

  lessOrEqual(value: any) {
    this.op = "<=";
    this.value = value;
    return this;
  }

  in(value: any) {
    this.op = "in";
    this.value = value;
    return this;
  }

  like(value: any) {
    this.op = "like";
    this.value = value;
    return this;
  }

  between(value: any) {
    this.op = "between";
    this.value = value;
    return this;
  }
}

/**
 * Base class of query.
 */
export class Query {
  public filters?: Array<Filter>;

  constructor() {}

  /**
   * Add new filter to query.
   *
   * @param filter
   */
  addFilter(filter: Filter) {
    if (!this.filters) {
      this.filters = [
        // Except soft deleted field
        new Filter().consider("deleted").not(true),
      ];
    }

    this.filters.push(filter);
  }

  /**
   * @returns new filter can be used in query.
   * @static
   */
  static createFilter() {
    return new Filter();
  }
}
