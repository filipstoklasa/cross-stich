import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { STATE } from "@/features/Canvas";
import { getScene } from "@/utils/sceneContext";
import { printScene } from "@/features/Controls/utils/printScene";
import { saveFile } from "@/features/Controls/utils/saveFile";
import { useConfig } from "@/context/Config";
import { useSaveLocalConfig } from "@/hooks/useSaveConfig";

export const SaveStatusControls = () => {
  const toast = useToast();
  const { config } = useConfig();
  const { setLocalConfig } = useSaveLocalConfig();

  const saveStatus = () => {
    setLocalConfig({ ...config, initialState: Object.fromEntries(STATE) });
    toast({
      description: "Status successfully saved to browser storage.",
      status: "success",
    });
  };

  const onSave = () => {
    const data =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({ ...config, initialState: Object.fromEntries(STATE) })
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
