import type { Marker } from "@/global-context/config/config.types";

export const CANVAS_STATE = new Map<string, Marker>();
export const ERASER: Marker = { color: "", symbol: "" };
