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
  test("epoch", () => {
    check(NewHairianDate, [2012, 1, 23, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], false);
    check(NewHairianDate, [2012, 1, 23, 0, 0, 0, 0], [0, 12, 2, 0, 10, 0, 0, 0], true);
    check(GregorianDate, [2012, 1, 23, 0, 0, 0, 0], [2012, 1, 23, 1, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 23, 0, 0, 0, 0], [2012, 1, 22, 0, 24, 0, 0, 0], true);
  });
  test("epoch+1", () => {
    check(NewHairianDate, [2012, 1, 24, 0, 0, 0, 0], [1, 1, 2, 2, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 24, 0, 0, 0, 0], [2012, 1, 24, 2, 0, 0, 0, 0], false);
  });
  test("epoch−1", () => {
    check(NewHairianDate, [2012, 1, 22, 0, 0, 0, 0], [0, 12, 2, 0, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 22, 0, 0, 0, 0], [2012, 1, 22, 0, 0, 0, 0, 0], false);
  });
  test("epoch−2", () => {
    check(NewHairianDate, [2012, 1, 21, 0, 0, 0, 0], [0, 12, 1, -1, 0, 0, 0, 0], false);
    check(GregorianDate, [2012, 1, 21, 0, 0, 0, 0], [2012, 1, 21, -1, 0, 0, 0, 0], false);
  });
  test("leap year", () => {
    check(NewHairianDate, [2036, 1, 22, 18, 37, 34, 320], [24, 12, 3, 8766, 7, 76, 9, 166], false);
    check(GregorianDate, [2036, 1, 22, 18, 37, 34, 320], [2036, 1, 22, 8766, 18, 37, 34, 320], false);
  });
  test("exceptional leap year", () => {
    check(NewHairianDate, [2112, 1, 23, 1, 12, 7, 74], [100, 12, 3, 36525, 0, 50, 8, 187], false);
    check(GregorianDate, [2112, 1, 23, 1, 12, 7, 74], [2112, 1, 23, 36525, 1, 12, 7, 74], false);
  });
  test("not leap year", () => {
    check(NewHairianDate, [2212, 1, 24, 23, 2, 10, 996], [201, 1, 1, 73050, 9, 59, 84, 949], false);
    check(GregorianDate, [2212, 1, 24, 23, 2, 10, 996], [2212, 1, 24, 73050, 23, 2, 10, 996], false);
  });
  test("random after epoch 1", () => {
    check(NewHairianDate, [2020, 8, 18, 18, 58, 10, 583], [9, 7, 11, 3131, 7, 90, 40, 26], false);
    check(NewHairianDate, [2020, 8, 18, 18, 58, 10, 583], [9, 7, 11, 3131, 7, 90, 40, 26], true);
    check(GregorianDate, [2020, 8, 18, 18, 58, 10, 583], [2020, 8, 18, 3131, 18, 58, 10, 583], false);
    check(GregorianDate, [2020, 8, 18, 18, 58, 10, 583], [2020, 8, 18, 3131, 18, 58, 10, 583], true);
  });
  test("random after epoch 2", () => {
    check(NewHairianDate, [2028, 6, 2, 14, 0, 4, 126], [17, 4, 33, 5976, 5, 83, 38, 108], false);
    check(NewHairianDate, [2028, 6, 2, 14, 0, 4, 126], [17, 4, 33, 5976, 5, 83, 38, 108], true);
    check(GregorianDate, [2028, 6, 2, 14, 0, 4, 126], [2028, 6, 2, 5976, 14, 0, 4, 126], false);
    check(GregorianDate, [2028, 6, 2, 14, 0, 4, 126], [2028, 6, 2, 5976, 14, 0, 4, 126], true);
  });
  test("random after epoch 3", () => {
    check(NewHairianDate, [2033, 3, 2, 9, 43, 54, 511], [22, 2, 7, 7710, 4, 5, 49, 202], false);
    check(NewHairianDate, [2033, 3, 2, 9, 43, 54, 511], [22, 2, 7, 7710, 4, 5, 49, 202], true);
    check(GregorianDate, [2033, 3, 2, 9, 43, 54, 511], [2033, 3, 2, 7710, 9, 43, 54, 511], false);
    check(GregorianDate, [2033, 3, 2, 9, 43, 54, 511], [2033, 3, 2, 7710, 9, 43, 54, 511], true);
  });
  test("random after epoch 4", () => {
    check(NewHairianDate, [2018, 10, 8, 2, 27, 16, 92], [7, 8, 29, 2451, 1, 2, 26, 958], false);
    check(NewHairianDate, [2018, 10, 8, 2, 27, 16, 92], [7, 8, 28, 2450, 11, 2, 26, 958], true);
    check(GregorianDate, [2018, 10, 8, 2, 27, 16, 92], [2018, 10, 8, 2451, 2, 27, 16, 92], false);
    check(GregorianDate, [2018, 10, 8, 2, 27, 16, 92], [2018, 10, 7, 2450, 26, 27, 16, 92], true);
  });
  test("random after epoch 5", () => {
    check(NewHairianDate, [2038, 7, 13, 6, 55, 47, 107], [27, 6, 8, 9669, 2, 88, 73, 966], false);
    check(NewHairianDate, [2038, 7, 13, 6, 55, 47, 107], [27, 6, 8, 9669, 2, 88, 73, 966], true);
    check(GregorianDate, [2038, 7, 13, 6, 55, 47, 107], [2038, 7, 13, 9669, 6, 55, 47, 107], false);
    check(GregorianDate, [2038, 7, 13, 6, 55, 47, 107], [2038, 7, 13, 9669, 6, 55, 47, 107], true);
  });
  test("random after epoch 6", () => {
    check(NewHairianDate, [2047, 12, 5, 3, 2, 44, 108], [36, 10, 21, 13101, 1, 26, 89, 939], false);
    check(NewHairianDate, [2047, 12, 5, 3, 2, 44, 108], [36, 10, 20, 13100, 11, 26, 89, 939], true);
    check(GregorianDate, [2047, 12, 5, 3, 2, 44, 108], [2047, 12, 5, 13101, 3, 2, 44, 108], false);
    check(GregorianDate, [2047, 12, 5, 3, 2, 44, 108], [2047, 12, 4, 13100, 27, 2, 44, 108], true);
  });
  test("random after epoch 7", () => {
    check(NewHairianDate, [2033, 3, 2, 9, 32, 35, 664], [22, 2, 7, 7710, 3, 97, 63, 500], false);
    check(NewHairianDate, [2033, 3, 2, 9, 32, 35, 664], [22, 2, 7, 7710, 3, 97, 63, 500], true);
    check(GregorianDate, [2033, 3, 2, 9, 32, 35, 664], [2033, 3, 2, 7710, 9, 32, 35, 664], false);
    check(GregorianDate, [2033, 3, 2, 9, 32, 35, 664], [2033, 3, 2, 7710, 9, 32, 35, 664], true);
  });
  test("random after epoch 8", () => {
    check(NewHairianDate, [2031, 11, 7, 0, 5, 38, 925], [20, 9, 26, 7229, 0, 3, 92, 274], false);
    check(NewHairianDate, [2031, 11, 7, 0, 5, 38, 925], [20, 9, 25, 7228, 10, 3, 92, 274], true);
    check(GregorianDate, [2031, 11, 7, 0, 5, 38, 925], [2031, 11, 7, 7229, 0, 5, 38, 925], false);
    check(GregorianDate, [2031, 11, 7, 0, 5, 38, 925], [2031, 11, 6, 7228, 24, 5, 38, 925], true);
  });
  test("random after epoch 9", () => {
    check(NewHairianDate, [2015, 6, 2, 11, 50, 58, 196], [4, 4, 33, 1227, 4, 93, 72, 912], false);
    check(NewHairianDate, [2015, 6, 2, 11, 50, 58, 196], [4, 4, 33, 1227, 4, 93, 72, 912], true);
    check(GregorianDate, [2015, 6, 2, 11, 50, 58, 196], [2015, 6, 2, 1227, 11, 50, 58, 196], false);
    check(GregorianDate, [2015, 6, 2, 11, 50, 58, 196], [2015, 6, 2, 1227, 11, 50, 58, 196], true);
  });
  test("random before epoch 1", () => {
    check(NewHairianDate, [1961, 5, 28, 12, 19, 28, 4], [-50, 4, 27, -18501, 5, 13, 51, 856], false);
    check(NewHairianDate, [1961, 5, 28, 12, 19, 28, 4], [-50, 4, 27, -18501, 5, 13, 51, 856], true);
    check(GregorianDate, [1961, 5, 28, 12, 19, 28, 4], [1961, 5, 28, -18501, 12, 19, 28, 4], false);
    check(GregorianDate, [1961, 5, 28, 12, 19, 28, 4], [1961, 5, 28, -18501, 12, 19, 28, 4], true);
  });
  test("random before epoch 2", () => {
    check(NewHairianDate, [2001, 8, 25, 5, 1, 0, 187], [-10, 7, 17, -3802, 2, 9, 2, 994], false);
    check(NewHairianDate, [2001, 8, 25, 5, 1, 0, 187], [-10, 7, 16, -3803, 12, 9, 2, 994], true);
    check(GregorianDate, [2001, 8, 25, 5, 1, 0, 187], [2001, 8, 25, -3802, 5, 1, 0, 187], false);
    check(GregorianDate, [2001, 8, 25, 5, 1, 0, 187], [2001, 8, 24, -3803, 29, 1, 0, 187], true);
  });
  test("random before epoch 3", () => {
    check(NewHairianDate, [1957, 1, 3, 6, 1, 45, 968], [-55, 11, 16, -20107, 2, 51, 22, 648], false);
    check(NewHairianDate, [1957, 1, 3, 6, 1, 45, 968], [-55, 11, 16, -20107, 2, 51, 22, 648], true);
    check(GregorianDate, [1957, 1, 3, 6, 1, 45, 968], [1957, 1, 3, -20107, 6, 1, 45, 968], false);
    check(GregorianDate, [1957, 1, 3, 6, 1, 45, 968], [1957, 1, 3, -20107, 6, 1, 45, 968], true);
  });
  test("random before epoch 4", () => {
    check(NewHairianDate, [1987, 12, 10, 2, 13, 59, 235], [-24, 10, 25, -8809, 0, 93, 4, 670], false);
    check(NewHairianDate, [1987, 12, 10, 2, 13, 59, 235], [-24, 10, 24, -8810, 10, 93, 4, 670], true);
    check(GregorianDate, [1987, 12, 10, 2, 13, 59, 235], [1987, 12, 10, -8809, 2, 13, 59, 235], false);
    check(GregorianDate, [1987, 12, 10, 2, 13, 59, 235], [1987, 12, 9, -8810, 26, 13, 59, 235], true);
  });
});

