//

import {
  DateUtils
} from "../util/date";
import {
  FloorMath
} from "../util/floor-math";
import {
  staticImplements
} from "../util/static-implements";
import {
  CustomDate,
  CustomDateStatic,
  EPOCH_DATE
} from "./custom";


@staticImplements<CustomDateStatic<GregorianDate>>()
export class GregorianDate extends CustomDate {

  private readonly rawDate: Date;

  private constructor(rawDate: Date) {
    super();
    this.rawDate = rawDate;
  }

  public static fromTime(time: number): GregorianDate {
    let rawDate = new Date(time);
    let date = new GregorianDate(rawDate);
    return date;
  }

  public override toTime(): number {
    let time = this.rawDate.getTime();
    return time;
  }

  public static of(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): GregorianDate {
    let rawDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    let date = new GregorianDate(rawDate);
    return date;
  }

  public static ofHairia(hairia: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): GregorianDate {
    let timeOfDay = EPOCH_DATE.getTime() + (hairia - 1) * 86400000;
    let timeInDay = (hours ?? 0) * 3600000 + (minutes ?? 0) * 60000 + (seconds ?? 0) * 1000 + (milliseconds ?? 0);
    let time = timeOfDay + timeInDay;
    let date = GregorianDate.fromTime(time);
    return date;
  }

  private getModifiedDate(shift?: boolean): Date {
    return (shift) ? new Date(this.rawDate.getTime() - 6 * 3600000) : this.rawDate;
  }

  public override getYear(shift?: boolean): number {
    return this.getModifiedDate(shift).getFullYear();
  }

  public override getMonth(shift?: boolean): number {
    return this.getModifiedDate(shift).getMonth() + 1;
  }

  public override getDate(shift?: boolean): number {
    return this.getModifiedDate(shift).getDate();
  }

  public override getHairia(shift?: boolean): number {
    return FloorMath.div(DateUtils.difference(this.getModifiedDate(shift), EPOCH_DATE), 86400000) + 1;
  }

  public override getHours(shift?: boolean): number {
    return this.getModifiedDate(shift).getHours() + ((shift) ? 6 : 0);
  }

  public override getMinutes(shift?: boolean): number {
    return this.getModifiedDate(shift).getMinutes();
  }

  public override getSeconds(shift?: boolean): number {
    return this.getModifiedDate(shift).getSeconds();
  }

  public override getMilliseconds(shift?: boolean): number {
    return this.getModifiedDate(shift).getMilliseconds();
  }

}