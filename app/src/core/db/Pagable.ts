/**
 * Base class of page.
 */
export class Page<T = any> {
  public items: Array<T>;
  public page: number;
  public size: number;

  constructor(items: Array<any>, page: number) {
    this.items = items;
    this.page = page;
    this.size = this.items.length;
  }
}

/**
 * Base class of pagable.
 */
export class Pagable {
  public page: number;
  public size: number;

  static DEFAULT_PAGE = 1;
  static DEFAULT_SIZE = 10;

  constructor(page?: string, size?: string);
  constructor(page?: number, size?: number);
  constructor(page?: number | string, size?: number | string) {
    if (page === undefined || page === null) {
      this.page = Pagable.DEFAULT_PAGE;
    } else if (typeof page === "string") {
      this.page = parseInt(page);
    } else {
      this.page = page;
    }

    if (size === undefined || size === null) {
      this.size = Pagable.DEFAULT_SIZE;
    } else if (typeof size === "string") {
      this.size = parseInt(size);
    } else {
      this.size = size;
    }
  }

  /**
   * Convert pagable to limit and offset.
   *
   * @returns calculated limit and offset.
   */
  toLimitOffset() {
    let result = {
      limit: this.size,
      offset: 0,
    };

    const previousPage = this.page > 0 ? this.page - 1 : this.page;

    if (previousPage === 0) return result;
    else {
      result.offset = previousPage * this.size;
    }

    return result;
  }
}