describe("from hairian number and time in day", () => {
  let check = function (clazz: CustomDateStatic, tuple: Repeat<number, 2>, testTuple: DateTuple, shift?: boolean) {
    let testDate = clazz.fromHairia(tuple[0], tuple[1]);
    expect(testDate.getTuple(shift)).toEqual(testTuple);
  };
  test("random after epoch 1", () => {
    check(NewHairianDate, [813, 79043681], [3, 3, 17, 813, 9, 14, 85, 741], false);
    check(NewHairianDate, [813, 79043681], [3, 3, 17, 813, 9, 14, 85, 741], true);
    check(GregorianDate, [813, 79043681], [2014, 4, 14, 813, 21, 57, 23, 681], false);
    check(GregorianDate, [813, 79043681], [2014, 4, 14, 813, 21, 57, 23, 681], true);
  });
  test("random after epoch 2", () => {
    check(NewHairianDate, [7339, 12798044], [21, 2, 1, 7339, 1, 48, 12, 550], false);
    check(NewHairianDate, [7339, 12798044], [21, 1, 33, 7338, 11, 48, 12, 550], true);
    check(GregorianDate, [7339, 12798044], [2032, 2, 25, 7339, 3, 33, 18, 44], false);
    check(GregorianDate, [7339, 12798044], [2032, 2, 24, 7338, 27, 33, 18, 44], true);
  });
  test("random before epoch 1", () => {
    check(NewHairianDate, [-2942, 82285991], [-8, 11, 15, -2942, 9, 52, 38, 415], false);
    check(NewHairianDate, [-2942, 82285991], [-8, 11, 15, -2942, 9, 52, 38, 415], true);
    check(GregorianDate, [-2942, 82285991], [2004, 1, 2, -2942, 22, 51, 25, 991], false);
    check(GregorianDate, [-2942, 82285991], [2004, 1, 2, -2942, 22, 51, 25, 991], true);
  });
});

