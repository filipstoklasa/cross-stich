import type { ConfigContextState, DefaultConfig } from "./Config.types";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { STATE } from "@/features/Canvas";
import uniqBy from "lodash/uniqBy";

const defaultConfig: DefaultConfig = {
  width: 500,
  height: 500,
  squareSize: 20,
  marker: { color: "#ff0000", symbol: "A" },
};

const ConfigContext = createContext<ConfigContextState>({
  config: defaultConfig,
  setConfig: () => {},
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigContextProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useState(defaultConfig);

  const setConfigWithState = (config: Partial<DefaultConfig>) => {
    const markers = uniqBy(Array.from(STATE.values()), ({ color }) => color);
    setConfig((prev) => ({ ...prev, initialState: STATE, markers, ...config }));
  };

  return (
    <ConfigContext.Provider value={{ config, setConfig: setConfigWithState }}>
      {children}
    </ConfigContext.Provider>
  );
};
