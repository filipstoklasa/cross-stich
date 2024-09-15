import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfigContextProvider } from "@/global-context/config/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ConfigContextProvider>
        <Component {...pageProps} />
      </ConfigContextProvider>
    </ChakraProvider>
  );
}
