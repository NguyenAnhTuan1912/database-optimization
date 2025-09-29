export class AppInsertResult<ID = number> {
  public insertId?: ID;
  public numInsertedOrUpdatedRows: number;

  constructor(insertId: ID, numInsertedOrUpdatedRows: number = 0) {
    this.insertId = insertId;
    this.numInsertedOrUpdatedRows = numInsertedOrUpdatedRows;
  }
}
