//


export abstract class CustomDate {

  public static fromRaw<D extends CustomDate>(this: CustomDateStatic<D>, rawDate: Date): D {
    let time = rawDate.getTime();
    let date = this.fromTime(time);
    return date;
  }

  public static fromHairia<D extends CustomDate>(this: CustomDateStatic<D>, hairia: number, millisecondsInDay: number): D {
    let time = EPOCH_DATE.getTime() + (hairia - 1) * 86400000 + millisecondsInDay;
    let date = this.fromTime(time);
    return date;
  }

  public static current<D extends CustomDate>(this: CustomDateStatic<D>): D {
    let time = new Date().getTime();
    let date = this.fromTime(time);
    return date;
  }

  // 引数に与えられたクラスが表す暦のオブジェクトに変換します。
  public convert<D extends CustomDate>(clazz: CustomDateStatic<D>): D {
    let time = this.toTime();
    let date = clazz.fromTime(time);
    return date;
  }

  // UNIX 元期からの経過時間 (ミリ秒単位) を返します。
  public abstract toTime(): number;

  // 地方時に基づいて、年を表す数を返します。
  // グレゴリオ暦を表す日付オブジェクトに対してこのメソッドが呼ばれた場合、返される値は完全な年数であり、(1900 を減じるなどして) 2 桁にしたものではありません。
  // 日付が紀元前である場合、紀元前 1 年 (紀元後 1 年の前年) に対しては 0 を返し、紀元前 2 年 (紀元後 1 年の 2 年前) に対しては -1 を返します。
  public abstract getYear(shift?: boolean): number;

  // 地方時に基づいて、月を表す 1-indexed の数を返します。
  public abstract getMonth(shift?: boolean): number;

  // 地方時に基づいて、日を表す数を返します。
  public abstract getDate(shift?: boolean): number;

  // 地方時に基づいて、ハイリア数を返します。
  // ハイリア数とは、ハイリア紀元 (グレゴリオ暦 2012 年 1 月 23 日) を 1 として、そこからの日数を数えた数値です。
  // ハイリア紀元の前日に対しては 0 を返し、ハイリア紀元の 2 日前に対しては -1 を返します。
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


export interface CustomDateStatic<D extends CustomDate = CustomDate> {

  // UNIX 元期からの経過時間 (ミリ秒単位) から時刻オブジェクトを生成します。
  fromTime(time: number): D;

  // JavaScript 標準の Date オブジェクトから時刻オブジェクトを生成します。
  fromRaw(rawDate: Date): D;

  // 地方時に基づいて、ハイリア数およびその日の開始時刻からの経過時間 (ミリ秒単位) から時刻オブジェクトを生成します。
  fromHairia(hairia: number, millisecondsInDay: number): D;

  // 地方時に基づいて、各暦における日付と時刻の値から時刻オブジェクトを生成します。
  of(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): D;

  // 地方時に基づいて、ハイリア数と各暦における時刻の値から時刻オブジェクトを生成します。
  ofHairia(hairia: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): D;

  // メソッドが呼び出された時点での現在の時刻を表す時刻オブジェクトを生成します。
  current(): D;

}


export const EPOCH_DATE = new Date(2012, 0, 23, 0, 0, 0);

export type DateData = {year: number, month: number, day: number, hairia: number, hours: number, minutes: number, seconds: number, milliseconds: number};
export type DateTuple = [year: number, month: number, day: number, hairia: number, hours: number, minutes: number, seconds: number, milliseconds: number];