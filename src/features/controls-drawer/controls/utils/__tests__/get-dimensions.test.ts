import { expect, test } from "vitest";
import { getDimensions } from "../get-dimensions";

test("getDimensions", () => {
  expect(getDimensions(10)).toStrictEqual([
    { name: 50, value: 500 },
    { name: 100, value: 1000 },
    { name: 150, value: 1500 },
  ]);

  expect(getDimensions(100)).toStrictEqual([
    { name: 5, value: 500 },
    { name: 10, value: 1000 },
    { name: 15, value: 1500 },
  ]);
});
