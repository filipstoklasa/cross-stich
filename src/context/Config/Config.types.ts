import type { CanvasState, Dimensions, Marker } from "@/features/Canvas";

export interface DefaultConfig extends Dimensions {
  initialState?: CanvasState;
  pattern?: File;
  autoSafeMode?: boolean;
  markers?: Marker[];
}

export interface ConfigContextState {
  config: DefaultConfig;
  setConfig: (config: Partial<DefaultConfig>) => void;
}
