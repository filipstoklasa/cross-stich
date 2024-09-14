import { Controls } from "./controls/controls";
import { Drawer } from "@/components/drawer/drawer";
import { Version } from "@/components/version";

export const ControlsDrawer = () => (
  <Drawer header="Canvas configuration" footer={<Version />}>
    <Controls />
  </Drawer>
);
