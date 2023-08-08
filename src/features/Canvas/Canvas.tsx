import { type MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { drawScene, fillRect, getCoords } from "./Canvas.utils";
import { STATE } from "./Canvas.constants";
import { useConfig } from "@/context/Config";
import { useSaveLocalConfig } from "@/hooks/useSaveConfig";

export const Canvas = () => {
  const isDrawing = useRef<string | null>(null);
  const { setLocalConfig } = useSaveLocalConfig();

  const {
    config: { width, height, squareSize, autoSafeMode, marker, ...config },
  } = useConfig();

  const onAutoSave = useCallback(() => {
    if (autoSafeMode) {
      setLocalConfig({
        marker,
        width,
        height,
        squareSize,
        initialState: Object.fromEntries(STATE),
      });
    }
  }, [autoSafeMode, marker, height, setLocalConfig, squareSize, width]);

  const onClick: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (event) => {
      const { id } = fillRect(event, { squareSize, marker });
      isDrawing.current = id;
      onAutoSave();
    },
    [squareSize, onAutoSave, marker]
  );

  const onDraw: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (event) => {
      const { id } = getCoords(event.clientX, event.clientY, squareSize);
      if (isDrawing.current && isDrawing.current !== id) {
        isDrawing.current = id;
        fillRect(event, { squareSize, marker }, true);
        onAutoSave();
      }
    },
    [squareSize, marker, onAutoSave]
  );

  useEffect(() => {
    const { initialState = new Map() } = config;

    drawScene({
      width,
      height,
      squareSize,
      initialState: initialState ? Object.fromEntries(initialState) : {},
    });
  }, [width, height, squareSize, config]);

  return (
    <canvas
      id="scene"
      className="relative"
      onPointerDown={onClick}
      onPointerUp={() => (isDrawing.current = null)}
      onMouseMove={onDraw}
      width={width}
      height={height}
    />
  );
};
