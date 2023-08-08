import { Controls } from "./Controls";
import { Drawer } from "@/components/Drawer";
import { Version } from "../Version/Version";

export const ControlsDrawer = () => (
  <Drawer header="Canvas configuration" footer={<Version />}>
    <Controls />
  </Drawer>
);
