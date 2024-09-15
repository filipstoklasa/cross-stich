import { Box, Button } from "@chakra-ui/react";
import { type ChangeEvent, type PropsWithChildren, useRef } from "react";
import { withLabel } from "./utils/with-label";

interface ColorButtonProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorButton = withLabel(
  ({ color, onChange }: PropsWithChildren<ColorButtonProps>) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) => onChange(value);

    return (
      <Box position="relative">
        <Button onClick={inputRef.current?.click} backgroundColor={color}>
          <input
            ref={inputRef}
            value={color}
            type="color"
            onChange={onInputChange}
          />
        </Button>
      </Box>
    );
  }
);
