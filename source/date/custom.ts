//


export abstract class CustomDate {

  public static fromRaw<D extends CustomDate>(this: FromTime<D>, rawDate: Date): D {
    let time = rawDate.getTime();
    let date = this.fromTime(time);
    return date;
  }

  public static fromHairia<D extends CustomDate>(this: FromTime<D>, hairia: number, timeInDay: number): D {
    let time = EPOCH_DATE.getTime() + (hairia - 1) * 86400000 + timeInDay;
    let date = this.fromTime(time);
    return date;
  }

  public static current<D extends CustomDate>(this: FromTime<D>): D {
    let time = new Date().getTime();
    let date = this.fromTime(time);
    return date;
  }

  public convert<D extends CustomDate>(clazz: FromTime<D>): D {
    let time = this.toTime();
    let date = clazz.fromTime(time);
    return date;
  }

  public abstract toTime(): number;

  public abstract getYear(shift?: boolean): number;

  public abstract getMonth(shift?: boolean): number;

  public abstract getDate(shift?: boolean): number;

  public abstract getHairia(shift?: boolean): number;

  public abstract getHours(shift?: boolean): number;

  public abstract getMinutes(shift?: boolean): number;

  public abstract getSeconds(shift?: boolean): number;

  public abstract getMilliseconds(shift?: boolean): number;

  public getTuple(shift?: boolean): DateTuple {
    let methodNames = ["getYear", "getMonth", "getDate", "getHairia", "getHours", "getMinutes", "getSeconds", "getMilliseconds"] as const;
    let tuple = methodNames.map((methodName) => this[methodName](shift)) as DateTuple;
    return tuple;
  }

}


export const EPOCH_DATE = new Date(2012, 0, 23, 0, 0, 0);

export type FromTime<D extends CustomDate> = {fromTime: (time: number) => D};

export type DateData = {year: number, month: number, day: number, hairia: number, hours: number, minutes: number, seconds: number, milliseconds: number};
export type DateTuple = [year: number, month: number, day: number, hairia: number, hours: number, minutes: number, seconds: number, milliseconds: number];
export type DateDataWithoutHairia = {year: number, month: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number};
export type DateTupleWithoutHairia = [year: number, month: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number];