describe("specified by component values", () => {
  let check = function (clazz: CustomDateStatic, tuple: Repeat<number, 7>, testTuple: DateTuple, shift?: boolean) {
    let testDate = clazz.of(tuple[0], tuple[1], tuple[2], tuple[3], tuple[4], tuple[5], tuple[6]);
    expect(testDate.getTuple(shift)).toEqual(testTuple);
  };
  test("random after epoch 1", () => {
    check(NewHairianDate, [2, 11, 13, 8, 99, 72, 265], [2, 11, 13, 708, 8, 99, 72, 265], false);
    check(NewHairianDate, [2, 11, 13, 8, 99, 72, 265], [2, 11, 13, 708, 8, 99, 72, 265], true);
    check(GregorianDate, [2013, 12, 30, 21, 35, 36, 37], [2013, 12, 30, 708, 21, 35, 36, 37], false);
    check(GregorianDate, [2013, 12, 30, 21, 35, 36, 37], [2013, 12, 30, 708, 21, 35, 36, 37], true);
  });
  test("random after epoch 2", () => {
    check(NewHairianDate, [26, 2, 9, 0, 93, 4, 670], [26, 2, 9, 9173, 0, 93, 4, 670], false);
    check(NewHairianDate, [26, 2, 9, 0, 93, 4, 670], [26, 2, 8, 9172, 10, 93, 4, 670], true);
    check(GregorianDate, [2037, 3, 4, 2, 13, 59, 235], [2037, 3, 4, 9173, 2, 13, 59, 235], false);
    check(GregorianDate, [2037, 3, 4, 2, 13, 59, 235], [2037, 3, 3, 9172, 26, 13, 59, 235], true);
  });
  test("random before epoch 1", () => {
    check(NewHairianDate, [-42, 3, 11, 6, 83, 20, 137], [-42, 3, 11, -15628, 6, 83, 20, 137], false);
    check(NewHairianDate, [-42, 3, 11, 6, 83, 20, 137], [-42, 3, 11, -15628, 6, 83, 20, 137], true);
    check(GregorianDate, [1969, 4, 9, 16, 23, 48, 599], [1969, 4, 9, -15628, 16, 23, 48, 599], false);
    check(GregorianDate, [1969, 4, 9, 16, 23, 48, 599], [1969, 4, 9, -15628, 16, 23, 48, 599], true);
  });
});

