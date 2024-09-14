import { Flex, Tooltip } from "@chakra-ui/react";
import { CANVAS_STATE } from "@/features/canvas/canvas.constants";
import type { ChangeEvent } from "react";
import { InfoIcon } from "@chakra-ui/icons";
import { Switch } from "@/components/switch";
import { useConfig } from "@/global-context/config/config";
import { useSaveLocalConfig } from "@/hooks/use-save-config";

export const AutoSaveControls = () => {
  const { setLocalConfig } = useSaveLocalConfig();

  const {
    config: { autoSafeMode, marker, width, height, squareSize },
    setConfig,
  } = useConfig();

  const setAutoSaveMode = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setConfig({ autoSafeMode: checked });
    setLocalConfig({
      marker,
      width,
      height,
      squareSize,
      initialState: Object.fromEntries(CANVAS_STATE),
    });
  };

  return (
    <Flex display="inline-flex">
      <Switch
        label={
          <Flex alignItems="center" gap={2}>
            Auto save mode
            <Tooltip
              label="Every change is being saved to the browser storage and can be later loaded by 'Browser config' input."
              placement="right-start"
            >
              <InfoIcon color="GrayText" />
            </Tooltip>
          </Flex>
        }
        isChecked={!!autoSafeMode}
        onChange={setAutoSaveMode}
      />
    </Flex>
  );
};
