import { expect, test } from "vitest";
import { getDimensions } from "../get-dimensions";

test("getDimensions", () => {
  expect(getDimensions(10)).toStrictEqual([
    { key: 50, value: 500 },
    { key: 100, value: 1000 },
    { key: 150, value: 1500 },
  ]);

  expect(getDimensions(100)).toStrictEqual([
    { key: 5, value: 500 },
    { key: 10, value: 1000 },
    { key: 15, value: 1500 },
  ]);
});
