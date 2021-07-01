//


export class DateUtils {

  public static getBasis(date: Date): Date {
    let baseDate = new Date(date);
    baseDate.setHours(0, 0, 0, 0);
    return baseDate;
  }

  public static difference(firstDate: Date, secondDate: Date): number {
    return firstDate.getTime() - secondDate.getTime();
  }

}