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

  public static from(rawDate: Date): NewHairianDate {
    let calcDate = function (shift: boolean): DateData {
      let modifiedDate = (shift) ? new Date(rawDate.getTime() - 6 * 60 * 60 * 1000) : rawDate;
      let dayCount = FloorMath.div(modifiedDate.getTime() - EPOCH_DATE.getTime(), 24 * 60 * 60 * 1000) + 547863;
      let secondCount = Math.floor((modifiedDate.getTime() - DateUtils.getBasis(modifiedDate).getTime()) * 100000 / 86400) + ((shift) ? 25000000 : 0);
      let rawYear = FloorMath.div(dayCount * 4 + 3 + FloorMath.div((FloorMath.div((dayCount + 1) * 4, 146097) * 3 + 1) * 4, 4), 1461);
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
    let unshiftedData = calcDate(false);
    let shiftedData = calcDate(true);
    let date = new NewHairianDate(unshiftedData, shiftedData);
    return date;
  }

  public static current(): NewHairianDate {
    let rawDate = new Date();
    let date = NewHairianDate.from(rawDate);
    return date;
  }

  public override getYear(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).year;
  }

  public override getMonth(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).month;
  }

  public override getDate(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).day;
  }

  public override getHairia(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).hairia;
  }

  public override getHours(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).hours;
  }

  public override getMinutes(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).minutes;
  }

  public override getSeconds(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).seconds;
  }

  public override getMilliseconds(shift?: boolean): number {
    return ((shift) ? this.shiftedData : this.unshiftedData).milliseconds;
  }

}