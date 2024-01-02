import { Box } from "@chakra-ui/react";
import { Canvas } from "@/features/Canvas";
import { ControlsDrawer } from "@/features/Controls/ControlsDrawer";
import { Scale } from "@/features/Scale";

const App = () => (
  <>
    <Box
      className="flex gap-4 items-center"
      top={2}
      left={2}
      zIndex={100}
      position="fixed"
    >
      <ControlsDrawer />
      <Scale />
    </Box>
    <div className="relative flex justify-center items-center h-[100vh]">
      <Canvas />
    </div>
  </>
);

export default App;
