import { AutoSaveControls } from "./components/auto-save";
import { ColorsControls } from "./components/colors";
import { DimensionsControls } from "./components/dimensions";
import { Divider } from "@chakra-ui/react";
import { LoadStatusControls } from "./components/load-status";
import { SaveStatusControls } from "./components/save-status";
import { Stack } from "@chakra-ui/react";

export const Controls = () => (
  <Stack spacing={3}>
    <DimensionsControls />
    <Divider />
    <ColorsControls />
    <LoadStatusControls />
    <Divider />
    <SaveStatusControls />
    <Divider />
    <AutoSaveControls />
  </Stack>
);
