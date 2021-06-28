//

import {
  FloorMath
} from "../util/floor-math";
import {
  CustomDate,
  EPOCH_DATE
} from "./custom";


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
    return FloorMath.div(this.getModifiedDate(shift).getTime() - EPOCH_DATE.getTime(), 86400000) + 1;
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