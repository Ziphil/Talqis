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


function checkConversion(fromClass: CustomDateStatic, toClass: CustomDateStatic, tuple: Repeat<number, 7>, testTuple: DateTuple) {
  let testDate = fromClass.of(...tuple).convert(toClass);
  expect(testDate.getTuple()).toEqual(testTuple);
};

describe("gregorian → new hairian", () => {
  test("random after epoch 1", () => {
    checkConversion(GregorianDate, NewHairianDate, [2035, 10, 9, 18, 54, 16, 11], [24, 8, 30, 8661, 7, 87, 68, 531]);
  });
});

describe("new hairian → gregorian", () => {
  test("random after epoch 1", () => {
    checkConversion(NewHairianDate, GregorianDate, [5, 4, 29, 1, 57, 17, 701], [2016, 5, 29, 1589, 3, 46, 20, 93]);
  });
});