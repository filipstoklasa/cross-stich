import { createContext, useContext } from "react";
import type { UseDisclosureReturn } from "@chakra-ui/react";

export const DrawerContext = createContext<UseDisclosureReturn>(
  {} as UseDisclosureReturn
);

export const useDrawer = () => useContext(DrawerContext);
