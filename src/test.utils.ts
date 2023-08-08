import { vi } from "vitest";

export const FILE = new File([""], "");
export const FILE_RESULT = "File result";

export const getFileReader = () => {
  const fileReader = {
    DONE: FileReader.DONE,
    EMPTY: FileReader.EMPTY,
    LOADING: FileReader.LOADING,
    readyState: FileReader.EMPTY,
    error: null,
    result: null as FileReader["result"],
    abort: vi.fn(),
    addEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onabort: vi.fn(),
    onerror: vi.fn(),
    onload: vi.fn(),
    onloadend: vi.fn(),
    onloadprogress: vi.fn(),
    onloadstart: vi.fn(),
    onprogress: vi.fn(),
    readAsArrayBuffer: vi.fn(),
    readAsBinaryString: vi.fn(),
    readAsDataURL: vi.fn(),
    readAsText: vi.fn(),
    removeEventListener: vi.fn(),
  };

  vi.spyOn(window, "FileReader").mockImplementation(() => fileReader);

  return { fileReader };
};
