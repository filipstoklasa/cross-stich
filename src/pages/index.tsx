import { AxisX, AxisY } from "@/features/Axis";
import { Canvas } from "@/features/Canvas";
import { ControlsDrawer } from "@/features/Controls/ControlsDrawer";
import { Pattern } from "@/features/Pattern";

const App = () => (
  <>
    <ControlsDrawer />
    <AxisX />
    <div className="relative flex justify-center">
      <AxisY />
      <div>
        <Pattern />
        <Canvas />
      </div>
      <AxisY />
    </div>
    <AxisX />
  </>
);

export default App;
