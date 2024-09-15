import { number, object, string } from "yup";
import type { DefaultConfig } from "@/global-context/config/config.types";
import type { Marker } from "@/global-context/config/config.types";
import { useCallback } from "react";

const CONFIG_KEY = "config";

export interface Config extends Omit<DefaultConfig, "initialState" | "scale"> {
  initialState: Record<string, Marker>;
}

export const validateConfig = object<Config>().shape({
  width: number().required(),
  height: number().required(),
  squareSize: number().required(),
  marker: object().shape({
    symbol: string().required(),
    color: string().required(),
  }),
  initialState: object().required(),
});

export const useSaveLocalConfig = (): {
  getLocalConfig: () => Config | undefined;
  setLocalConfig: (config: Config | undefined) => void;
} => {
  const getLocalConfig = useCallback(() => {
    try {
      const config = localStorage.getItem(CONFIG_KEY);

      if (!config) {
        return undefined;
      }

      return JSON.parse(config) as Config;
    } catch {
      return undefined;
    }
  }, []);

  const setLocalConfig = useCallback(
    (config: Config | undefined) =>
      window.localStorage.setItem(CONFIG_KEY, JSON.stringify(config)),
    []
  );

  return { getLocalConfig, setLocalConfig };
};