describe("specified by hairian number and component values", () => {
  let check = function (clazz: CustomDateStatic, tuple: Repeat<number, 5>, testTuple: DateTuple, shift?: boolean) {
    let testDate = clazz.ofHairia(tuple[0], tuple[1], tuple[2], tuple[3], tuple[4]);
    expect(testDate.getTuple(shift)).toEqual(testTuple);
  };
  test("random after epoch 1", () => {
    check(NewHairianDate, [5037, 1, 69, 4, 295], [14, 9, 25, 5037, 1, 69, 4, 295], false);
    check(NewHairianDate, [5037, 1, 69, 4, 295], [14, 9, 24, 5036, 11, 69, 4, 295], true);
    check(GregorianDate, [5037, 4, 3, 25, 311], [2025, 11, 6, 5037, 4, 3, 25, 311], false);
    check(GregorianDate, [5037, 4, 3, 25, 311], [2025, 11, 5, 5036, 28, 3, 25, 311], true);
  });
  test("random before epoch 1", () => {
    check(NewHairianDate, [-8614, 5, 40, 90, 774], [-23, 5, 19, -8614, 5, 40, 90, 774], false);
    check(NewHairianDate, [-8614, 5, 40, 90, 774], [-23, 5, 19, -8614, 5, 40, 90, 774], true);
    check(GregorianDate, [-8614, 12, 58, 54, 429], [1988, 6, 22, -8614, 12, 58, 54, 429], false);
    check(GregorianDate, [-8614, 12, 58, 54, 429], [1988, 6, 22, -8614, 12, 58, 54, 429], true);
  });
});