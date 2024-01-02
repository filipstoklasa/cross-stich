import clsx from "clsx";
import { useConfig } from "@/context/Config";
import { useMemo } from "react";

interface AxisProps {
  sticky?: boolean;
  gridArea?: string;
}

export const AxisX = ({ sticky, gridArea }: AxisProps) => {
  const {
    config: { width, squareSize, scale },
  } = useConfig();

  const scaledSquareSize = squareSize * scale;

  const range = useMemo(
    () =>
      Array.from({
        length: Math.floor(width / squareSize),
      }),
    [width, squareSize]
  );

  return (
    <div
      data-testid="axis-x"
      style={{
        width: width * scale,
        gridArea,
      }}
      className={clsx("flex", sticky && "sticky top-0 bg-white z-10")}
    >
      <div className="flex">
        {range.map((_, index) => (
          <div
            key={`${index}-x-tick`}
            className="flex justify-center align-items-center text-center whitespace-nowrap"
            style={{ width: scaledSquareSize, height: scaledSquareSize }}
          >
            <span
              className="select-none"
              style={{ fontSize: scaledSquareSize * 0.6 }}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AxisY = ({ sticky, gridArea }: AxisProps) => {
  const {
    config: { height, squareSize, scale },
  } = useConfig();

  const scaledSquareSize = squareSize * scale;

  const range = useMemo(
    () =>
      Array.from({
        length: Math.floor(height / squareSize),
      }),
    [height, squareSize]
  );

  return (
    <div
      style={{ height: height * scale, marginTop: scaledSquareSize, gridArea }}
      className={clsx(sticky && "sticky left-0 bg-white z-10")}
    >
      {range.map((_, index) => (
        <div
          key={`${index}-y-tick`}
          className="flex text-center items-center justify-center px-1"
          style={{
            height: scaledSquareSize,
          }}
        >
          <span
            className="select-none"
            style={{ fontSize: scaledSquareSize * 0.6 }}
          >
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  );
};
