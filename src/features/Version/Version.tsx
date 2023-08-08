import { Flex, Tag, Text } from "@chakra-ui/react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const Version = () => {
  return (
    <Flex gap={2}>
      <Text>© {new Date().getFullYear()} Filip Stoklasa</Text>{" "}
      <Tag>version: {publicRuntimeConfig?.version}</Tag>
    </Flex>
  );
};
