import { AddIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Icon,
  IconButton,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { type Marker, STATE } from "@/features/Canvas";
import uniqBy from "lodash/uniqBy";
import { useConfig } from "@/context/Config";

interface ColorRowProps {
  marker: Marker;
}

const ColorRow = ({ marker }: ColorRowProps) => {
  const { color, symbol } = marker;
  const { onCopy } = useClipboard(marker.color);
  const { setConfig } = useConfig();
  const toast = useToast();

  const onCopySuccess = () => {
    onCopy();
    toast({
      description: `Color ${color} copied to clipboard!`,
      status: "success",
    });
  };

  const onSelectColor = () => setConfig({ marker });

  return (
    <Flex
      key={color}
      gap={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap={2} alignItems="center" justifyContent="space-between">
        <Icon viewBox="0 0 30 30">
          <circle cy={15} cx={15} r={15} fill={color} />
        </Icon>
        <span>{color}</span>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <span>{symbol}</span>
        <IconButton
          aria-label="select color"
          onClick={onSelectColor}
          icon={<AddIcon color={color} />}
          colorScheme="whiteAlpha"
        />
        <IconButton
          aria-label="copy color"
          onClick={onCopySuccess}
          icon={<CopyIcon color={color} />}
          colorScheme="whiteAlpha"
        />
      </Flex>
    </Flex>
  );
};

export const ColorsControls = () => {
  const markers = uniqBy(
    Array.from(STATE.values()),
    ({ color, symbol }) => `${color}-${symbol}`
  );

  if (!markers?.length) {
    return null;
  }

  return (
    <>
      <Text fontWeight="bold">Used colors</Text>
      {markers.map((marker) => (
        <ColorRow key={`${marker.color}-${marker.symbol}`} marker={marker} />
      ))}
      <Divider />
    </>
  );
};
