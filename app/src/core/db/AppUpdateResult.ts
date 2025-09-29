export class AppUpdateResult<ID = number> {
  public updateId?: ID;
  public numUpdatedRows: number;
  public numChangedRows: number;

  constructor(
    updateId: ID,
    numUpdatedRows: number = 0,
    numChangedRows: number = 0
  ) {
    this.updateId = updateId;
    this.numUpdatedRows = numUpdatedRows;
    this.numChangedRows = numChangedRows;
  }
}
