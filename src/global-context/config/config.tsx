import type { ConfigContextState, DefaultConfig } from "./config.types";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { CANVAS_STATE } from "@/features/canvas/canvas.constants";
import { DEFAULT_CONFIG } from "./config.constants";
import uniqBy from "lodash/uniqBy";

const ConfigContext = createContext<ConfigContextState>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigContextProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const setConfigWithState = (config: Partial<DefaultConfig>) => {
    const markers = uniqBy(
      Array.from(CANVAS_STATE.values()),
      ({ color }) => color
    );

    setConfig((prev) => ({
      ...prev,
      initialState: CANVAS_STATE,
      markers,
      ...config,
    }));
  };

  return (
    <ConfigContext.Provider value={{ config, setConfig: setConfigWithState }}>
      {children}
    </ConfigContext.Provider>
  );
};
