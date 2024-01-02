import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import {
  type Config,
  checkConfig,
  useSaveLocalConfig,
} from "@/hooks/useSaveConfig";
import { useCallback, useEffect, useState } from "react";
import { FileButton } from "@/components/FileButton";
import { STATE } from "@/features/Canvas";
import { getBase64 } from "../utils/getBase64";
import { getText } from "@/features/Controls/utils/getText";
import { useConfig } from "@/context/Config";
import { useDrawer } from "@/components/Drawer";

export const LoadStatusControls = () => {
  const toast = useToast();
  const { onClose } = useDrawer();
  const { setConfig } = useConfig();
  const { getLocalConfig, setLocalConfig } = useSaveLocalConfig();
  const [isConfigAvailable, setIsConfigAvailable] = useState(false);

  const loadConfig = useCallback(
    (inputConfig: Config | undefined) => {
      try {
        if (!checkConfig.isValidSync(inputConfig)) {
          throw new Error("Saved schema has error");
        }

        const { initialState, ...config } = inputConfig;

        STATE.clear();

        for (const coords in initialState) {
          STATE.set(coords, initialState[coords]);
        }

        setConfig(config);

        onClose();
      } catch {
        toast({
          description: "Failed loading configuration from browser storage.",
          status: "error",
        });
        setLocalConfig(undefined);
      }
    },
    [toast, setConfig, setLocalConfig, onClose]
  );

  const loadFileConfig = (file: File) => {
    getText(file, (value) => {
      const { marker, initialState, width, height, squareSize } = JSON.parse(
        value as string
      ) as Config;
      loadConfig({ marker, initialState, width, height, squareSize });
    });
  };

  const onInputChange = (file: File) => {
    getBase64(file, (source) => {
      if (source) {
        setConfig({ pattern: source.toString() });
      }
    });
    onClose();
  };

  useEffect(() => {
    setIsConfigAvailable(!!getLocalConfig());
  }, [getLocalConfig]);

  return (
    <>
      <Text fontWeight="bold">Input</Text>
      <Flex gap={2}>
        <Button
          isDisabled={!isConfigAvailable}
          onClick={() => loadConfig(getLocalConfig())}
        >
          Browser config
        </Button>
        <FileButton
          accept=".json"
          testId="file-config"
          onChange={loadFileConfig}
        >
          File config
        </FileButton>
        <FileButton
          testId="background-pattern"
          accept=".png,.jpg,.webp"
          onChange={onInputChange}
        >
          Background pattern
        </FileButton>
      </Flex>
    </>
  );
};
