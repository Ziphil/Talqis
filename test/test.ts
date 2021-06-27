//

import {
  CustomDate,
  DateTuple,
  DateTupleWithoutHairia,
  NewHairianDate
} from "../source";


describe("from raw date", () => {
  let check = function (clazz: {fromRaw: (rawDate: Date) => CustomDate}, rawTuple: DateTupleWithoutHairia, testTuple: DateTuple, shift?: boolean) {
    let rawDate = new Date(rawTuple[0], rawTuple[1] - 1, rawTuple[2], rawTuple[3], rawTuple[4], rawTuple[5], rawTuple[6]);
    let testDate = clazz.fromRaw(rawDate);
    expect(testDate.getTuple(shift)).toEqual(testTuple);
  };
  test("G2012/01/23 00:00:00.000 (epoch)", () => {
    check(NewHairianDate, [2012, 1, 23, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], false);
  });
  test("G2012/01/22 00:00:00.000", () => {
    check(NewHairianDate, [2012, 1, 22, 0, 0, 0, 0], [0, 12, 2, 0, 0, 0, 0, 0], false);
  });
  test("G2012/01/21 00:00:00.000", () => {
    check(NewHairianDate, [2012, 1, 21, 0, 0, 0, 0], [0, 12, 1, -1, 0, 0, 0, 0], false);
  });
  test("G2036/01/22 18:37:34.320 (leap year)", () => {
    check(NewHairianDate, [2036, 1, 22, 18, 37, 34, 320], [24, 12, 3, 8766, 7, 76, 9, 166], false);
  });
  test("G2020/08/18 18:58:10.583", () => {
    check(NewHairianDate, [2020, 8, 18, 18, 58, 10, 583], [9, 7, 11, 3131, 7, 90, 40, 26], false);
  });
  test("G2028/06/02 14:00:04.126", () => {
    check(NewHairianDate, [2028, 6, 2, 14, 0, 4, 126], [17, 4, 33, 5976, 5, 83, 38, 108], false);
  });
  test("G2033/03/02 09:43:54.511", () => {
    check(NewHairianDate, [2033, 3, 2, 9, 43, 54, 511], [22, 2, 7, 7710, 4, 5, 49, 202], false);
  });
  test("G2018/10/08 14:27:16.092", () => {
    check(NewHairianDate, [2018, 10, 8, 14, 27, 16, 92], [7, 8, 29, 2451, 6, 2, 26, 958], false);
  });
  test("G2038/07/13 06:55:47.107", () => {
    check(NewHairianDate, [2038, 7, 13, 6, 55, 47, 107], [27, 6, 8, 9669, 2, 88, 73, 966], false);
  });
  test("G2047/12/05 03:02:44.108", () => {
    check(NewHairianDate, [2047, 12, 5, 3, 2, 44, 108], [36, 10, 21, 13101, 1, 26, 89, 939], false);
  });
  test("G2033/03/02 09:32:35.664", () => {
    check(NewHairianDate, [2033, 3, 2, 9, 32, 35, 664], [22, 2, 7, 7710, 3, 97, 63, 500], false);
  });
  test("G2031/11/07 06:05:38.925", () => {
    check(NewHairianDate, [2031, 11, 7, 6, 5, 38, 925], [20, 9, 26, 7229, 2, 53, 92, 274], false);
  });
  test("G2015/06/02 11:50:58.196", () => {
    check(NewHairianDate, [2015, 6, 2, 11, 50, 58, 196], [4, 4, 33, 1227, 4, 93, 72, 912], false);
  });
  test("1961/05/28 12:19:28.004", () => {
    check(NewHairianDate, [1961, 5, 28, 12, 19, 28, 4], [-50, 4, 27, -18501, 5, 13, 51, 856], false);
  });
  test("G2001/08/25 17:01:00.187", () => {
    check(NewHairianDate, [2001, 8, 25, 17, 1, 0, 187], [-10, 7, 17, -3802, 7, 9, 2, 994], false);
  });
  test("1957/01/03 06:01:45.968", () => {
    check(NewHairianDate, [1957, 1, 3, 6, 1, 45, 968], [-55, 11, 16, -20107, 2, 51, 22, 648], false);
  });
  test("1987/12/10 02:13:59.235", () => {
    check(NewHairianDate, [1987, 12, 10, 2, 13, 59, 235], [-24, 10, 25, -8809, 0, 93, 4, 670], false);
  });
});