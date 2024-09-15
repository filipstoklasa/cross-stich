import {
  MockedFunction,
  afterEach,
  beforeEach,
  expect,
  test,
  vi,
} from "vitest";
import { drawScene, getCoords } from "../canvas.utils";

let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

beforeEach(() => {
  canvas = document.createElement("canvas");

  context = {
    clearRect: vi.fn(),
    strokeRect: vi.fn(),
    scale: vi.fn(),
  } as unknown as CanvasRenderingContext2D;

  vi.spyOn(document, "getElementById").mockReturnValue(canvas);
  vi.spyOn(canvas, "getContext").mockReturnValue(context);
});

afterEach(() => {
  vi.clearAllMocks();
  canvas = null;
  context = null;
});

test("getCoords", () => {
  expect(getCoords(100, 100, 25, 1)).toMatchSnapshot();
});

test("drawScene", () => {
  const width = 500,
    height = 500,
    squareSize = 25;

  const expectedCallsLen = (width / squareSize) * (height / squareSize);

  const strokeRect = context?.strokeRect as MockedFunction<
    CanvasRenderingContext2D["strokeRect"]
  >;

  drawScene({ width, height, squareSize, scale: 1 });
  expect(strokeRect.mock.calls.length).toBe(expectedCallsLen);
  expect(context).toMatchSnapshot();
});
