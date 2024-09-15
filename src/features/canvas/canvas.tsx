import { type MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { drawScene, fillRect, getCoords } from "./canvas.utils";
import { CANVAS_STATE } from "./canvas.constants";
import { useConfig } from "@/global-context/config/config";
import { useSaveLocalConfig } from "@/hooks/use-save-config";

export const Canvas = () => {
  const isDrawing = useRef<string | null>(null);
  const { setLocalConfig } = useSaveLocalConfig();

  const {
    config: {
      width,
      height,
      squareSize,
      autoSafeMode,
      marker,
      scale,
      initialState,
      pattern,
    },
  } = useConfig();

  const onAutoSave = useCallback(() => {
    if (autoSafeMode) {
      setLocalConfig({
        marker,
        width,
        height,
        squareSize,
        initialState: Object.fromEntries(CANVAS_STATE),
      });
    }
  }, [autoSafeMode, marker, height, setLocalConfig, squareSize, width]);

  const onClick: MouseEventHandler<HTMLCanvasElement> = useCallback(
    ({ clientX, clientY }) => {
      const { id } = fillRect(
        { clientX, clientY },
        {
          squareSize,
          marker,
          scale,
        }
      );

      isDrawing.current = id;
      onAutoSave();
    },
    [squareSize, onAutoSave, marker, scale]
  );

  const onDraw: MouseEventHandler<HTMLCanvasElement> = useCallback(
    ({ clientX, clientY }) => {
      const { id } = getCoords(clientX, clientY, squareSize, scale);
      if (isDrawing.current && isDrawing.current !== id) {
        isDrawing.current = id;
        fillRect(
          { clientX, clientY },
          {
            squareSize,
            marker,
            scale,
          },
          true
        );
        onAutoSave();
      }
    },
    [squareSize, marker, scale, onAutoSave]
  );

  useEffect(() => {
    drawScene({
      width,
      height,
      squareSize,
      initialState: Object.fromEntries(initialState || new Map()),
      scale,
    });
  }, [width, height, squareSize, initialState, scale]);

  return (
    <div
      className="bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${pattern})`,
      }}
    >
      <canvas
        id="scene"
        data-testid="scene"
        className="relative"
        style={{ gridArea: "c" }}
        onPointerDown={onClick}
        onPointerUp={() => (isDrawing.current = null)}
        onMouseMove={onDraw}
        width={width * (scale || 1)}
        height={height * (scale || 1)}
      />
    </div>
  );
};
