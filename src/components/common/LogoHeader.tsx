import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";

interface LogoHeaderProps {}

const LogoHeader: React.FC<LogoHeaderProps> = () => {
  return (
    <Flex alignItems="center" justifyContent="center" mb={{ base: 14, lg: 20 }}>
      <Logo h={16} w={16} />
      <Text ml={4} fontSize="2xl" fontWeight="black" color="purple.700">
        SC Blog
      </Text>
    </Flex>
  );
};

export default LogoHeader;
