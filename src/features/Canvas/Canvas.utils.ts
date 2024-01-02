import type { Dimensions, DrawRectParams, Marker } from "./Canvas.types";
import { ERASER, STATE } from "./Canvas.constants";
import { getScene, getSceneContext } from "@/utils/sceneContext";
import type { MouseEvent } from "react";
import isEqual from "lodash/isEqual";

export const getCoordsId = (x: number, y: number) => `${x}-${y}`;

export const clearScene = (width: number, height: number) =>
  getSceneContext()?.clearRect(0, 0, width, height);

const padZero = (str: string) => str.padStart(2, "0");

export const invertColor = (hex: string): string => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  let r: string | number = parseInt(hex.slice(0, 2), 16);
  let g: string | number = parseInt(hex.slice(2, 4), 16);
  let b: string | number = parseInt(hex.slice(4, 6), 16);

  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);

  return "#" + padZero(r) + padZero(g) + padZero(b);
};

const drawSymbol = (
  { symbol, color }: Marker,
  x: number,
  y: number,
  squareSize: number
) => {
  const ctx = getSceneContext();
  ctx.font = `${squareSize * 0.7}px serif`;
  ctx.globalAlpha = 1;
  ctx.fillStyle = invertColor(color);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(symbol, x + squareSize / 2, y + squareSize / 2);
};

export const getCoords = (
  clientX: number,
  clientY: number,
  squareSize: number,
  scale: number
) => {
  const { left, top } = getScene().getBoundingClientRect();
  const x = Math.floor((clientX - left) / squareSize / scale);
  const y = Math.floor((clientY - top) / squareSize / scale);
  const id = getCoordsId(x * squareSize, y * squareSize);

  return {
    x,
    y,
    id,
  };
};

export const drawRect = (
  { x, y, marker }: DrawRectParams,
  squareSize: number
) => {
  const ctx = getSceneContext();

  if (marker?.color === ERASER.color) {
    ctx!.clearRect(x, y, squareSize, squareSize);
  } else if (marker?.color) {
    ctx.fillStyle = marker.color;
    ctx.fillRect(x, y, squareSize, squareSize);
    drawSymbol(marker, x, y, squareSize);
  }

  ctx.globalAlpha = 1;
  ctx.strokeRect(x, y, squareSize, squareSize);
};

export const fillRect = (
  {
    clientX,
    clientY,
  }: Pick<MouseEvent<HTMLCanvasElement>, "clientX" | "clientY">,
  {
    squareSize,
    marker,
    scale,
  }: Pick<Dimensions, "squareSize" | "marker" | "scale">,
  isDragging?: boolean
) => {
  const { x, y, id } = getCoords(clientX, clientY, squareSize, scale);
  const xCoord = x * squareSize;
  const yCoord = y * squareSize;

  if (!STATE.has(id)) {
    STATE.set(id, marker);
    drawRect({ x: xCoord, y: yCoord, marker }, squareSize);
  } else if (isDragging && !isEqual(STATE.get(id), marker)) {
    STATE.set(id, marker);
    drawRect({ x: xCoord, y: yCoord, marker }, squareSize);
  } else if (!isDragging) {
    STATE.delete(id);
    drawRect({ x: xCoord, y: yCoord, marker: ERASER }, squareSize);
  }

  return { x, y, id };
};

export const drawScene = ({
  width,
  height,
  squareSize,
  initialState,
  scale,
}: Omit<Dimensions, "marker"> & {
  initialState?: Record<string, Marker>;
}) => {
  clearScene(width, height);

  const ctx = getSceneContext();

  if (scale) {
    ctx.scale(scale, scale);
  }

  for (let x = 0; x <= width; x += squareSize) {
    for (let y = 0; y <= height; y += squareSize) {
      const marker = initialState?.[`${x}-${y}`];
      drawRect({ x, y, marker }, squareSize);
    }
  }
};
