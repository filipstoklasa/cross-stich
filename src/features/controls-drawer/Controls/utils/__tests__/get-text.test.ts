import { FILE, FILE_RESULT, getFileReader } from "@/test.utils";
import { describe, expect, it, vi } from "vitest";
import { getText } from "../get-text";

describe("getText", () => {
  it("Tests successfull load of text file", () => {
    const callback = vi.fn();
    const { fileReader } = getFileReader();

    getText(FILE, callback);
    fileReader.result = FILE_RESULT;
    fileReader.onload();

    expect(callback).toBeCalledWith(FILE_RESULT);
    expect(fileReader.readAsText).toBeCalledWith(FILE);
  });
});
