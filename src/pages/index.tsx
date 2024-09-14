import { AxisX, AxisY } from "@/features/axis";
import { Box } from "@chakra-ui/react";
import { Canvas } from "@/features/canvas/canvas";
import { ControlsDrawer } from "@/features/controls-drawer/controls-drawer";
import { Scale } from "@/features/scale";

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
      <div
        className="grid max-w-[80vh] max-h-[80vh] overflow-auto"
        style={{ gridTemplateAreas: '"yl xt yr" "yl c yr" "yl xb yr' }}
      >
        <AxisX sticky gridArea="xt" />
        <AxisY sticky gridArea="yl" />
        <Canvas />
        <AxisY gridArea="yr" />
        <AxisX gridArea="xb" />
      </div>
    </div>
  </>
);

export default App;
