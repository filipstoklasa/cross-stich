import {
  Drawer as ChakraDrawer,
  Divider,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@chakra-ui/react";
import type { PropsWithChildren, ReactNode } from "react";
import { DrawerContext } from "./drawer.context";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface DrawerProps {
  header?: ReactNode;
  footer?: ReactNode;
}

export const Drawer = ({
  children,
  header,
  footer,
}: PropsWithChildren<DrawerProps>) => {
  const disclosure = useDisclosure();

  return (
    <DrawerContext.Provider value={disclosure}>
      <IconButton
        data-testid="menu-button"
        aria-label="menu"
        onClick={disclosure.onToggle}
        icon={<HamburgerIcon />}
      />
      <ChakraDrawer
        size="md"
        placement="right"
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
      >
        <DrawerContent>
          {header && (
            <>
              <DrawerHeader>{header}</DrawerHeader>
              <Divider />
            </>
          )}
          <DrawerBody>{children}</DrawerBody>
          {footer && (
            <>
              <Divider />
              <DrawerFooter>{footer}</DrawerFooter>
            </>
          )}
        </DrawerContent>
      </ChakraDrawer>
    </DrawerContext.Provider>
  );
};
