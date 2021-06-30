//

import {
  Repeat
} from "typescript-tuple";
import {
  CustomDateStatic,
  DateTuple,
  GregorianDate,
  NewHairianDate
} from "../source";


describe("from raw date object", () => {
  let check = function (clazz: CustomDateStatic, rawTuple: Repeat<number, 7>, testTuple: DateTuple, shift?: boolean) {
    let rawDate = new Date(rawTuple[0], rawTuple[1] - 1, rawTuple[2], rawTuple[3], rawTuple[4], rawTuple[5], rawTuple[6]);
    let testDate = clazz.fromRaw(rawDate);
    expect(testDate.getTuple(shift)).toEqual(testTuple);
  };
  test("G2012/01/23 00:00:00.000 (epoch)", () => {
    check(NewHairianDate, [2012, 1, 23, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 23, 0, 0, 0, 0], [2012, 1, 23, 1, 0, 0, 0, 0], false);
  });
  test("G2012/01/23 00:00:00.000 (epoch+1)", () => {
    check(NewHairianDate, [2012, 1, 24, 0, 0, 0, 0], [1, 1, 2, 2, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 24, 0, 0, 0, 0], [2012, 1, 24, 2, 0, 0, 0, 0], false);
  });
  test("G2012/01/22 00:00:00.000 (epoch−1)", () => {
    check(NewHairianDate, [2012, 1, 22, 0, 0, 0, 0], [0, 12, 2, 0, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 22, 0, 0, 0, 0], [2012, 1, 22, 0, 0, 0, 0, 0], false);
  });
  test("G2012/01/21 00:00:00.000 (epoch−2)", () => {
    check(NewHairianDate, [2012, 1, 21, 0, 0, 0, 0], [0, 12, 1, -1, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 21, 0, 0, 0, 0], [2012, 1, 21, -1, 0, 0, 0, 0], false);
  });
  test("G2036/01/22 18:37:34.320 (leap year)", () => {
    check(NewHairianDate, [2036, 1, 22, 18, 37, 34, 320], [24, 12, 3, 8766, 7, 76, 9, 166], false);
    check(GregorianDate, [2036, 1, 22, 18, 37, 34, 320], [2036, 1, 22, 8766, 18, 37, 34, 320], false);
  });
  test("G2112/01/23 01:12:07.074 (leap year)", () => {
    check(NewHairianDate, [2112, 1, 23, 1, 12, 7, 74], [100, 12, 3, 36525, 0, 50, 8, 187], false);
    check(GregorianDate, [2112, 1, 23, 1, 12, 7, 74], [2112, 1, 23, 36525, 1, 12, 7, 74], false);
  });
  test("G2212/01/24 23:02:10.996 (not leap year)", () => {
    check(NewHairianDate, [2212, 1, 24, 23, 2, 10, 996], [201, 1, 1, 73050, 9, 59, 84, 949], false);
    check(GregorianDate, [2212, 1, 24, 23, 2, 10, 996], [2212, 1, 24, 73050, 23, 2, 10, 996], false);
  });
  test("G2020/08/18 18:58:10.583 (random after epoch 1)", () => {
    check(NewHairianDate, [2020, 8, 18, 18, 58, 10, 583], [9, 7, 11, 3131, 7, 90, 40, 26], false);
    check(GregorianDate, [2020, 8, 18, 18, 58, 10, 583], [2020, 8, 18, 3131, 18, 58, 10, 583], false);
  });
  test("G2028/06/02 14:00:04.126 (random after epoch 2)", () => {
    check(NewHairianDate, [2028, 6, 2, 14, 0, 4, 126], [17, 4, 33, 5976, 5, 83, 38, 108], false);
    check(GregorianDate, [2028, 6, 2, 14, 0, 4, 126], [2028, 6, 2, 5976, 14, 0, 4, 126], false);
  });
  test("G2033/03/02 09:43:54.511 (random after epoch 3)", () => {
    check(NewHairianDate, [2033, 3, 2, 9, 43, 54, 511], [22, 2, 7, 7710, 4, 5, 49, 202], false);
    check(GregorianDate, [2033, 3, 2, 9, 43, 54, 511], [2033, 3, 2, 7710, 9, 43, 54, 511], false);
  });
  test("G2018/10/08 14:27:16.092 (random after epoch 4)", () => {
    check(NewHairianDate, [2018, 10, 8, 14, 27, 16, 92], [7, 8, 29, 2451, 6, 2, 26, 958], false);
    check(GregorianDate, [2018, 10, 8, 14, 27, 16, 92], [2018, 10, 8, 2451, 14, 27, 16, 92], false);
  });
  test("G2038/07/13 06:55:47.107 (random after epoch 5)", () => {
    check(NewHairianDate, [2038, 7, 13, 6, 55, 47, 107], [27, 6, 8, 9669, 2, 88, 73, 966], false);
    check(GregorianDate, [2038, 7, 13, 6, 55, 47, 107], [2038, 7, 13, 9669, 6, 55, 47, 107], false);
  });
  test("G2047/12/05 03:02:44.108 (random after epoch 6)", () => {
    check(NewHairianDate, [2047, 12, 5, 3, 2, 44, 108], [36, 10, 21, 13101, 1, 26, 89, 939], false);
    check(GregorianDate, [2047, 12, 5, 3, 2, 44, 108], [2047, 12, 5, 13101, 3, 2, 44, 108], false);
  });
  test("G2033/03/02 09:32:35.664 (random after epoch 7)", () => {
    check(NewHairianDate, [2033, 3, 2, 9, 32, 35, 664], [22, 2, 7, 7710, 3, 97, 63, 500], false);
    check(GregorianDate, [2033, 3, 2, 9, 32, 35, 664], [2033, 3, 2, 7710, 9, 32, 35, 664], false);
  });
  test("G2031/11/07 06:05:38.925 (random after epoch 8)", () => {
    check(NewHairianDate, [2031, 11, 7, 6, 5, 38, 925], [20, 9, 26, 7229, 2, 53, 92, 274], false);
    check(GregorianDate, [2031, 11, 7, 6, 5, 38, 925], [2031, 11, 7, 7229, 6, 5, 38, 925], false);
  });
  test("G2015/06/02 11:50:58.196 (random after epoch 9)", () => {
    check(NewHairianDate, [2015, 6, 2, 11, 50, 58, 196], [4, 4, 33, 1227, 4, 93, 72, 912], false);
    check(GregorianDate, [2015, 6, 2, 11, 50, 58, 196], [2015, 6, 2, 1227, 11, 50, 58, 196], false);
  });
  test("G1961/05/28 12:19:28.004 (random before epoch 1)", () => {
    check(NewHairianDate, [1961, 5, 28, 12, 19, 28, 4], [-50, 4, 27, -18501, 5, 13, 51, 856], false);
    check(GregorianDate, [1961, 5, 28, 12, 19, 28, 4], [1961, 5, 28, -18501, 12, 19, 28, 4], false);
  });
  test("G2001/08/25 17:01:00.187 (random before epoch 2)", () => {
    check(NewHairianDate, [2001, 8, 25, 17, 1, 0, 187], [-10, 7, 17, -3802, 7, 9, 2, 994], false);
    check(GregorianDate, [2001, 8, 25, 17, 1, 0, 187], [2001, 8, 25, -3802, 17, 1, 0, 187], false);
  });
  test("G1957/01/03 06:01:45.968 (random before epoch 3)", () => {
    check(NewHairianDate, [1957, 1, 3, 6, 1, 45, 968], [-55, 11, 16, -20107, 2, 51, 22, 648], false);
    check(GregorianDate, [1957, 1, 3, 6, 1, 45, 968], [1957, 1, 3, -20107, 6, 1, 45, 968], false);
  });
  test("G1987/12/10 02:13:59.235 (random before epoch 4)", () => {
    check(NewHairianDate, [1987, 12, 10, 2, 13, 59, 235], [-24, 10, 25, -8809, 0, 93, 4, 670], false);
    check(GregorianDate, [1987, 12, 10, 2, 13, 59, 235], [1987, 12, 10, -8809, 2, 13, 59, 235], false);
  });
});

