import type { Marker } from "./Canvas.types";

export type CanvasState = Map<string, Marker>;
export const STATE: CanvasState = new Map();
export const ERASER: Marker = { color: "", symbol: "" };
