import { number, object, string } from "yup";
import type { DefaultConfig } from "@/context/Config";
import type { Marker } from "@/features/Canvas";
import { useCallback } from "react";
import { validateConfig } from "next/dist/server/config-shared";

export interface Config extends Omit<DefaultConfig, "initialState"> {
  initialState: Record<string, Marker>;
}

export const checkConfig = object<Config>().shape({
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
      const config = localStorage.getItem("config");
      if (config && validateConfig(JSON.parse(config))) {
        return JSON.parse(config) as Config;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }, []);

  const setLocalConfig = useCallback(
    (config: Config | undefined) =>
      window.localStorage.setItem("config", JSON.stringify(config)),
    []
  );

  return { getLocalConfig, setLocalConfig };
};
