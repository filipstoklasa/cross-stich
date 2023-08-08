import { Mock, afterEach, beforeEach, expect, test, vi } from "vitest";
import { drawScene, getCoords } from "../Canvas.utils";

interface MockedContext {
  clearRect: Mock;
  strokeRect: Mock;
}

let canvas: HTMLCanvasElement | null;
let context: MockedContext | null;

beforeEach(() => {
  canvas = document.createElement("canvas");
  context = {
    clearRect: vi.fn(),
    strokeRect: vi.fn(),
  };

  vi.mock("@/utils/sceneContext", async () => ({
    getScene: vi.fn(() => canvas),
    getSceneContext: vi.fn(() => context),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
  canvas = null;
  context = null;
});

test("getCoords", () => {
  expect(getCoords(100, 100, 25)).toMatchSnapshot();
});

test("drawScene", () => {
  drawScene({ width: 500, height: 500, squareSize: 25 });
  expect(context).toMatchSnapshot();
});
