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

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;
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
