import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { CANVAS_STATE } from "@/features/canvas/canvas.constants";
import { getScene } from "@/features/canvas/canvas.utils";
import { printScene } from "@/features/controls-drawer/controls/utils/print-scene";
import { saveFile } from "@/features/controls-drawer/controls/utils/save-file";
import { useConfig } from "@/global-context/config/config";
import { useSaveLocalConfig } from "@/hooks/use-save-config";

export const SaveStatusControls = () => {
  const toast = useToast();
  const { config } = useConfig();
  const { setLocalConfig } = useSaveLocalConfig();

  const saveStatus = () => {
    setLocalConfig({
      ...config,
      initialState: Object.fromEntries(CANVAS_STATE),
    });
    toast({
      description: "Status successfully saved to browser storage.",
      status: "success",
    });
  };

  const onSave = () => {
    const data =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({
          ...config,
          initialState: Object.fromEntries(CANVAS_STATE),
        })
      );

    saveFile(data, `config_${new Date().toISOString()}.json`);
  };

  const onPrint = () => {
    const dataUrl = getScene().toDataURL();
    printScene(dataUrl);
  };

  const onPrintCanvas = () => {
    const dataUrl = getScene().toDataURL("image/png");
    saveFile(dataUrl, "canvas.png");
  };

  return (
    <>
      <Text fontWeight="bold">Output</Text>
      <Flex gap={2}>
        <Button onClick={saveStatus}>Save to browser</Button>
        <Button onClick={onSave}>Save as file</Button>
        <Button onClick={onPrint}>Print grid</Button>
        <Button onClick={onPrintCanvas}>Print canvas</Button>
      </Flex>
    </>
  );
};
