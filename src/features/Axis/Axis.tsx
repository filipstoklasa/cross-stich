import { useConfig } from "@/context/Config";
import { useMemo } from "react";

export const AxisX = () => {
  const {
    config: { width, squareSize },
  } = useConfig();

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
      style={{ width: width + squareSize }}
      className="m-auto flex"
    >
      <div className="flex" style={{ paddingLeft: squareSize / 2 }}>
        {range.map((_, index) => (
          <div
            key={`${index}-x-tick`}
            className="flex justify-center align-items-center text-center whitespace-nowrap"
            style={{ width: squareSize, height: squareSize }}
          >
            <span style={{ fontSize: squareSize * 0.6 }}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AxisY = () => {
  const {
    config: { height, squareSize },
  } = useConfig();

  const range = useMemo(
    () =>
      Array.from({
        length: Math.floor(height / squareSize),
      }),
    [height, squareSize]
  );

  return (
    <div style={{ height }}>
      {range.map((_, index) => (
        <div
          key={`${index}-y-tick`}
          className="flex text-center items-center justify-center px-1"
          style={{
            height: squareSize,
          }}
        >
          <span style={{ fontSize: squareSize * 0.6 }}>{index + 1}</span>
        </div>
      ))}
    </div>
  );
};
