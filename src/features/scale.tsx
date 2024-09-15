import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { useConfig } from "@/global-context/config/config";

const SCALE_STEP = 0.5;

export const Scale = () => {
  const {
    config: { scale },
    setConfig,
  } = useConfig();

  const onAddScale = () => {
    setConfig({ scale: scale + SCALE_STEP });
  };

  const onLowerScale = () => {
    if (scale > SCALE_STEP) setConfig({ scale: scale - SCALE_STEP });
  };

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <IconButton
        disabled={scale === SCALE_STEP}
        aria-label="scale-down"
        data-testid="scale-down"
        icon={
          <MinusIcon color={scale === SCALE_STEP ? "GrayText" : undefined} />
        }
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