describe("specified by date component values", () => {
  let check = function (clazz: CustomDateStatic, tuple: Repeat<number, 7>, testTuple: DateTuple, shift?: boolean) {
    let testDate = clazz.of(tuple[0], tuple[1], tuple[2], tuple[3], tuple[4], tuple[5], tuple[6]);
    expect(testDate.getTuple(shift)).toEqual(testTuple);
  };
  test("G2013/12/30 21:35:36.037 (random after epoch 1)", () => {
    check(NewHairianDate, [2, 11, 13, 8, 99, 72, 265], [2, 11, 13, 708, 8, 99, 72, 265], false);
    check(GregorianDate, [2013, 12, 30, 21, 35, 36, 37], [2013, 12, 30, 708, 21, 35, 36, 37], false);
  });
  test("G2037/03/04 03:50:51.995 (random after epoch 2)", () => {
    check(NewHairianDate, [26, 2, 9, 0, 93, 4, 670], [26, 2, 9, 9173, 0, 93, 4, 670], false);
    check(GregorianDate, [2037, 3, 4, 2, 13, 59, 235], [2037, 3, 4, 9173, 2, 13, 59, 235], false);
  });
  test("G1969/04/09 16:23:48.599 (random before epoch 1)", () => {
    check(NewHairianDate, [-42, 3, 11, 6, 83, 20, 137], [-42, 3, 11, -15628, 6, 83, 20, 137], false);
    check(GregorianDate, [1969, 4, 9, 16, 23, 48, 599], [1969, 4, 9, -15628, 16, 23, 48, 599], false);
  });
});