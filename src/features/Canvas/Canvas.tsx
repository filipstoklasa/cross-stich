import { AxisX, AxisY } from "../Axis";
import { type MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { drawScene, fillRect, getCoords } from "./Canvas.utils";
import { STATE } from "./Canvas.constants";
import { useConfig } from "@/context/Config";
import { useSaveLocalConfig } from "@/hooks/useSaveConfig";

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
        initialState: Object.fromEntries(STATE),
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
      className="grid max-w-[80vh] max-h-[80vh] overflow-auto"
      style={{ gridTemplateAreas: '"yl xt yr" "yl c yr" "yl xb yr' }}
    >
      <AxisX sticky gridArea="xt" />
      <AxisY sticky gridArea="yl" />
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
      <AxisY gridArea="yr" />
      <AxisX gridArea="xb" />
    </div>
  );
};
