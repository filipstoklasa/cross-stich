import { Box, Flex, Text } from "@chakra-ui/react";
import type { Dimensions, Marker } from "@/features/Canvas";
import { ColorButton } from "@/components/ColorButton";
import { Input } from "@/components/Input";
import { SQUARE_SIZES } from "../Controls.constants";
import { Select } from "@/components/Select";
import { getDimensions } from "@/features/Controls/utils/getDimensions";
import { useConfig } from "@/context/Config";

export const DimensionsControls = () => {
  const {
    config: { squareSize, width, height, marker },
    setConfig,
  } = useConfig();

  const setDimensions =
    (prop: keyof Dimensions) => (value: string | number) => {
      setConfig({
        [prop]: Number(value),
        scale: 1,
      });
    };

  const setMarker = (prop: keyof Marker) => (value: string) => {
    setConfig({
      marker: {
        ...marker,
        [prop]: value,
      },
    });
  };

  return (
    <>
      <Flex gap={2}>
        <Box flex={1}>
          <Select
            label="Width"
            testId="scene-width-input"
            value={width}
            options={getDimensions(squareSize)}
            onChange={setDimensions("width")}
          />
        </Box>
        <Box flex={1}>
          <Select
            label="Height"
            testId="scene-height-input"
            value={height}
            options={getDimensions(squareSize)}
            onChange={setDimensions("height")}
          />
        </Box>
      </Flex>
      <Flex gap={2} alignItems="flex-end">
        <Box flex={1}>
          <Select
            label="Square size"
            testId="square-size-input"
            value={squareSize}
            options={SQUARE_SIZES}
            onChange={setDimensions("squareSize")}
          />
        </Box>
        <Box>
          <Text>Marker</Text>
          <Flex alignItems="flex-end" gap={2}>
            <Input
              width={50}
              maxLength={1}
              value={marker.symbol}
              onChange={({ target: { value } }) => {
                setMarker("symbol")(value);
              }}
            />
            <ColorButton color={marker.color} onChange={setMarker("color")} />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
