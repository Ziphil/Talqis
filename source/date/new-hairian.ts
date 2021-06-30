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
  DateData,
  EPOCH_DATE
} from "./custom";


@staticImplements<CustomDateStatic<NewHairianDate>>()
export class NewHairianDate extends CustomDate {

  private readonly unshiftedData: Readonly<DateData>;
  private readonly shiftedData: Readonly<DateData>;

  private constructor(unshiftedData: DateData, shiftedData: DateData) {
    super();
    this.unshiftedData = unshiftedData;
    this.shiftedData = shiftedData;
  }

  private static create(hairia: number, millisecondCount: number): NewHairianDate {
    let calcData = function (shift: boolean): DateData {
      let dayCount = hairia + 547862 - ((shift && millisecondCount < 6 * 3600000 * 1000 / 864) ? 1 : 0);
      let rawYear = FloorMath.div(dayCount * 4 + FloorMath.div((FloorMath.div((dayCount + 1) * 4, 146097) + 1) * 3, 4) * 4 + 3, 1461);
      let rawDay = dayCount - (rawYear * 365 + FloorMath.div(rawYear, 4) - FloorMath.div(rawYear, 100) + FloorMath.div(rawYear, 400));
      let year = rawYear - 1500 + 1;
      let month = FloorMath.div(rawDay, 33) + 1;
      let day = FloorMath.mod(rawDay, 33) + 1;
      let hours = FloorMath.div(millisecondCount, 10000000) + ((shift && millisecondCount < 6 * 3600000 * 1000 / 864) ? 10 : 0);
      let minutes = FloorMath.div(FloorMath.mod(millisecondCount, 10000000), 100000);
      let seconds = FloorMath.div(FloorMath.mod(millisecondCount, 100000), 1000);
      let milliseconds = FloorMath.mod(millisecondCount, 1000);
      let data = {year, month, day, hairia, hours, minutes, seconds, milliseconds};
      return data;
    };
    let unshiftedData = calcData(false);
    let shiftedData = calcData(true);
    let date = new NewHairianDate(unshiftedData, shiftedData);
    return date;
  }

  public static fromTime(time: number): NewHairianDate {
    let rawDate = new Date(time);
    let hairia = FloorMath.div(DateUtils.difference(rawDate, EPOCH_DATE), 86400000) + 1;
    let millisecondCount = Math.floor(DateUtils.difference(rawDate, DateUtils.getBasis(rawDate)) * 1000 / 864);
    let date = NewHairianDate.create(hairia, millisecondCount);
    return date;
  }

  public override toTime(): number {
    let timeOfDay = EPOCH_DATE.getTime() + (this.unshiftedData.hairia - 1) * 86400000;
    let timeInDay = (this.unshiftedData.hours * 10000000 + this.unshiftedData.minutes * 100000 + this.unshiftedData.seconds * 1000 + this.unshiftedData.milliseconds) * 864 / 1000;
    let time = timeOfDay + timeInDay;
    return time;
  }

  public static of(year: number, month: number, day: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): NewHairianDate {
    let addedYear = year + 1500;
    let hairia = (addedYear - 1) * 365 + FloorMath.div(addedYear - 1, 4) - FloorMath.div(addedYear - 1, 100) + FloorMath.div(addedYear - 1, 400) + (month - 1) * 33 + day - 547863;
    let date = NewHairianDate.ofHairia(hairia, hours, minutes, seconds, milliseconds);
    return date;
  }

  public static ofHairia(hairia: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): NewHairianDate {
    let millisecondCount = (hours ?? 0) * 10000000 + (minutes ?? 0) * 100000 + (seconds ?? 0) * 1000 + (milliseconds ?? 0);
    let date = NewHairianDate.create(hairia, millisecondCount);
    return date;
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