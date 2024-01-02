import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { useConfig } from "@/context/Config";

export const Scale = () => {
  const {
    config: { scale },
    setConfig,
  } = useConfig();

  const onAddScale = () => {
    setConfig({ scale: scale + 0.5 });
  };

  const onLowerScale = () => {
    if (scale > 0.5) setConfig({ scale: scale - 0.5 });
  };

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <IconButton
        disabled={scale === 0.5}
        aria-label="scale-down"
        data-testid="scale-down"
        icon={<MinusIcon color={scale === 0.5 ? "GrayText" : undefined} />}
        onClick={onLowerScale}
      />
      <div data-testid="scale-value" className="px-2 self-center">
        {scale * 100}%
      </div>
      <IconButton
        aria-label="scale-up"
        data-testid="scale-up"
        icon={<AddIcon />}
        onClick={onAddScale}
      />
    </ButtonGroup>
  );
};
