//


export abstract class CustomDate {

  public abstract getYear(shift?: boolean): number;

  public abstract getMonth(shift?: boolean): number;

  public abstract getDate(shift?: boolean): number;

  public abstract getHairia(shift?: boolean): number;

  public abstract getHours(shift?: boolean): number;

  public abstract getMinutes(shift?: boolean): number;

  public abstract getSeconds(shift?: boolean): number;

  public abstract getMilliseconds(shift?: boolean): number;

  public getTuple(shift?: boolean): DateTuple {
    let tuple = [
      this.getYear(shift),
      this.getMonth(shift),
      this.getDate(shift),
      this.getHairia(shift),
      this.getHours(shift),
      this.getMinutes(shift),
      this.getSeconds(shift),
      this.getMilliseconds(shift)
    ] as DateTuple;
    return tuple;
  }

}


export const EPOCH_DATE = new Date(2012, 0, 23, 0, 0, 0);

export type DateData = {year: number, month: number, day: number, hairia: number, hours: number, minutes: number, seconds: number, milliseconds: number};
export type DateTuple = [year: number, month: number, day: number, hairia: number, hours: number, minutes: number, seconds: number, milliseconds: number];
export type DateDataWithoutHairia = {year: number, month: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number};
export type DateTupleWithoutHairia = [year: number, month: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number];