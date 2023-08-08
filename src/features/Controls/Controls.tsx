import { AutoSaveControls } from "./components/AutoSaveControls";
import { ColorsControls } from "./components/ColorsControls";
import { DimensionsControls } from "./components/DimensionsControls";
import { Divider } from "@chakra-ui/react";
import { LoadStatusControls } from "./components/LoadStatusControls";
import { SaveStatusControls } from "./components/SaveStatusControls";
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
