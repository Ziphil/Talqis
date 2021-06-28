//

import {
  DateUtils
} from "../util/date";
import {
  FloorMath
} from "../util/floor-math";
import {
  CustomDate,
  DateData,
  EPOCH_DATE
} from "./custom";


export class NewHairianDate extends CustomDate {

  private readonly unshiftedData: Readonly<DateData>;
  private readonly shiftedData: Readonly<DateData>;

  private constructor(unshiftedData: DateData, shiftedData: DateData) {
    super();
    this.unshiftedData = unshiftedData;
    this.shiftedData = shiftedData;
  }

  public static fromTime(time: number): NewHairianDate {
    let calcData = function (shift: boolean): DateData {
      let modifiedDate = (shift) ? new Date(time - 6 * 3600000) : new Date(time);
      let dayCount = FloorMath.div(modifiedDate.getTime() - EPOCH_DATE.getTime(), 24 * 60 * 60 * 1000) + 547863;
      let secondCount = Math.floor((modifiedDate.getTime() - DateUtils.getBasis(modifiedDate).getTime()) * 1000 / 864) + ((shift) ? 25000000 : 0);
      let rawYear = FloorMath.div(dayCount * 4 + FloorMath.div((FloorMath.div((dayCount + 1) * 4, 146097) + 1) * 3, 4) * 4 + 3, 1461);
      let rawDay = dayCount - (rawYear * 365 + FloorMath.div(rawYear, 4) - FloorMath.div(rawYear, 100) + FloorMath.div(rawYear, 400));
      let year = rawYear - 1500 + 1;
      let month = FloorMath.div(rawDay, 33) + 1;
      let day = FloorMath.mod(rawDay, 33) + 1;
      let hairia = dayCount - 547862;
      let hours = FloorMath.div(secondCount, 10000000);
      let minutes = FloorMath.div(FloorMath.mod(secondCount, 10000000), 100000);
      let seconds = FloorMath.div(FloorMath.mod(secondCount, 100000), 1000);
      let milliseconds = FloorMath.mod(secondCount, 1000);
      let data = {year, month, day, hairia, hours, minutes, seconds, milliseconds};
      return data;
    };
    let unshiftedData = calcData(false);
    let shiftedData = calcData(true);
    let date = new NewHairianDate(unshiftedData, shiftedData);
    return date;
  }

  public override toTime(): number {
    let timeOfDay = EPOCH_DATE.getTime() + (this.unshiftedData.hairia - 1) * 86400000;
    let timeInDay = (this.unshiftedData.hours * 10000000 + this.unshiftedData.minutes * 100000 + this.unshiftedData.seconds * 1000 + this.unshiftedData.milliseconds) * 864 / 1000;
    let time = timeOfDay + timeInDay;
    return time;
  }

  private getModifiedData(shift?: boolean): DateData {
    return (shift) ? this.shiftedData : this.unshiftedData;
  }

  public override getYear(shift?: boolean): number {
    return this.getModifiedData(shift).year;
  }

  public override getMonth(shift?: boolean): number {
    return this.getModifiedData(shift).month;
  }

  public override getDate(shift?: boolean): number {
    return this.getModifiedData(shift).day;
  }

  public override getHairia(shift?: boolean): number {
    return this.getModifiedData(shift).hairia;
  }

  public override getHours(shift?: boolean): number {
    return this.getModifiedData(shift).hours;
  }

  public override getMinutes(shift?: boolean): number {
    return this.getModifiedData(shift).minutes;
  }

  public override getSeconds(shift?: boolean): number {
    return this.getModifiedData(shift).seconds;
  }

  public override getMilliseconds(shift?: boolean): number {
    return this.getModifiedData(shift).milliseconds;
  }

}