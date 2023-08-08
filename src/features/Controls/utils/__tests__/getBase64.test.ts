import { FILE, FILE_RESULT, getFileReader } from "@/test.utils";
import { describe, expect, it, vi } from "vitest";
import { getBase64 } from "../getBase64";

describe("getBase64", () => {
  it("Tests successfull load of base64 file", () => {
    const callback = vi.fn();
    const { fileReader } = getFileReader();

    getBase64(FILE, callback);
    fileReader.result = FILE_RESULT;
    fileReader.onload();

    expect(callback).toBeCalledWith(FILE_RESULT);
    expect(fileReader.readAsDataURL).toBeCalledWith(FILE);
  });

  it("Tests file loading fail", () => {
    const callback = vi.fn();
    const { fileReader } = getFileReader();

    getBase64(FILE, callback);

    expect(() => fileReader.onerror()).toThrowError();
    expect(callback).not.toBeCalled();
  });
});
